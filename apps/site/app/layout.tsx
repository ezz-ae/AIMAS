export const metadata = {
  title: "AIMAS Protocol",
  description: "Fulfillment Certainty Standard — Search-only terminal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        background: "#0b0c10",
        color: "#e6e6e6"
      }}>
        {children}
      </body>
    </html>
  );
}
