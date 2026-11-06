import { createLinks, defineRoutes } from '@mfeflow/route-factory';
import { createMfeLink } from '@mfeflow/route-factory/react';
import { routes as cartContract } from '@ecommerce/contracts/routes/cart';
import { routes as contract } from '@ecommerce/contracts/routes/catalog';

// The paths are in the contracts package, so another remote can link here without importing this
// one. `/catalog` is where the shell serves this remote.
export const routes = defineRoutes('/catalog', contract);

// Links to this remote's routes, and to cart's through its contract. A wrong id or a missing
// parameter fails pnpm typecheck.
export const links = createLinks({
  catalog: routes,
  cart: defineRoutes('/cart', cartContract),
});

export const MfeLink = createMfeLink(links);
