import type { ComponentType } from 'react';
import { Home } from '../pages/Home';
import { CatalogRoute } from './catalog';
import { CartRoute } from './cart';
import { CheckoutRoute } from './checkout';

export interface RouteEntry {
  path: string;
  Component: ComponentType;
}

// `mfeflow add remote <name>` adds a route here.
export const routes: RouteEntry[] = [
  { path: '/', Component: Home },
  { path: '/catalog', Component: CatalogRoute },
  { path: '/cart', Component: CartRoute },
  { path: '/checkout', Component: CheckoutRoute },
];
