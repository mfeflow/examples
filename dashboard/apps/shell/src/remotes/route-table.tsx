import type { ComponentType } from 'react';
import { Home } from '../pages/Home';
import { OrdersRoute } from './orders';
import { RevenueRoute } from './revenue';
import { ActivityRoute } from './activity';

export interface RouteEntry {
  path: string;
  Component: ComponentType;
}

// `mfeflow add remote <name>` adds a route here.
export const routes: RouteEntry[] = [
  { path: '/', Component: Home },
  { path: '/orders', Component: OrdersRoute },
  { path: '/revenue', Component: RevenueRoute },
  { path: '/activity', Component: ActivityRoute },
];
