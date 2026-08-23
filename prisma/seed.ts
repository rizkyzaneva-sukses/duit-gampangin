import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding template categories...')

  const templateCategories = [
    // Pengeluaran
    { nama: 'Makan', tipe: 'PENGELUARAN' as const, icon: '🍜', isTemplate: true },
    { nama: 'Transport', tipe: 'PENGELUARAN' as const, icon: '🚗', isTemplate: true },
    { nama: 'Listrik & Air', tipe: 'PENGELUARAN' as const, icon: '💡', isTemplate: true },
    { nama: 'Internet & Pulsa', tipe: 'PENGELUARAN' as const, icon: '📱', isTemplate: true },
    { nama: 'Belanja Bulanan', tipe: 'PENGELUARAN' as const, icon: '🛒', isTemplate: true },
    { nama: 'Cicilan', tipe: 'PENGELUARAN' as const, icon: '🏦', isTemplate: true },
    { nama: 'Kirim Orang Tua', tipe: 'PENGELUARAN' as const, icon: '👨‍👩‍👧', isTemplate: true },
    { nama: 'Kondangan & Sumbangan', tipe: 'PENGELUARAN' as const, icon: '🎁', isTemplate: true },
    { nama: 'Arisan', tipe: 'PENGELUARAN' as const, icon: '🤝', isTemplate: true },
    { nama: 'Uang Sekolah', tipe: 'PENGELUARAN' as const, icon: '📚', isTemplate: true },
    { nama: 'Jajan Pribadi', tipe: 'PENGELUARAN' as const, icon: '☕', isTemplate: true },
    { nama: 'Dana Darurat', tipe: 'PENGELUARAN' as const, icon: '🏥', isTemplate: true },
    // Pemasukan
    { nama: 'Gaji', tipe: 'PEMASUKAN' as const, icon: '💰', isTemplate: true },
    { nama: 'Bonus/THR', tipe: 'PEMASUKAN' as const, icon: '🎉', isTemplate: true },
  ]

  for (const cat of templateCategories) {
    await prisma.category.upsert({
      where: { id: `template-${cat.nama.toLowerCase().replace(/[^a-z]/g, '-')}` },
      update: {},
      create: {
        id: `template-${cat.nama.toLowerCase().replace(/[^a-z]/g, '-')}`,
        nama: cat.nama,
        tipe: cat.tipe,
        icon: cat.icon,
        isTemplate: true,
      },
    })
  }

  console.log(`Seeded ${templateCategories.length} template categories`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
