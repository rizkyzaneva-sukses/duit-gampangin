export default function CicilanPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cicilan & Utang</h1>
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Belum ada cicilan. Tambahkan KPR, kendaraan, atau cicilan lainnya.
        </p>
      </div>
    </div>
  )
}
