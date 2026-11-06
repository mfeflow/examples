import { http, HttpResponse } from 'msw';

export const sampleOrders = [
  {
    id: 'A-1001',
    customer: 'Asha',
    totalCents: 12900,
    status: 'paid',
  },
  {
    id: 'A-1002',
    customer: 'Ben',
    totalCents: 4500,
    status: 'pending',
  },
  {
    id: 'A-1003',
    customer: 'Chen',
    totalCents: 23000,
    status: 'paid',
  },
  {
    id: 'A-1004',
    customer: 'Dara',
    totalCents: 7800,
    status: 'refunded',
  },
  {
    id: 'A-1005',
    customer: 'Esi',
    totalCents: 15600,
    status: 'paid',
  },
];

// Requests a test makes are answered here. Add the endpoints your app calls;
// a request nothing answers fails the test (see src/test/setup.ts).
export const handlers = [
  http.get('*/api/health', () => HttpResponse.json({ ok: true })),
  http.get('*/api/orders.json', () => HttpResponse.json({ orders: sampleOrders })),
];
