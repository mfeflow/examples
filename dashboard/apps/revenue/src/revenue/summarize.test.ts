import { describe, expect, it } from 'vitest';
import type { Order } from '../api/client';
import { summarize } from './summarize';

const order = (status: Order['status'], totalCents: number): Order => ({
  id: `${status}-${String(totalCents)}`,
  customer: 'x',
  totalCents,
  status,
});

describe('summarize', () => {
  it('counts only paid orders as collected and averages them', () => {
    const summary = summarize([order('paid', 1000), order('paid', 2000), order('pending', 5000)]);
    expect(summary).toEqual({ collectedCents: 3000, averageCents: 1500, refundedCents: 0 });
  });

  it('adds refunded orders up on their own', () => {
    expect(summarize([order('refunded', 700), order('refunded', 300)]).refundedCents).toBe(1000);
  });

  it('has no average when nothing was paid', () => {
    expect(summarize([order('pending', 100)]).averageCents).toBe(0);
    expect(summarize([]).collectedCents).toBe(0);
  });
});
