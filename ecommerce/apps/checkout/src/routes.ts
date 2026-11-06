import { basePath } from '@ecommerce/contracts/base';
import { createLinks, defineRoutes } from '@mfeflow/route-factory';
import { createMfeLink } from '@mfeflow/route-factory/react';
import { routes as cartContract } from '@ecommerce/contracts/routes/cart';
import { routes as contract } from '@ecommerce/contracts/routes/checkout';

// The paths are in the contracts package, so another remote can link here without importing this
// one. `/checkout` is where the shell serves this remote.
export const routes = defineRoutes('/checkout', contract);

// Links to this remote's routes, and back to the cart through its contract.
export const links = createLinks(
  {
    checkout: routes,
    cart: defineRoutes('/cart', cartContract),
  },
  { base: basePath },
);

export const MfeLink = createMfeLink(links);
