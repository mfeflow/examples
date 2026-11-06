import type { CartLine } from '@ecommerce/contracts/events';

export type NewItem = Pick<CartLine, 'sku' | 'name' | 'priceCents'>;

/** The lines with one more of `item`: a new line, or the quantity of the existing one. */
export function addItem(lines: CartLine[], item: NewItem): CartLine[] {
  const existing = lines.find((line) => line.sku === item.sku);
  if (!existing) return [...lines, { ...item, qty: 1 }];
  return lines.map((line) => (line.sku === item.sku ? { ...line, qty: line.qty + 1 } : line));
}

export function countItems(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}
