export default function TransaksiPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transaksi</h1>
        <button
          className="rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ background: 'var(--primary)', minHeight: '44px' }}
        >
          + Tambah
        </button>
      </div>
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Belum ada transaksi
        </p>
      </div>
    </div>
  )
}
