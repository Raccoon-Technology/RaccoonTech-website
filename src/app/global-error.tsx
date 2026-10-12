"use client";

// Last-resort fallback when the root layout itself fails; kept dependency-free on purpose.
export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1 style={{ margin: 0 }}>Algo deu errado / Something went wrong</h1>
        <button
          type="button"
          onClick={() => retry()}
          style={{
            background: "#6A1B9A",
            color: "#fff",
            border: 0,
            borderRadius: 999,
            padding: "12px 24px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Tentar de novo / Try again
        </button>
      </body>
    </html>
  );
}
