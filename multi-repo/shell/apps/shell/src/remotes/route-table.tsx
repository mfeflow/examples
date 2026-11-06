import type { ComponentType } from 'react';
import { Home } from '../pages/Home';
import { CatalogRoute } from './catalog';
import { CartRoute } from './cart';

export interface RouteEntry {
  path: string;
  Component: ComponentType;
}

export const routes: RouteEntry[] = [
  // `mfeflow add remote <name>` adds a route here.
  { path: '/', Component: Home },
  { path: '/catalog', Component: CatalogRoute },
  { path: '/cart', Component: CartRoute },
];
