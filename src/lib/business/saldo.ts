/**
 * Saldo calculation
 * saldoKantong = saldoAwal + Σ(MASUK) − Σ(KELUAR) − Σ(TRANSFER keluar) + Σ(TRANSFER masuk)
 * Transfer antar kantong sendiri TIDAK PERNAH dihitung sebagai pemasukan/pengeluaran
 */
export function hitungSaldo(
  saldoAwal: number,
  masuk: number,
  keluar: number,
  transferMasuk: number,
  transferKeluar: number
): number {
  return saldoAwal + masuk - keluar - transferKeluar + transferMasuk
}
