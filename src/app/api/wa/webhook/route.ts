import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseWaMessage, isCommand } from '@/lib/wa/parser'
import { formatRupiah } from '@/lib/format'

/**
 * WhatsApp webhook handler
 * POST /api/wa/webhook
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { from, body: messageText } = body

    if (!from || !messageText) {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
    }

    // Normalize phone number
    const phoneNumber = from.replace(/@c\.us$/, '').replace(/\D/g, '')

    // Find verified WaBinding
    const binding = await prisma.waBinding.findFirst({
      where: {
        waNumber: phoneNumber,
        verified: true,
      },
      include: {
        user: {
          include: { household: true },
        },
      },
    })

    if (!binding) {
      return NextResponse.json({
        reply: 'Nomor ini belum terdaftar. Silakan daftar di aplikasi Duit Gampangin terlebih dahulu.',
      })
    }

    // Check if it's a command
    const command = isCommand(messageText)
    if (command) {
      return NextResponse.json({ reply: `Perintah "${command}" belum tersedia di v1.` })
    }

    // Parse message
    const parsed = parseWaMessage(messageText)

    if (!parsed.nominal) {
      return NextResponse.json({
        reply: 'Format tidak dikenali. Contoh: "makan siang 25rb" atau "bensin 50k"',
      })
    }

    if (!parsed.confident) {
      return NextResponse.json({
        reply: `Nominal ${formatRupiah(parsed.nominal)} tercatat. Masuk kategori mana? Balas dengan nama kategori.`,
      })
    }

    // TODO: Create transaction in database
    // For now, just confirm
    return NextResponse.json({
      reply: `Tercatat. ${parsed.category} ${formatRupiah(parsed.nominal)}.`,
    })
  } catch {
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 })
  }
}
