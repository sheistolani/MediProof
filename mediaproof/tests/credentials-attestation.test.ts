import { describe, it, expect, beforeEach } from "vitest"

const mockContract = {
  admin: "ST1ADMIN1234567890",
  attestations: new Map<string, string>(),

  isAdmin(caller: string) {
    return caller === this.admin
  },

  key(credentialId: number, attestor: string) {
    return `${credentialId}-${attestor}`
  },

  addAttestation(caller: string, credentialId: number, message: string) {
    if (message.length === 0) {
      return { error: 101 } // ERR-MESSAGE-TOO-LONG
    }

    const key = this.key(credentialId, caller)
    this.attestations.set(key, message)
    return { value: true }
  },

  getAttestation(credentialId: number, attestor: string) {
    const key = this.key(credentialId, attestor)
    if (!this.attestations.has(key)) {
      return { value: null }
    }
    return { value: this.attestations.get(key) }
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) {
      return { error: 100 } // ERR-NOT-AUTHORIZED
    }
    this.admin = newAdmin
    return { value: true }
  },
}

describe("Credential Attestations Contract", () => {
  beforeEach(() => {
    mockContract.admin = "ST1ADMIN1234567890"
    mockContract.attestations = new Map()
  })

  it("should allow adding an attestation", () => {
    const res = mockContract.addAttestation(
      "ST2HOSPITAL1", 1, "Credential verified with hospital records"
    )
    expect(res).toEqual({ value: true })
    expect(mockContract.getAttestation(1, "ST2HOSPITAL1")).toEqual({
      value: "Credential verified with hospital records",
    })
  })

  it("should prevent empty attestation messages", () => {
    const res = mockContract.addAttestation("ST2X", 2, "")
    expect(res).toEqual({ error: 101 }) // ERR-MESSAGE-TOO-LONG
  })

  it("should return null for nonexistent attestation", () => {
    expect(mockContract.getAttestation(999, "STUNKNOWN")).toEqual({
      value: null,
    })
  })

  it("should transfer admin rights", () => {
    const res = mockContract.transferAdmin("ST1ADMIN1234567890", "ST3NEWADMIN")
    expect(res).toEqual({ value: true })
    expect(mockContract.admin).toBe("ST3NEWADMIN")
  })

  it("should not transfer admin if not called by current admin", () => {
    const res = mockContract.transferAdmin("ST2NOTADMIN", "ST3NEWADMIN")
    expect(res).toEqual({ error: 100 })
  })
})
