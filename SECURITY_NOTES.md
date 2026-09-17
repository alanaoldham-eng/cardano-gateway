# Security Notes for Tellus Gateway v003

Tellus Gateway v003 is a UX and architecture prototype. It demonstrates the first-use journey for Cardano onboarding while keeping production custody, minting, and sponsored transaction rails outside the prototype boundary.

## Email is not wallet custody

Email is used as a beginner-friendly login/profile identity in the demo. It is not a cryptographic wallet identity, does not prove ownership of a Cardano address, and does not authorize Cardano transactions.

## No server-side key custody

This prototype does not generate, store, encrypt, decrypt, recover, or transmit private keys. It does not provide wallet custody.

## Do not store seed phrases in localStorage

Seed phrases, private keys, spending passwords, passkey secrets, and wallet backups must never be stored in `localStorage`, browser session storage, analytics tools, logs, or plain database fields.

## What wallet support is real in v003

Tellus Gateway v003 supports external Cardano browser wallets through CIP-30 using Mesh SDK. The wallet connection runs client-side and depends on wallets installed by the user, such as Lace, Eternl, Yoroi, Nami, Typhon, or Flint.

## Embedded wallets are not implemented

Production embedded wallets require much more than an email form. A future embedded wallet design must include passkey/device-secured encryption, strict recovery rules, audited cryptography, threat modeling, logging controls, and an external security review before real assets are handled.

## Sponsored transactions are mocked

The sponsor quote endpoint returns a mock quote only. A real Cardano gas station requires:

- ADA sponsor wallet controls.
- UTXO management.
- Transaction construction and simulation.
- Rate limits.
- Abuse prevention.
- Spending caps.
- Monitoring and alerting.
- Project-level permissions.
- Clear user authorization boundaries.

## Claims are local demo records

Claim records and badges in v003 are stored in the browser with `localStorage`. They are not durable production records and are not minted Cardano assets.

## No financial, investment, or custody services

This app does not provide financial services, investment advice, custody services, brokerage services, exchange services, or money transmission services. It is a software prototype for onboarding UX and architecture validation.
