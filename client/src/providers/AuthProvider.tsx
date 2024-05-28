'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type PropsWithChildren } from 'react'
import { useAuth } from "@/hooks/useAuth";

export default function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const { user, isLoggedIn } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      window.localStorage.setItem('token', user?.jwt || '')
    }
  }, [user, isLoggedIn])

  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/register') {
      const isLoggedIn = !!window.localStorage.getItem('token')
      if (!isLoggedIn) {
        router.push('/login')
      }
    }
  }, [pathname, isLoggedIn])

  return <>{children}</>
}
