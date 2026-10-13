'use client'

import { useState } from 'react'
import { ArrowLeft, Compass } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase/client'

const informationSources = ['Teman', 'Media sosial', 'Website', 'Lainnya']

export default function BukuTamuPage() {
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  async function submitGuestbook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setStatus('')
    const form = new FormData(event.currentTarget)
    const sources = form.getAll('information_source').map(String)
    const { error } = await (getSupabaseClient().from('guestbook_entries') as any).insert({
      name: String(form.get('name') ?? '').trim(),
      institution: String(form.get('institution') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim() || null,
      visit_date: String(form.get('visit_date') ?? ''),
      purpose: String(form.get('purpose') ?? '').trim(),
      home_address: String(form.get('home_address') ?? '').trim() || null,
      information_source: sources.join(', ') || null,
      feedback: String(form.get('feedback') ?? '').trim() || null,
      message: String(form.get('message') ?? '').trim() || null,
    })
    setIsSaving(false)
    if (error) {
      setStatus('Buku tamu belum dapat disimpan. Silakan periksa kembali isian Anda.')
      return
    }
    event.currentTarget.reset()
    setStatus('Terima kasih. Kehadiran Anda sudah tercatat di buku tamu.')
  }

  return (
    <main className="guestbook-page">
      <header className="guestbook-page-header page-width">
        <a className="brand" href="/" aria-label="Kembali ke halaman utama"><span className="brand-mark" aria-hidden="true"><Compass size={22} /></span><span><b>Geopark</b><small>Kedung Lantung</small></span></a>
        <a className="back-link" href="/"><ArrowLeft size={16} /> Kembali ke beranda</a>
      </header>
      <section className="guestbook-section guestbook-page-section">
        <div className="page-width guestbook-grid">
          <div className="guestbook-copy"><p className="eyebrow">Buku tamu kunjungan</p><h1>Catat<br /><em>kehadiran Anda.</em></h1><p>Terima kasih telah berkunjung ke Geosite Kedung Lantung. Silakan isi formulir berikut agar kunjungan Anda tersimpan dalam database buku tamu kami.</p></div>
          <form className="guestbook-form" onSubmit={submitGuestbook}>
            <div className="guestbook-fields">
              <div className="guestbook-field"><label htmlFor="guest-name">Nama lengkap</label><input id="guest-name" name="name" required minLength={2} maxLength={120} autoComplete="name" /></div>
              <div className="guestbook-field"><label htmlFor="guest-institution">Asal instansi/komunitas</label><input id="guest-institution" name="institution" required minLength={2} maxLength={160} /></div>
              <div className="guestbook-field"><label htmlFor="guest-phone">Nomor telepon (opsional)</label><input id="guest-phone" name="phone" maxLength={40} type="tel" autoComplete="tel" /></div>
              <div className="guestbook-field"><label htmlFor="guest-date">Tanggal kunjungan</label><input id="guest-date" name="visit_date" required type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></div>
            </div>
            <div className="guestbook-field"><label htmlFor="guest-address">Alamat rumah</label><textarea id="guest-address" name="home_address" maxLength={240} placeholder="Kota/kabupaten tempat tinggal" /></div>
            <div className="guestbook-field"><label htmlFor="guest-purpose">Tujuan kunjungan</label><input id="guest-purpose" name="purpose" required minLength={2} maxLength={160} placeholder="Contoh: wisata edukasi" /></div>
            <fieldset className="guestbook-field guestbook-checkboxes"><legend>Mendapatkan informasi terkait Kedung Lantung dari</legend><div className="checkbox-options">{informationSources.map((source) => <label key={source} className="checkbox-option"><input type="checkbox" name="information_source" value={source} /><span>{source}</span></label>)}</div></fieldset>
            <div className="guestbook-field"><label htmlFor="guest-feedback">Kritik dan saran (opsional)</label><textarea id="guest-feedback" name="feedback" maxLength={1000} placeholder="Bagikan masukan Anda untuk pengembangan Kedung Lantung" /></div>
            <div className="guestbook-field"><label htmlFor="guest-message">Pesan dan kesan (opsional)</label><textarea id="guest-message" name="message" maxLength={1000} /></div>
            <button className="guestbook-submit" type="submit" disabled={isSaving}>{isSaving ? 'Menyimpan...' : 'Simpan ke buku tamu'}</button>
            {status && <p className={`guestbook-status ${status.startsWith('Buku') ? 'error' : ''}`} role="status">{status}</p>}
          </form>
        </div>
      </section>
    </main>
  )
}
