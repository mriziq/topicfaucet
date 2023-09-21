// import './globals.css'
import type { Metadata } from 'next'
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'Topic Faucet | About',
  description: 'Instantly refresh your context when searching for design inspiration.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  )
}