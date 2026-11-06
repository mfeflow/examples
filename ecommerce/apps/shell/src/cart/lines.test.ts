import { describe, expect, it } from 'vitest';
import { addItem, countItems } from './lines';

const mug = { sku: 'mug-01', name: 'Enamel mug', priceCents: 1800 };
const tote = { sku: 'bag-02', name: 'Canvas tote', priceCents: 2400 };

describe('addItem', () => {
  it('starts a line with quantity 1', () => {
    expect(addItem([], mug)).toEqual([{ ...mug, qty: 1 }]);
  });

  it('adds to the quantity of a line that is already there', () => {
    const lines = addItem(addItem([], mug), mug);
    expect(lines).toEqual([{ ...mug, qty: 2 }]);
  });

  it('does not change the lines it was given', () => {
    const before = addItem([], mug);
    addItem(before, tote);
    expect(before).toEqual([{ ...mug, qty: 1 }]);
  });
});

describe('countItems', () => {
  it('adds up the quantities', () => {
    expect(countItems(addItem(addItem(addItem([], mug), mug), tote))).toBe(3);
    expect(countItems([])).toBe(0);
  });
});
