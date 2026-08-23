import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { formatRupiah } from '@/lib/format'

export default async function DashboardPage() {
  const session = await getSession()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Proyeksi "cukup sampai tanggal" */}
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Sisa uangmu cukup sampai</p>
        <p className="text-3xl font-bold mt-1">—</p>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Belum cukup data untuk proyeksi
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Pemasukan', value: formatRupiah(0) },
          { label: 'Pengeluaran', value: formatRupiah(0) },
          { label: 'Selisih', value: formatRupiah(0) },
          { label: 'Tingkat Tabungan', value: '0%' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</p>
            <p className="text-lg font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Target nabung progress */}
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="text-lg font-bold mb-4">Target Nabung</h2>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Belum ada target.{' '}
          <a href="/target" className="font-medium" style={{ color: 'var(--primary)' }}>Buat target pertama</a>
        </p>
      </div>

      {/* Transaksi terakhir */}
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="text-lg font-bold mb-4">Transaksi Terakhir</h2>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Belum ada transaksi. Mulai catat pengeluaranmu!
        </p>
      </div>
    </div>
  )
}
