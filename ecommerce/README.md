# ecommerce

A storefront made with mfeflow 0.8.0. A shell serves three remotes: catalog, cart and checkout. The remotes never import each other. They talk through events and links that the shell and a small contracts package type for them.

## What happens

1. The catalog loads its product list from `/api/products.json` and shows an "Add to cart" button for each one.
2. The button publishes `cart.item-added.v1`.
3. The shell is always on the page, so it hears the event. It keeps the cart lines and publishes them as `cart.lines.v1`. The count in the header ("Cart (2)") follows that event.
4. Open the cart. It was not loaded while you were on the catalog, so it gets the latest lines from the replayed `cart.lines.v1`.
5. The cart links to checkout and checkout links back, both through route-factory.
6. "Place order" in checkout publishes `order.placed.v1`. The shell empties the cart.

## Features used

| Feature                                                                                                                               | Where to look                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [event-bus](https://mfeflow.github.io/mfeflow/features/event-bus)                                                                     | `packages/contracts/src/events/index.ts`, `apps/shell/src/cart/store.ts`, `apps/catalog/src/events.ts` |
| [route-factory](https://mfeflow.github.io/mfeflow/features/route-factory)                                                             | `apps/cart/src/routes.ts`, `apps/checkout/src/routes.ts`, `packages/contracts/src/routes/`             |
| [http](https://mfeflow.github.io/mfeflow/features/http) and [url-factory](https://mfeflow.github.io/mfeflow/features/url-factory)     | `apps/catalog/src/api/`                                                                                |
| [testing](https://mfeflow.github.io/mfeflow/features/testing)                                                                         | `apps/*/src/mocks/handlers.ts` (MSW), tests next to the code                                           |
| [theming](https://mfeflow.github.io/mfeflow/features/theming)                                                                         | `apps/shell/src/theme/`, `apps/catalog/src/theme/tokens.ts`                                            |
| [lint-oxlint](https://mfeflow.github.io/mfeflow/features/lint-oxlint) and [env-t3](https://mfeflow.github.io/mfeflow/features/env-t3) | the defaults of `mfeflow init`                                                                         |

## How it was made

```sh
npx mfeflow@0.8.0 init ecommerce \
  --remotes catalog,cart,checkout \
  --features lint-oxlint,url-factory,env-t3,testing,event-bus,route-factory,http,theming \
  --yes
```

`--features` replaces the default list, so the four defaults (lint-oxlint, url-factory, env-t3, testing) are named again. After that the product list, the cart store, the cart and checkout pages and their tests were written by hand. The hand-written parts are listed below.

| Added by hand                           | Files                                                                                              |
| --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Events and the money helper             | `packages/contracts/src/events/index.ts`, `packages/contracts/src/money.ts`                        |
| Product list and "add to cart"          | `apps/catalog/src/products/`, `apps/catalog/src/events.ts`, `apps/catalog/src/exposed/App.tsx`     |
| The cart store and the header count     | `apps/shell/src/cart/`, `apps/shell/src/App.tsx`, `apps/shell/src/bootstrap.tsx`                   |
| Cart and checkout pages                 | `apps/cart/src/exposed/App.tsx`, `apps/checkout/src/exposed/App.tsx`, `apps/*/src/useCartLines.ts` |
| The products file the dev server serves | `apps/shell/public/api/products.json`                                                              |

## Run it

```sh
pnpm install
pnpm dev
```

Open http://localhost:4300. The remotes run on 4311 (catalog), 4312 (cart) and 4313 (checkout).

The "mocked API" works in two places. In the browser, the shell's dev server serves `apps/shell/public/api/products.json`. In tests, MSW answers `/api/products.json` from `apps/catalog/src/mocks/handlers.ts`. A remote started on its own (`pnpm dev` inside `apps/catalog`) has no products file, so run it through the shell.

## Check it

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm mfeflow doctor
```

`pnpm doctor` is pnpm's own command, so use `pnpm mfeflow doctor`. Doctor reports "A copied file changed since mfeflow wrote it" for every generated file that this example edited. That is expected here and is a warning, not an error. `pnpm test:e2e` (the Playwright smoke test) needs `pnpm exec playwright install chromium` first and is not part of CI.

## Notes

- The shell, not the cart remote, holds the cart. A remote that is not on the page cannot hear events, so the page-wide state lives in the part that is always there. `cart.lines.v1` is marked `replay` in `apps/shell/src/events.ts` so late remotes still get it.
- `packages/contracts` also has a few lines of code (`money.ts`) so the remotes do not repeat the price format. The events file is types only.
