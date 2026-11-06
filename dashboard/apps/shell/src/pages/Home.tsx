import { RemoteBoundary, registeredRemotes } from '@mfeflow/runtime';

// Shows every remote the registry listed, so a new remote appears here without a code change.
export function Home() {
  const remotes = registeredRemotes();
  if (remotes.length === 0) {
    return <p>No remotes yet. Run `pnpm mfeflow add remote &lt;name&gt;`.</p>;
  }
  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
      }}
    >
      {remotes.map((remote) => (
        <section key={remote.name}>
          <RemoteBoundary id={`${remote.name}/App`} loading={<p>Loading {remote.name}…</p>} />
        </section>
      ))}
    </div>
  );
}
