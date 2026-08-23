import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r p-4 md:block" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-lg font-bold mb-6">Duit Gampangin</h2>
        <nav className="space-y-1">
          {[
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/transaksi', label: 'Transaksi' },
            { href: '/anggaran', label: 'Anggaran' },
            { href: '/target', label: 'Target Nabung' },
            { href: '/kantong', label: 'Kantong' },
            { href: '/cicilan', label: 'Cicilan' },
            { href: '/laporan', label: 'Laporan' },
            { href: '/pasangan', label: 'Pasangan' },
            { href: '/pengaturan', label: 'Pengaturan' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              style={{ color: 'var(--foreground)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Mobile header */}
        <header className="flex items-center justify-between border-b p-4 md:hidden" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold">Duit Gampangin</h2>
          <button className="rounded-lg p-2" style={{ background: 'var(--secondary)' }}>
            ☰
          </button>
        </header>

        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
