export default function PasanganPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pasangan</h1>
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Undang pasanganmu untuk mengelola keuangan bersama.
        </p>
        <button
          className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ background: 'var(--primary)', minHeight: '44px' }}
        >
          Undang via WhatsApp
        </button>
      </div>
    </div>
  )
}
