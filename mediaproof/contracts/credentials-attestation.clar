;; credential-attestations.clar
;; Contract for attaching attestations to credentials

(define-data-var admin principal tx-sender)

;; A tuple of who attested and their message
(define-map credential-attestations
  { credential-id: uint, attestor: principal }
  (string-ascii 256))

;; Error Codes
(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-MESSAGE-TOO-LONG u101)

;; Check if caller is admin
(define-private (is-admin)
  (is-eq tx-sender (var-get admin)))

;; Add an attestation to a credential
(define-public (add-attestation (credential-id uint) (message (string-ascii 256)))
  (begin
    (asserts! (> (len message) u0) (err ERR-MESSAGE-TOO-LONG))
    (map-set credential-attestations
      { credential-id: credential-id, attestor: tx-sender }
      message)
    (ok true)))

;; Read all attestations for a given credential and attestor
(define-read-only (get-attestation (credential-id uint) (attestor principal))
  (map-get? credential-attestations { credential-id: credential-id, attestor: attestor }))

;; Transfer admin rights
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (var-set admin new-admin)
    (ok true)))
