export default function PengaturanPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pengaturan</h1>
      <div className="rounded-xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="text-lg font-semibold mb-4">Rumah Tangga</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Rumah Tangga</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2 text-base"
              style={{ background: 'var(--background)', borderColor: 'var(--border)', fontSize: '16px' }}
              placeholder="Contoh: Keluarga Budi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Gajian</label>
            <input
              type="number"
              min={1}
              max={31}
              className="w-full rounded-lg border px-3 py-2 text-base"
              style={{ background: 'var(--background)', borderColor: 'var(--border)', fontSize: '16px' }}
              placeholder="25"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
