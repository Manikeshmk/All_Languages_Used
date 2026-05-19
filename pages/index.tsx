import { useState, useEffect } from "react";

export default function Home() {
  const [copies, setCopies] = useState(0);
  const [visits, setVisits] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // useEffect(() => {
  //   // Track page visit
  //   fetch("/api/analytics", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ action: "visit" }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setVisits(data.totalVisits))
  //     .catch(() => {});
  //
  //   // Fetch current stats
  //   fetch("/api/analytics")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setVisits(data.totalVisits);
  //       setCopies(data.totalCopies);
  //     })
  //     .catch(() => {});
  // }, []);

  const trackCopy = async () => {
    const text = `![All Languages](https://all-languages-used.vercel.app/api/languages?username=YOUR_USERNAME)`;
    navigator.clipboard.writeText(text);

    // Show copied state
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    // Track copy action
    // fetch("/api/analytics", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ action: "copy" }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setCopies(data.totalCopies))
    //   .catch(() => {});
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0d1117",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Analytics display - commented out
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            padding: "15px",
            background: "#161b22",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#8b949e",
          }}
        >
          <div>
            👀 Visits: <strong style={{ color: "#58a6ff" }}>{visits}</strong>
          </div>
          <div>
            📋 Copies: <strong style={{ color: "#58a6ff" }}>{copies}</strong>
          </div>
        </div>
        */}

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
          }}
        >
          All Languages Used
        </h1>

        <p
          style={{
            color: "#8b949e",
            marginBottom: "40px",
          }}
        >
          Generate a GitHub languages widget using all your repositories.
        </p>

        <div
          style={{
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "16px",
            padding: "30px",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Example Widget</h2>

          <img
            src="/api/languages?username=manikeshmk"
            alt="All Languages Widget"
            style={{
              width: "100%",
              maxWidth: "800px",
              borderRadius: "12px",
            }}
          />
        </div>

        <div
          style={{
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "16px",
            padding: "30px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Usage</h2>

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
              onClick={trackCopy}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: isCopied
                  ? "linear-gradient(135deg, #28a745, #20c997)"
                  : "#238636",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                transform: isCopied ? "scale(1.05)" : "scale(1)",
                boxShadow: isCopied
                  ? "0 0 15px rgba(40, 167, 69, 0.6)"
                  : "none",
              }}
            >
              {isCopied ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          <p
            style={{
              marginTop: "20px",
              color: "#8b949e",
            }}
          >
            Replace <strong>YOUR_USERNAME</strong> with your GitHub username.
          </p>
        </div>
      </div>
    </main>
  );
}
