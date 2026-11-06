# dashboard

An admin dashboard made with mfeflow 0.8.0. A shell serves three widgets as remotes: orders, revenue and activity. The home page shows all three side by side.

## What it shows

- One query cache, owned by the shell. Orders and revenue both read the key `['shell', 'orders']`, so the page asks the API for the orders once. Activity has its own key, `['activity', 'feed']`.
- Each widget brings its own messages in English and Arabic. The language picker is in the shell. Switch to Arabic and the page flips to right to left.
- A theme toggle in the shell (light and dark). The widgets only read `--mf-*` CSS variables.
- Typed analytics. Each widget declares the events it can send, so a wrong event name or a missing parameter fails `pnpm typecheck`. Nothing is sent until you set a `gtmId` in the runtime config, and the consent banner decides what a tag may do.

## Features used

| Feature                                                                                                                               | Where to look                                                |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [data-react-query](https://mfeflow.github.io/mfeflow/features/data-react-query)                                                       | `apps/shell/src/query/Query.tsx`, `apps/*/src/query/`        |
| [http](https://mfeflow.github.io/mfeflow/features/http) and [url-factory](https://mfeflow.github.io/mfeflow/features/url-factory)     | `apps/*/src/api/`                                            |
| [i18n](https://mfeflow.github.io/mfeflow/features/i18n)                                                                               | `apps/shell/src/i18n/`, `apps/*/src/i18n/messages/`          |
| [theming](https://mfeflow.github.io/mfeflow/features/theming)                                                                         | `apps/shell/src/theme/`                                      |
| [analytics-gtm](https://mfeflow.github.io/mfeflow/features/analytics-gtm)                                                             | `apps/shell/src/analytics/`, `apps/*/src/analytics.ts`       |
| [testing](https://mfeflow.github.io/mfeflow/features/testing)                                                                         | `apps/*/src/mocks/handlers.ts` (MSW), tests next to the code |
| [lint-oxlint](https://mfeflow.github.io/mfeflow/features/lint-oxlint) and [env-t3](https://mfeflow.github.io/mfeflow/features/env-t3) | the defaults of `mfeflow init`                               |

## How it was made

```sh
npx mfeflow@0.8.0 init dashboard \
  --remotes orders,revenue,activity \
  --features lint-oxlint,url-factory,env-t3,testing,http,data-react-query,i18n,theming,analytics-gtm \
  --yes
```

`--features` replaces the default list, so the four defaults are named again. The widgets, their tests and the data files were written by hand.

| Added by hand                                                    | Files                                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Orders widget, with a status filter that sends `orders_filtered` | `apps/orders/src/orders/`, `apps/orders/src/query/useOrders.ts`            |
| Revenue widget, which reads the same orders key                  | `apps/revenue/src/revenue/`, `apps/revenue/src/query/useOrders.ts`         |
| Activity widget                                                  | `apps/activity/src/activity/`, `apps/activity/src/query/useActivity.ts`    |
| Messages and the i18n wrapper                                    | `apps/*/src/i18n/`                                                         |
| Mock data the dev server serves                                  | `apps/shell/public/api/orders.json`, `apps/shell/public/api/activity.json` |
| A test helper that renders under a fresh query client            | `apps/*/src/test/render.tsx`                                               |

## Run it

```sh
pnpm install
pnpm dev
```

Open http://localhost:4300. The remotes run on 4311 (orders), 4312 (revenue) and 4313 (activity). In the browser the shell's dev server serves the JSON files under `apps/shell/public/api/`. In tests, MSW answers the same paths.

To turn analytics on, set `gtmId` (for example `GTM-ABC123`) in `apps/shell/public/config/runtime-config.dev.json`.

## Check it

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm mfeflow doctor
```

`pnpm doctor` is pnpm's own command, so use `pnpm mfeflow doctor`. Doctor reports "A copied file changed since mfeflow wrote it" for every generated file that this example edited. That is expected here and is a warning, not an error.

## Notes

- The shared key is written out in both `apps/orders/src/query/keys.ts` and `apps/revenue/src/query/keys.ts`, because the remotes cannot import each other and this project has no contracts package. If you add [event-bus](https://mfeflow.github.io/mfeflow/features/event-bus), put the key there. Each remote's test seeds the shell cache with that key and checks that the widget makes no request of its own.
- The `Order` type is also written in both remotes for the same reason.
