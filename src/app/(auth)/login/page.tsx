'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        window.location.href = '/dashboard'
      } else {
        const data = await res.json()
        setError(data.message || 'Login gagal')
      }
    } catch {
      setError('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border p-6 shadow-sm" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <h1 className="text-2xl font-bold mb-1">Masuk</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
        Masuk ke Duit Gampangin
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-base"
            style={{ background: 'var(--background)', borderColor: 'var(--border)', fontSize: '16px' }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-base"
            style={{ background: 'var(--background)', borderColor: 'var(--border)', fontSize: '16px' }}
            required
          />
        </div>

        {error && (
          <p className="text-sm" style={{ color: 'var(--destructive)' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg px-4 py-3 text-base font-medium text-white disabled:opacity-50"
          style={{ background: 'var(--primary)', minHeight: '44px' }}
        >
          {loading ? 'Masuk...' : 'Masuk'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
        Belum punya akun?{' '}
        <a href="/daftar" className="font-medium" style={{ color: 'var(--primary)' }}>Daftar</a>
      </p>
    </div>
  )
}
