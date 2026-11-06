import type { Order } from '../api/client';

export interface RevenueSummary {
  collectedCents: number;
  averageCents: number;
  refundedCents: number;
}

export function summarize(orders: Order[]): RevenueSummary {
  const paid = orders.filter((order) => order.status === 'paid');
  const collectedCents = paid.reduce((sum, order) => sum + order.totalCents, 0);
  const refundedCents = orders
    .filter((order) => order.status === 'refunded')
    .reduce((sum, order) => sum + order.totalCents, 0);
  return {
    collectedCents,
    averageCents: paid.length === 0 ? 0 : Math.round(collectedCents / paid.length),
    refundedCents,
  };
}
