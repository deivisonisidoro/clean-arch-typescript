"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '@/helpers/checkIsPublicRoute'
import { PrivateRoute } from '@/components/PrivateRoute'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname)
  return (
    <html lang="en">
      <body className={inter.className}> 
        <AuthProvider>
          {isPublicPage && children}
          {!isPublicPage && (
            <PrivateRoute>
              {children}
            </PrivateRoute>
          )}
        </AuthProvider>
      </body>
    </html>
  )
}
