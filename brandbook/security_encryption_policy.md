# UNITED SOULS GUILD — SECURITY & ENCRYPTION POLICY

### 1. Purpose
To ensure the confidentiality, integrity, and availability of user data and systems.

### 2. Security Framework
U.S.G. aligns with:
- ISO/IEC 27001 (Information Security)
- SOC 2 Type II
- OWASP Secure Coding Guidelines

### 3. Encryption Standards
- **At Rest:** AES-256
- **In Transit:** TLS 1.3+
- **Key Management:** HSM-backed with annual rotation.
- **Vault Files:** Client-side encrypted using asymmetric keypair (RSA 4096 or ECC).

### 4. Authentication & Access Control
- Role-Based Access Control (RBAC)
- Multi-Factor Authentication (MFA)
- Principle of Least Privilege (POLP)
- Just-in-Time access for production environments.

### 5. Logging & Monitoring
- Immutable, append-only logs for all access events.
- Real-time anomaly detection with automated lockouts.
- Periodic penetration testing by independent auditors.

### 6. Incident Response
- 24/7 incident reporting channel: `security@unitedsoulsguild.org`
- Major security events trigger emergency review and mandatory disclosure in the Transparency Report.

### 7. Cryptographic Agility
We maintain upgrade pathways for future-proof encryption (e.g., post-quantum cryptography readiness).

### 8. No Backdoors Policy
U.S.G. will never include deliberate vulnerabilities or secret access points in any of its systems.
