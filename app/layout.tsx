import './globals.css'

export const metadata = {
  title: 'Aditya Pandey',
  description: 'ML & GenAI Engineer — live systems, not screenshots.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: 'var(--max-width)',
          margin: '0 auto var(--space-5)',
          paddingBottom: 'var(--space-3)',
          borderBottom: '1px solid var(--border)'
        }}>
          <span style={{ color: 'var(--accent)', fontWeight: 500 }}>aditya pandey</span>
          <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: '0.8rem' }}>
            <a href="https://github.com/exwaized" target="_blank">github</a>
            <a href="https://linkedin.com/in/adityatruly" target="_blank">linkedin</a>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}