import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { setSession } from '@/lib/session'
import argon2 from 'argon2'

export async function POST(request: NextRequest) {
  try {
    const { nama, waNumber, username, password } = await request.json()

    if (!nama || !username || !password) {
      return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 })
    }

    // Check if username exists
    const existing = await prisma.user.findUnique({ where: { username } })
    if (existing) {
      return NextResponse.json({ message: 'Username sudah digunakan' }, { status: 400 })
    }

    // Hash password
    const passwordHash = await argon2.hash(password)

    // Create household and user in transaction
    const result = await prisma.$transaction(async (tx) => {
      const household = await tx.household.create({
        data: {
          nama: `${nama}'s Household`,
          tanggalGajian: 25,
        },
      })

      const user = await tx.user.create({
        data: {
          householdId: household.id,
          username,
          passwordHash,
          nama,
          waNumber: waNumber || null,
          role: 'KEPALA',
        },
      })

      // Create subscription (trial)
      await tx.subscription.create({
        data: {
          householdId: household.id,
          plan: 'FREE',
          status: 'TRIAL',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
          durasiBulan: 1,
        },
      })

      return { user, household }
    })

    await setSession({
      userId: result.user.id,
      householdId: result.household.id,
      role: result.user.role,
    })

    return NextResponse.json({ message: 'OK' })
  } catch {
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 })
  }
}
