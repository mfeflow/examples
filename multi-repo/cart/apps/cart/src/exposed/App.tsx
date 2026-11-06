import { useState } from 'react';

export default function App() {
  const [clicks, setClicks] = useState(0);
  return (
    <section data-testid="cart">
      <h2>cart</h2>
      <button
        type="button"
        onClick={() => {
          setClicks(clicks + 1);
        }}
      >
        Clicked {clicks} times
      </button>
    </section>
  );
}
