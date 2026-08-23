/**
 * DSR (Debt Service Ratio) calculation
 * DSR = totalCicilanBulanan / totalPemasukanBulananRutin
 * DSR > 0.30 → peringatan
 * DSR > 0.50 → peringatan keras
 */
export function hitungDSR(
  totalCicilanBulanan: number,
  totalPemasukanBulananRutin: number
): { dsr: number; level: 'aman' | 'peringatan' | 'bahaya'; pesan: string } {
  if (totalPemasukanBulananRutin <= 0) {
    return { dsr: 0, level: 'aman', pesan: 'Belum ada data pemasukan rutin' }
  }

  const dsr = totalCicilanBulanan / totalPemasukanBulananRutin

  if (dsr > 0.5) {
    return {
      dsr,
      level: 'bahaya',
      pesan: `Rasio cicilan ${(dsr * 100).toFixed(0)}% — sangat tinggi. Lebih dari setengah penghasilanmu habis untuk cicilan. Pertimbangkan untuk menunda pengeluaran besar.`,
    }
  }

  if (dsr > 0.3) {
    return {
      dsr,
      level: 'peringatan',
      pesan: `Rasio cicilan ${(dsr * 100).toFixed(0)}% — mulai tinggi. Sebaiknya tidak menambah cicilan baru.`,
    }
  }

  return { dsr, level: 'aman', pesan: '' }
}
