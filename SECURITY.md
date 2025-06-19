# Security Policy

## Reporting Security Vulnerabilities

We take the security of eslint-plugin-nestjs-route seriously. If you believe you have found a security vulnerability, please report it to us as described below.

## Reporting Process

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send an email to [jungseok01@kakao.com] or create a private security advisory through GitHub's security advisory feature.

Please include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

## Response Timeline

We will acknowledge receipt of your vulnerability report within 48 hours and will strive to provide regular updates on our progress.

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Measures

This project implements the following security measures:

- All dependencies are regularly updated
- Code is scanned for vulnerabilities using automated tools
- Security-focused linting rules are applied
- Regular security audits are performed on dependencies (`npm audit`)

## Attribution

We appreciate security researchers and users who report vulnerabilities to us. We will acknowledge your contribution in our release notes (unless you prefer to remain anonymous).
