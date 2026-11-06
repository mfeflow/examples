# mfeflow examples

Small, runnable React micro-frontend projects made with mfeflow 0.8.0. Each folder is its own project, made by the CLI and then edited by hand. They are not a shared workspace, so you can copy one folder out and use it.

| Folder | What it shows |
| --- | --- |
| [`ecommerce`](ecommerce) | A shell with catalog, cart and checkout remotes that talk through typed events and typed links. |
| [`dashboard`](dashboard) | A shell with orders, revenue and activity widgets that share one query cache, with i18n, a theme toggle and typed analytics. |
| [`multi-repo`](multi-repo) | The same kind of platform split into a platform repo, a shell repo and one repo per remote. |

Each project has its own README with the commands that made it and the commands to run it.

You need Node.js 22.12 or newer and pnpm 12.16.1. CI builds, typechecks, lints and tests every folder on each pull request.

For what mfeflow is and how it works, see the [docs](https://mfeflow.github.io/mfeflow/).

MIT licensed.
