# Cardano Gateway v003

Cardano Gateway v003 is a deployable Cardano-native onboarding prototype for Tellus Digital. It updates the earlier Cardano OnboardKit concept with the Tellus Gateway brand system: deep teal, aqua mint, soft mint, slate charcoal, warm gold, and the tagline:

> From email to ownership on Cardano.

The product still has two identities:

1. **Cardano Gateway**: the developer/platform layer for Cardano dApps.
2. **Cardano Passport**: the consumer-facing demo app that proves the onboarding flow.

## What v003 includes

- Branded Tellus Gateway UI, logo mark, CSS theme, and brand pillars: Simple, Trusted, Regenerative, Frictionless.
- Next.js App Router, TypeScript, Tailwind CSS, and React.
- Email-first Passport profile onboarding stored in `localStorage`.
- Native Cardano wallet connection through CIP-30 using Mesh SDK.
- Claim links and QR-ready claim pages.
- Local demo badge/pass/reward records.
- Mock sponsored transaction quote UX.
- Project dashboard for creating local demo claim campaigns.
- CSV export of local claim records.
- API routes for health, mock sponsor quote, and campaign data.
- Honest v003 labels showing what is real and what is scaffolded.

## What v003 does not include

- No production embedded wallet.
- No fake custody.
- No server-side private key storage.
- No seed phrase storage.
- No real ADA sponsor wallet.
- No transaction submission.
- No native asset minting.
- No database.
- No Supabase.
- No smart contracts.
- No Aiken validators.
- No Thirdweb, Ethereum, Solidity, ERC, or EVM dependencies.

## Routes

- `/` Tellus Gateway landing page.
- `/passport` Cardano Passport consumer onboarding demo.
- `/claim/[slug]` Campaign claim page.
- `/dashboard` Project dashboard demo.
- `/docs` Developer docs.
- `/api/health` Health endpoint.
- `/api/sponsor/quote` Mock sponsor quote endpoint.
- `/api/claims/[slug]` Mock campaign lookup endpoint.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment variables

```bash
NEXT_PUBLIC_CARDANO_NETWORK=preprod
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Only `NEXT_PUBLIC_*` variables are used client-side. Do not expose server secrets to the browser.

## Vercel deployment

1. Push this project to GitHub.
2. Create a new Vercel project.
3. Use the default Next.js framework preset.
4. Set environment variables:

```bash
NEXT_PUBLIC_CARDANO_NETWORK=preprod
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

5. Build command:

```bash
npm run build
```

6. Output directory: leave blank/default.

## Known limitations

- LocalStorage is browser-local and not suitable for production claim records.
- Email is a UX identity only. It is not a cryptographic wallet identity.
- Sponsored fees are mocked and no transaction is submitted.
- Connected Cardano wallets are external browser wallets only.
- Custom campaigns created in the dashboard exist only in the current browser.
- QR code generation is intentionally left as a placeholder.

## v004 priorities

- Real backend database.
- Project authentication.
- Blockfrost or Maestro integration.
- Preprod native asset minting.
- QR claim code generation.
- Passkey-based embedded wallet research/prototype.
- ADA sponsor wallet controls, UTXO management, transaction simulation, rate limits, and abuse prevention.
- Developer SDK and API keys.
