
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children, session }: { children: React.ReactNode, session:any }) {
  return <ChakraProvider>
    <SessionProvider session={session}>
    {children}
    </SessionProvider>
    </ChakraProvider>
}