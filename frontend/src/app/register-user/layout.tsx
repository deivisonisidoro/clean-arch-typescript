import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register User',
  description: 'Register user screen',
}

export default function RegisterUser({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>{children}</main>
  )
}
