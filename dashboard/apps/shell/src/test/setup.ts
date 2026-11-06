import { cleanup, configure } from '@testing-library/react';
import { resetPlatform } from '@mfeflow/testing';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/server';

// A slow machine or a busy CI runner needs longer than the 1 s default to load a chunk or a mock response.
configure({ asyncUtilTimeout: 4000 });

beforeAll(() => {
  server.listen({ onUnhandledFrame: 'error' });
});

afterEach(() => {
  cleanup();
  resetPlatform();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
