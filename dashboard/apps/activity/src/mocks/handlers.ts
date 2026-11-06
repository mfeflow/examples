import { http, HttpResponse } from 'msw';

export const sampleEvents = [
  {
    id: 'e1',
    text: 'Asha paid order A-1001',
    at: '2026-11-02T09:12:00Z',
  },
  {
    id: 'e2',
    text: 'Ben started order A-1002',
    at: '2026-11-02T09:40:00Z',
  },
  {
    id: 'e3',
    text: 'Dara was refunded for A-1004',
    at: '2026-11-02T10:05:00Z',
  },
  {
    id: 'e4',
    text: 'Esi paid order A-1005',
    at: '2026-11-02T10:31:00Z',
  },
];

// Requests a test makes are answered here. Add the endpoints your app calls;
// a request nothing answers fails the test (see src/test/setup.ts).
export const handlers = [
  http.get('*/api/health', () => HttpResponse.json({ ok: true })),
  http.get('*/api/activity.json', () => HttpResponse.json({ events: sampleEvents })),
];
