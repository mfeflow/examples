# AGENTS.md

Guidance for coding agents working in this repo.

- This is the shell repo of a polyrepo. The other repos are its siblings: `../platform`, `../shell` and one per team.
- Package manager: pnpm (via corepack). Never npm or yarn. Versions live in the `catalog` of
  `pnpm-workspace.yaml`; add dependencies there and reference them as `catalog:`.
- `@acme/*` packages come from `../platform` (`link:` paths until they are published). Build the platform repo first.
- TypeScript 7, strict. Relative imports have no file extension (`./plan`, not `./plan.js`).
- Add features with the `mfeflow` CLI (`pnpm mfeflow add <feature>`). `mfeflow.json` is its record of this repo.
- A new remote gets a repo with `pnpm mfeflow add team-repo <name>`. Do not add remotes to this repo by hand.
EOF
