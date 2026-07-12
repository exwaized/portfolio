export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      
      <div>
        <h1>ML & GenAI Engineer</h1>
        <p style={{ marginTop: 'var(--space-3)' }}>
          M.Sc. ML & GenAI @ TISS Mumbai. Building live systems — not screenshots.
        </p>
      </div>

      <div className="panel">
        <h2>Live Systems</h2>
        <p style={{ marginTop: 'var(--space-3)' }}>Demo panels loading in Step 2.</p>
      </div>

    </div>
  )
}