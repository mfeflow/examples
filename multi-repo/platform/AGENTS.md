# AGENTS.md

Guidance for coding agents working in this repo.

- This is the platform repo of a polyrepo. The other repos are its siblings: `../platform`, `../shell` and one per team.
- Package manager: pnpm (via corepack). Never npm or yarn. Versions live in the `catalog` of
  `pnpm-workspace.yaml`; add dependencies there and reference them as `catalog:`.
- Every change to a package in `packages/` needs a changeset (`pnpm changeset`).
- Never import from a sibling repo by path. Other repos depend on what is published from here.
EOF
