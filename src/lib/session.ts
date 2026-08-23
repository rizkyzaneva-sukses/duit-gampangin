import { cookies } from 'next/headers'
import { sealData, unsealData } from 'iron-session'

const sessionPassword = process.env.IRON_SESSION_SECRET!
const cookieName = 'duit-gampangin-session'

export interface SessionData {
  userId: string
  householdId: string
  role: string
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const encrypted = cookieStore.get(cookieName)?.value
  if (!encrypted) return null

  try {
    const data = await unsealData<SessionData>(encrypted, {
      password: sessionPassword,
    })
    return data
  } catch {
    return null
  }
}

export async function setSession(data: SessionData) {
  const encrypted = await sealData(data, {
    password: sessionPassword,
  })
  const cookieStore = await cookies()
  cookieStore.set(cookieName, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(cookieName)
}
