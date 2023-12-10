import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unauthenticated',
  description: 'Unauthenticated page',
};

export default function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>{children}</main>
  )
}
