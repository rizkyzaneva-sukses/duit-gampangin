/**
 * Proyeksi "cukup sampai tanggal"
 * rataPengeluaranHarian = Σ pengeluaran periode berjalan / jumlah hari berjalan
 * sisaHari = floor(totalSaldoKantongBelanja / rataPengeluaranHarian)
 * tanggalCukup = hari ini + sisaHari
 * kalau data < 7 hari → tampilkan "belum cukup data"
 */
export function hitungProyeksi(
  totalPengeluaran: number,
  jumlahHariBerjalan: number,
  totalSaldo: number
): { rataHarian: number; sisaHari: number; tanggalCukup: Date | null; cukupData: boolean } {
  if (jumlahHariBerjalan < 7) {
    return { rataHarian: 0, sisaHari: 0, tanggalCukup: null, cukupData: false }
  }

  const rataHarian = Math.round(totalPengeluaran / jumlahHariBerjalan)
  if (rataHarian <= 0) {
    return { rataHarian: 0, sisaHari: Infinity, tanggalCukup: null, cukupData: true }
  }

  const sisaHari = Math.floor(totalSaldo / rataHarian)
  const tanggalCukup = new Date()
  tanggalCukup.setDate(tanggalCukup.getDate() + sisaHari)

  return { rataHarian, sisaHari, tanggalCukup, cukupData: true }
}
