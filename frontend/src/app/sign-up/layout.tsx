import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Registration',
  description: 'Sign up for an account to access exclusive features and content.',
};

export default function RegisterUser({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>{children}</main>
  )
}
