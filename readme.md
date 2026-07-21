# Splits Protocol Docs

Documentation for the [Splits protocol](https://splits.org/protocol/), SDKs, and developer tools.

The published site lives at [splits.org/protocol/docs](https://splits.org/protocol/docs). It explains how to use Splits' onchain revenue infrastructure, including payment splits, waterfalls, vesting, swappers, liquid splits, and the TypeScript SDK.

## Contents

- [Protocol introduction](./pages/index.mdx) and [flow of funds](./pages/flow.mdx)
- [SDK guides](./pages/sdk.mdx) for `@0xsplits/splits-sdk`
- [React SDK](./pages/react.mdx) and [SplitsKit](./pages/splits-kit.mdx) docs
- [Core contract docs](./pages/core.mdx)
- [Template contract docs](./pages/templates.mdx)
- [`llms.txt`](./public/llms.txt) and generated `llms-full.txt` for AI agents and search tools

## Development

Install dependencies:

```sh
pnpm install
```

Start the local docs server:

```sh
pnpm dev
```

Open [http://localhost:3002](http://localhost:3002).

Build the production site:

```sh
pnpm build
```

The build generates `public/llms-full.txt`, builds the Nextra site, and generates the sitemap.

## Editing Docs

Most pages are MDX files under [`pages/`](./pages). Navigation labels and ordering are controlled by `_meta.json` files in each section.

When adding or moving content:

- Add the page under the relevant `pages/` section.
- Update the nearest `_meta.json` so the page appears in the sidebar.
- Update [`public/llms.txt`](./public/llms.txt) when the new content should be discoverable by AI agents.
- Keep user-facing product support content in the [Help Center](https://splits.org/help/) unless it belongs in technical protocol or SDK docs.

## Related Repositories

- [splits-contracts-monorepo](https://github.com/0xSplits/splits-contracts-monorepo) for current Splits contracts
- [splits-contracts](https://github.com/0xSplits/splits-contracts) for legacy protocol contracts
- [splits-sdk](https://github.com/0xSplits/splits-sdk) for TypeScript SDK packages

