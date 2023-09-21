// app/providers.tsx
'use client'
import { Analytics } from '@vercel/analytics/react';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        {children}
        <Analytics />
      </ChakraProvider>
    </CacheProvider>
  )
}