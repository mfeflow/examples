# mfeflow examples

Real-world React micro-frontend examples built with
[mfeflow](https://github.com/mfeflow/mfeflow) and Module Federation 2.0.

> **Coming with mfeflow v0.1.**

| Example           | What it shows                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `ecommerce`       | storefront shell with catalog, cart, checkout and account remotes; mini-cart widget; typed events; GTM consent; OpenTelemetry |
| `saas-dashboard`  | shell with analytics, billing and team remotes                                                                                |
| `polyrepo-teams`  | the same platform split across several repositories                                                                           |
| `adopt-existing`  | bringing an existing Module Federation project under mfeflow                                                                  |
| `registry-server` | percentage rollouts and a kill switch with the registry server                                                                |

Each example installs `@mfeflow/*` from npm and is tested in CI. Start from
one with:

```bash
npm create mfeflow@latest my-shop -- --template gh:mfeflow/examples/ecommerce
```

MIT licensed.
