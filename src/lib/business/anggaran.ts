/**
 * Budget calculation with rollover
 * anggaranEfektif = BudgetAllocation.jumlah + rolloverMasuk
 * realisasi = Σ Transaction[KELUAR] pada kategori & periode tsb
 * sisaAnggaran = anggaranEfektif − realisasi
 * rolloverKeluar = rollover ? max(sisaAnggaran, 0) : 0
 */
export function hitungAnggaran(jumlah: number, rolloverMasuk: number, realisasi: number) {
  const anggaranEfektif = jumlah + rolloverMasuk
  const sisaAnggaran = anggaranEfektif - realisasi
  return {
    anggaranEfektif,
    realisasi,
    sisaAnggaran,
    persentase: anggaranEfektif > 0 ? Math.round((realisasi / anggaranEfektif) * 100) : 0,
  }
}

export function hitungRolloverKeluar(sisaAnggaran: number, rollover: boolean): number {
  return rollover ? Math.max(sisaAnggaran, 0) : 0
}
