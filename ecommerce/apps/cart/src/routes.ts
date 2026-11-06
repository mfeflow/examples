import { createLinks, defineRoutes } from '@mfeflow/route-factory';
import { createMfeLink } from '@mfeflow/route-factory/react';
import { routes as checkoutContract } from '@ecommerce/contracts/routes/checkout';
import { routes as contract } from '@ecommerce/contracts/routes/cart';

// The paths are in the contracts package, so another remote can link here without importing this
// one. `/cart` is where the shell serves this remote.
export const routes = defineRoutes('/cart', contract);

// Links to this remote's routes, and to checkout's through its contract. A wrong id fails pnpm typecheck.
export const links = createLinks({
  cart: routes,
  checkout: defineRoutes('/checkout', checkoutContract),
});

export const MfeLink = createMfeLink(links);
