export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Laporan</h1>
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Belum ada data untuk laporan. Mulai catat transaksi untuk melihat ringkasan.
        </p>
      </div>
    </div>
  )
}
