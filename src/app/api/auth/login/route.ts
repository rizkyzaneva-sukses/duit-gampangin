import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { setSession } from '@/lib/session'
import argon2 from 'argon2'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: 'Username dan password wajib diisi' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username },
      include: { household: true },
    })

    if (!user || !user.isActive) {
      return NextResponse.json({ message: 'Username atau password salah' }, { status: 401 })
    }

    const valid = await argon2.verify(user.passwordHash, password)
    if (!valid) {
      return NextResponse.json({ message: 'Username atau password salah' }, { status: 401 })
    }

    await setSession({
      userId: user.id,
      householdId: user.householdId,
      role: user.role,
    })

    return NextResponse.json({ message: 'OK' })
  } catch {
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 })
  }
}
