# 🩺 MediProof – Decentralized Medical Credential Verification

MediProof is a Web3-based credential verification system that allows certified medical professionals to receive, manage, and verify credentials (like licenses, degrees, or board certifications) directly on the blockchain. Institutions and hospitals can instantly verify medical staff without relying on centralized or paper-based systems.

---

## 🚨 Why This Matters

Healthcare institutions face serious risks from:
- Fake credentials and fraudulent job applicants
- Delays in verifying qualifications across borders
- No portable, tamper-proof proof of credentials for professionals

MediProof solves this by decentralizing credential issuance and enabling instant, on-chain verification by trusted parties.

---

## 🔗 Smart Contracts Overview

### 1. `credential-registry.clar`
- Issues and stores credential NFTs (soulbound – non-transferable)
- Includes metadata: credential type, issuer, expiry date, revocation status
- Only verified issuers can issue/revoke credentials

### 2. `issuer-access.clar`
- Maintains a whitelist of authorized credential issuers (e.g. medical boards, universities)
- Only admin can modify the list
- Used by `credential-registry` to restrict who can issue credentials

### 3. `hospital-verifier.clar` (optional)
- Used by hospitals to verify the status of a credential before hiring
- Emits logs for traceability and audit purposes

---

## 📦 Tech Stack

- **Clarity** (Smart contracts on Stacks blockchain)
- **Clarinet** (Development & testing environment)
- **TypeScript + Vitest** (For mock tests)
- Optional frontend: React + Stacks.js + Gaia (for decentralized identity UI)

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 16.x
- Clarinet CLI: [Install Instructions](https://docs.stacks.co/docs/clarity/overview/clarinet/)
- Git

### Clone the Repo

```bash
git clone https://github.com/your-org/mediproof.git
cd mediproof
npm install
