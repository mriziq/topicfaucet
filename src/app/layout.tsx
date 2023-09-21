// import './globals.css'
import type { Metadata } from 'next'
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'Topic Faucet',
  description: 'Coffee bean your brain. Instantly refresh your context when searching for design inspiration.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>

      <Providers>
        {children}
      </Providers>

    </>
  )
}
