import { useEffect, useState } from "react";

export default function Home() {
  const [views, setViews] = useState(0);
  const [copied, setCopied] = useState(0);
  useEffect(() => {
  fetch("/api/views")
    .then((res) => res.json())
    .then((data) => setViews(data.views))
    .catch(() => {});
}, []);
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0d1117',
        color: 'white',
        padding: '40px',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: "20px", color: "#8b949e" }}>
  👀 Views: <strong>{views}</strong> | 📋 Copied: <strong>{copied}</strong>
</div>
        <h1
          style={{
            fontSize: '48px',
            marginBottom: '10px',
          }}
        >
          All Languages Used
        </h1>

        <p
          style={{
            color: '#8b949e',
            marginBottom: '40px',
          }}
        >
          Generate a GitHub languages widget using all your repositories.
        </p>

        <div
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '30px',
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>
            Example Widget
          </h2>

          <img
            src="/api/languages?username=manikeshmk"
            alt="All Languages Widget"
            style={{
              width: '100%',
              maxWidth: '800px',
              borderRadius: '12px',
            }}
          />
        </div>

        <div
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '16px',
            padding: '30px',
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>
            Usage
          </h2>

         <div style={{ position: "relative" }}>
  <pre
    id="code"
    style={{
      background: "#0d1117",
      padding: "20px",
      borderRadius: "12px",
      overflowX: "auto",
      color: "#58a6ff",
    }}
  >
{`![All Languages](https://all-languages-used.vercel.app/api/languages?username=YOUR_USERNAME)`}
  </pre>

  <button
    onClick={() => {
      const text = `![All Languages](https://all-languages-used.vercel.app/api/languages?username=YOUR_USERNAME)`;
      navigator.clipboard.writeText(text);
      setCopied((prev) => prev + 1);
    }}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "#238636",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Copy
  </button>
</div>

          <p
            style={{
              marginTop: '20px',
              color: '#8b949e',
            }}
          >
            Replace <strong>YOUR_USERNAME</strong> with your GitHub username.
          </p>
        </div>
      </div>
    </main>
  );
}
