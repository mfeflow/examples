# multi-repo

A platform split across repositories, made with mfeflow 0.8.0. There is a platform repo, a shell repo and one repo for each remote. This folder holds the four of them side by side so you can read them in one place. In real use each subfolder is its own git repository, owned by its own team. Here they are plain folders in the examples repo, so the `.git` folders that `mfeflow init` made were removed.

Nothing here was edited by hand after `mfeflow init`. This is the CLI output, so you can see the layout it makes.

## Layout

```
multi-repo/
  platform/   shared packages, reusable CI, Renovate preset, Changesets
  shell/      the shell app, the registry, the dev config
  catalog/    the catalog remote
  cart/       the cart remote
```

| Repo | Who owns it | What is in it |
| --- | --- | --- |
| `platform` | A platform team | `@acme/contracts` and `@acme/tokens`, the reusable CI workflow in `.github/workflows/reusable-ci.yml`, the Renovate preset, Changesets for releases. |
| `shell` | The shell team | `apps/shell`, the `registry/` folder that says which build of each remote staging and prod load, and the dev config that lists where the remotes run. |
| `catalog`, `cart` | One team each | One remote app each. A team ships its remote without a change to any other repo. |

Every folder has its own `mfeflow.json`, with `topology` set to `polyrepo` and a `repo` of `platform`, `shell` or `remote`.

## How the repos depend on each other

- The shell and the remotes read `@acme/contracts` and `@acme/tokens` from `platform`. Until you publish them to a registry, they use `link:` paths to `../../../platform/packages/*`. That is why the folders must sit next to each other and `platform` must be built first.
- Each remote calls the reusable workflow in `platform`, so CI is defined once. The workflow files point at the GitHub owner `acme`. Pass `--org <owner>` to `mfeflow init` for a different owner.
- The shell finds remotes through `devRemotes` in `shell/apps/shell/public/config/runtime-config.dev.json` in development, and through `shell/registry/envs` in staging and prod.
- A new team gets a new repo: run `pnpm mfeflow add team-repo checkout` in `shell`. It creates `../checkout` and registers it in the shell. mfeflow never calls GitHub, so creating the remote repositories, pushing, and publishing the platform packages are steps for you. See the [polyrepo guide](https://mfeflow.github.io/mfeflow/guide/polyrepo).

What the polyrepo topology does not do yet, from the guide: `ci-github` and `env-t3` cannot be added (every repo already calls the reusable workflow), and `mfeflow upgrade` does not work in the repos of a polyrepo. Update the mfeflow packages in each repo by hand for now.

## How it was made

```sh
npx mfeflow@0.8.0 init multi-repo \
  --topology polyrepo \
  --remotes catalog,cart \
  --scope @acme \
  --features lint-oxlint,url-factory,testing \
  --yes
```

Without `--features`, a polyrepo gets only the tsconfig feature, so there would be no lint or test scripts. The three features above are the defaults of a monorepo without `env-t3`.

## Run it

Install and build the platform first, then each repo. Run the dev servers in separate terminals.

```sh
cd platform && pnpm install && pnpm build && cd ..
for repo in shell catalog cart; do (cd $repo && pnpm install); done

(cd catalog && pnpm dev)   # terminal 1, port 4311
(cd cart && pnpm dev)      # terminal 2, port 4312
(cd shell && pnpm mfeflow dev)   # terminal 3, port 4300
```

Open http://localhost:4300.

## Check it

In each of `shell`, `catalog` and `cart`:

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm mfeflow doctor
```

`platform` has `pnpm build`, `pnpm typecheck` and `pnpm lint`. In `catalog` and `cart`, doctor warns that the shell is not in the repo. Point it at a deployed shell or a manifest file with `pnpm mfeflow doctor --against <url|file>`.
