import { http, HttpResponse } from 'msw';

export const sampleProducts = [
  { sku: 'mug-01', name: 'Enamel mug', priceCents: 1800 },
  { sku: 'bag-02', name: 'Canvas tote', priceCents: 2400 },
];

// Requests a test makes are answered here. Add the endpoints your app calls;
// a request nothing answers fails the test (see src/test/setup.ts).
export const handlers = [
  http.get('*/api/health', () => HttpResponse.json({ ok: true })),
  http.get('*/api/products.json', () => HttpResponse.json({ products: sampleProducts })),
];
