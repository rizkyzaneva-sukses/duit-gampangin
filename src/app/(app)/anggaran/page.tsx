export default function AnggaranPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Anggaran</h1>
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Belum ada anggaran. Atur anggaran per pos untuk mengontrol pengeluaran.
        </p>
      </div>
    </div>
  )
}
