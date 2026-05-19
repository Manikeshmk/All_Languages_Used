```tsx id="krpl2n"
export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0d1117',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '10px',
          }}
        >
          🌍 All Languages Used
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: '#8b949e',
            marginBottom: '40px',
          }}
        >
          Display every programming language ever used across all your GitHub repositories.
        </p>

        <div
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '40px',
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
            textAlign: 'left',
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>
            Usage
          </h2>

          <pre
            style={{
              background: '#0d1117',
              padding: '20px',
              borderRadius: '12px',
              overflowX: 'auto',
              color: '#58a6ff',
            }}
          >
{`![All Languages](https://all-languages-used.vercel.app/api/languages?username=YOUR_USERNAME)`}
          </pre>

          <p
            style={{
              marginTop: '20px',
              color: '#8b949e',
            }}
          >
            Replace <strong>YOUR_USERNAME</strong> with your GitHub username.
          </p>
        </div>

        <footer
          style={{
            marginTop: '50px',
            color: '#8b949e',
          }}
        >
          Built with Next.js + Vercel
        </footer>
      </div>
    </main>
  );
}
```
