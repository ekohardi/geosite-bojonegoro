'use client'

import { FormEvent, useEffect, useState } from 'react'
import { ArrowLeft, BookOpen, CalendarDays, Compass, LogOut, MessageSquare, RefreshCw, ShieldCheck, Users } from 'lucide-react'

type Entry = {
  id: string | number
  name: string
  institution: string
  visit_date: string
  purpose: string
  message?: string | null
  created_at?: string
}

export default function GuestbookResultsPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loadEntries = async () => {
    const response = await fetch('/api/admin/guestbook', { cache: 'no-store' })
    if (!response.ok) {
      setAuthenticated(false)
      return
    }
    const data = await response.json()
    setEntries(data.entries ?? [])
    setAuthenticated(true)
  }

  useEffect(() => {
    loadEntries().catch(() => setAuthenticated(false))
  }, [])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const response = await fetch('/api/admin/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) {
      setError('Username atau password salah. Silakan coba lagi.')
      setLoading(false)
      return
    }
    setPassword('')
    await loadEntries()
    setLoading(false)
  }

  async function handleLogout() {
    await fetch('/api/admin/guestbook', { method: 'DELETE' })
    setAuthenticated(false)
    setEntries([])
  }

  if (authenticated === null) return <main className="admin-page admin-loading">Memuat halaman admin...</main>

  if (!authenticated) {
    return (
      <main className="admin-page">
        <div className="admin-orb admin-orb-one" />
        <div className="admin-orb admin-orb-two" />
        <a className="admin-back-link" href="/buku-tamu"><ArrowLeft size={16} /> Kembali ke Buku Tamu</a>
        <section className="admin-login-card" aria-labelledby="admin-login-title">
          <div className="admin-login-icon"><ShieldCheck size={26} /></div>
          <span className="admin-eyebrow">Area pengelola</span>
          <h1 id="admin-login-title">Hasil Buku Tamu</h1>
          <p className="admin-login-copy">Masuk untuk melihat dan meninjau data kunjungan Geosite Kedung Lantung.</p>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label htmlFor="admin-username">Username</label>
            <input id="admin-username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
            {error && <p className="admin-login-error" role="alert">{error}</p>}
            <button className="admin-login-button" type="submit" disabled={loading}>{loading ? 'Memverifikasi...' : 'Masuk ke Hasil Buku Tamu'}</button>
          </form>
          <p className="admin-security-note"><ShieldCheck size={14} /> Akses ini khusus untuk pengelola.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-results-page">
      <header className="admin-results-header">
        <a className="brand admin-brand" href="/"><span className="brand-mark"><Compass size={20} /></span><span><b>Geopark</b><small>Kedung Lantung</small></span></a>
        <div className="admin-header-actions"><a className="admin-back-link" href="/buku-tamu"><ArrowLeft size={16} /> Buku Tamu</a><button className="admin-logout-button" onClick={handleLogout}><LogOut size={15} /> Keluar</button></div>
      </header>
      <div className="admin-results-wrap">
        <div className="admin-results-intro"><div><span className="admin-eyebrow">Panel pengelola</span><h1>Rekap Buku Tamu</h1><p>Data kunjungan yang masuk ke Geosite Kedung Lantung.</p></div><button className="admin-refresh-button" onClick={loadEntries}><RefreshCw size={16} /> Perbarui</button></div>
        <div className="admin-stat-row"><div className="admin-stat-card"><Users size={18} /><span>Total kunjungan</span><strong>{entries.length}</strong></div><div className="admin-stat-card"><CalendarDays size={18} /><span>Data terbaru</span><strong>{entries[0]?.visit_date ? new Date(entries[0].visit_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '—'}</strong></div><div className="admin-stat-card"><BookOpen size={18} /><span>Status</span><strong>Aktif</strong></div></div>
        <section className="admin-table-card" aria-labelledby="entries-title"><div className="admin-table-heading"><div><h2 id="entries-title">Daftar pengunjung</h2><p>{entries.length} catatan tersimpan</p></div></div>{entries.length === 0 ? <div className="admin-empty-state"><BookOpen size={28} /><strong>Belum ada data kunjungan</strong><span>Data baru akan muncul setelah pengunjung mengisi buku tamu.</span></div> : <div className="admin-table-scroll"><table><thead><tr><th>Pengunjung</th><th>Tanggal</th><th>Tujuan</th><th>Pesan</th></tr></thead><tbody>{entries.map((entry) => <tr key={entry.id}><td><strong>{entry.name}</strong><span>{entry.institution}</span></td><td>{entry.visit_date ? new Date(entry.visit_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</td><td><span className="admin-purpose"><Compass size={14} /> {entry.purpose}</span></td><td>{entry.message ? <span className="admin-message"><MessageSquare size={14} /> {entry.message}</span> : <span className="admin-muted">Tidak ada pesan</span>}</td></tr>)}</tbody></table></div>}</section>
      </div>
    </main>
  )
}
