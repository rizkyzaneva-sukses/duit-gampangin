export default function KantongPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kantong</h1>
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Belum ada kantong. Tambahkan rekening bank, dompet tunai, atau e-wallet.
        </p>
      </div>
    </div>
  )
}
