import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Authentication',
  description: 'Ensure the security of your account with our authentication system.',
};

export default function Login({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>{children}</main>
  )
}
