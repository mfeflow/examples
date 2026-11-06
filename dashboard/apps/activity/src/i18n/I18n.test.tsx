import { StrictMode } from 'react';
import { screen } from '@testing-library/react';
import { getI18n } from '@mfeflow/i18n';
import { renderWithPlatform, resetPlatform } from '@mfeflow/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { I18n } from './I18n';

afterEach(resetPlatform);

describe('the activity i18n wrapper', () => {
  it('starts its own i18n when the remote runs without the shell', async () => {
    renderWithPlatform(
      <I18n>
        <p>content</p>
      </I18n>,
    );
    expect(await screen.findByText('content')).toBeDefined();
    expect(getI18n().language).toBe('en');
  });

  it('starts one instance when StrictMode runs the effect twice', async () => {
    renderWithPlatform(
      <StrictMode>
        <I18n>
          <p>content</p>
        </I18n>
      </StrictMode>,
    );
    expect(await screen.findAllByText('content')).toHaveLength(1);
  });
});
