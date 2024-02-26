'use client'
import { signIn, useSession,  } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const withAuth = (WrappedComponent: React.ComponentType) => {
  const higherOrderComponent = (props: any) => {
    const {status} = useSession()
    const router = useRouter()
    const isSignedIn = status==='authenticated'
    const isLoading = status==='loading'
    useEffect(() => {
      if (!isSignedIn && !isLoading) {
        signIn()
      }
    }, [status])

    if (isLoading) return <div>Loading...</div>
    if (!status) return null

    return <WrappedComponent {...props} />
  }
  return higherOrderComponent
}

export default withAuth
