"use client";
import { useState } from "react";

// Valid user IDs the model was trained on — synthetic data had 500 users
const USERS = ["user_1", "user_2", "user_5", "user_10", "user_42", "user_99"];

export default function Home() {
  const [userId, setUserId] = useState("user_1");
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  async function fetchRecs() {
    setLoading(true);
    setResults(null);
    const t0 = performance.now();

    // Hit your live Render endpoint directly from the browser
    const res = await fetch("https://gcp-recommender.onrender.com/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, n: 5, exclude_seen: true }),
    });

    const data = await res.json();
    const t1 = performance.now();
    setLatency(Math.round(t1 - t0));
    setResults(data.recommendations);
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>

      {/* Hero */}
      <div>
        <h1>ML & GenAI Engineer</h1>
        <p style={{ marginTop: "var(--space-3)" }}>
          M.Sc. ML & GenAI @ TISS Mumbai. Live systems — not screenshots.
        </p>
      </div>

      {/* Live Demo Panel */}
      <div className="panel">
        <h2>Live System — GCP Recommendation Engine</h2>
        <p style={{ marginTop: "var(--space-3)", marginBottom: "var(--space-4)" }}>
          ALS matrix factorization on 15K interactions · 32 latent dims · 500 users · 200 items.
          Deployed on Render via Docker. Hitting a real FastAPI endpoint below.
        </p>

        {/* Controls */}
        <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", flexWrap: "wrap" }}>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{
              background: "var(--bg)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              padding: "var(--space-2) var(--space-3)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            {USERS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>

          <button
            onClick={fetchRecs}
            disabled={loading}
            style={{
              background: loading ? "transparent" : "var(--accent)",
              color: loading ? "var(--text-muted)" : "#000",
              border: "1px solid var(--accent)",
              padding: "var(--space-2) var(--space-3)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 500,
            }}
          >
            {loading ? "calling endpoint..." : "get recommendations →"}
          </button>

          {/* Show real latency after call */}
          {latency && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              {latency}ms
            </span>
          )}
        </div>

        {/* Results */}
        {results && (
          <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {results.map((r, i) => (
              <div
                key={r.item_id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2rem 1fr auto",
                  gap: "var(--space-3)",
                  alignItems: "center",
                  padding: "var(--space-2) 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {/* Rank */}
                <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>#{i + 1}</span>

                {/* Item info */}
                <div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{r.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    {r.category} · {r.brand}
                  </div>
                </div>

                {/* Price + rating */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--accent)" }}>₹{r.price.toFixed(0)}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>★ {r.avg_rating}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}