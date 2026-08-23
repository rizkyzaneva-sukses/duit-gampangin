/**
 * Sinking fund / target nabung calculations
 * sisaTarget = targetJumlah − terkumpul
 * sisaBulan = jumlah periode penuh antara hari ini dan targetTanggal
 * setoranPerBulan = ceil(sisaTarget / max(sisaBulan, 1))
 * estimasiTercapai = berdasarkan rata-rata setoran NYATA 3 periode terakhir
 */
export function hitungSetoranBulanan(
  targetJumlah: number,
  terkumpul: number,
  targetTanggal: Date
): { sisaTarget: number; sisaBulan: number; setoranPerBulan: number } {
  const sisaTarget = targetJumlah - terkumpul
  const now = new Date()
  const diffMs = targetTanggal.getTime() - now.getTime()
  const sisaBulan = Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30)), 1)
  const setoranPerBulan = Math.ceil(sisaTarget / sisaBulan)

  return { sisaTarget, sisaBulan, setoranPerBulan }
}

export function estimasiTercapai(
  targetJumlah: number,
  terkumpul: number,
  rataRataSetoranBulanan: number
): Date | null {
  if (rataRataSetoranBulanan <= 0) return null
  const sisaTarget = targetJumlah - terkumpul
  if (sisaTarget <= 0) return new Date()
  const sisaBulan = Math.ceil(sisaTarget / rataRataSetoranBulanan)
  const estimasi = new Date()
  estimasi.setMonth(estimasi.getMonth() + sisaBulan)
  return estimasi
}
