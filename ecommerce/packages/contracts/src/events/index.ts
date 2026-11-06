/**
 * Every event the platform can carry, by versioned name: <domain>.<event>.v<major>, like
 * cart.item-added.v1. Types only: nothing here runs, so any remote can read it.
 *
 * Add an event by adding a line. Change a payload in a way old listeners cannot read by adding
 * a new version (cart.item-added.v2) and publishing both until every listener has moved.
 */
export interface CartLine {
  sku: string;
  name: string;
  priceCents: number;
  qty: number;
}

export interface Events {
  /** A remote is on the page. The sample event: every remote announces itself, every other one can listen. */
  'mfe.ready.v1': { mfe: string };
  /** The catalog says one more of a product was added. Every occurrence matters, so no replay. */
  'cart.item-added.v1': { sku: string; name: string; priceCents: number };
  /** The shell's running cart. State, not a moment: replayed to a remote that mounts later. */
  'cart.lines.v1': { lines: CartLine[] };
  /** The checkout says the order went through. The shell empties the cart. */
  'order.placed.v1': { totalCents: number };
}
