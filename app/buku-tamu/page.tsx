'use client'

import { useState, useRef } from 'react'
import {
  ArrowLeft,
  Compass,
  User,
  Building2,
  Phone,
  Calendar,
  MapPin,
  Sparkles,
  MessageSquareHeart,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Share2,
  Users,
  Globe,
  Loader2,
  HeartHandshake,
  Check,
  RotateCcw,
} from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase/client'

const WA_PHONE = '6281234567890'
const WA_TEXT = encodeURIComponent('Halo Admin Geopark Bojonegoro, saya ingin informasi mengenai kunjungan di Geosite Kedung Lantung.')
const waUrl = `https://wa.me/${WA_PHONE}?text=${WA_TEXT}`

interface InfoSourceOption {
  id: string
  label: string
  desc: string
  icon: typeof Users
}

const informationSources: InfoSourceOption[] = [
  {
    id: 'Teman',
    label: 'Teman & Keluarga',
    desc: 'Rekomendasi kerabat atau rekan komunitas',
    icon: Users,
  },
  {
    id: 'Media sosial',
    label: 'Media Sosial',
    desc: 'Instagram, TikTok, YouTube, atau Facebook',
    icon: Share2,
  },
  {
    id: 'Website',
    label: 'Website & Internet',
    desc: 'Pencarian Google atau portal pariwisata',
    icon: Globe,
  },
  {
    id: 'Lainnya',
    label: 'Rekomendasi Lainnya',
    desc: 'Brosur, kegiatan sekolah, atau dinas',
    icon: Sparkles,
  },
]

function WhatsAppIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.13 7.03C8.96 7.03 8.78 7.04 8.62 7.29C8.42 7.58 7.85 8.12 7.85 9.21C7.85 10.3 8.65 11.35 8.76 11.5C8.87 11.65 10.33 13.9 12.57 14.87C14.43 15.67 14.81 15.51 15.22 15.47C15.63 15.43 16.55 14.92 16.74 14.39C16.93 13.86 16.93 13.41 16.87 13.31C16.81 13.21 16.66 13.15 16.44 13.04C16.22 12.93 15.13 12.39 14.93 12.32C14.73 12.25 14.58 12.21 14.43 12.43C14.28 12.65 13.85 13.15 13.72 13.3C13.59 13.45 13.46 13.47 13.24 13.36C13.02 13.25 12.31 13.01 11.47 12.27C10.82 11.69 10.38 10.97 10.25 10.75C10.12 10.53 10.24 10.41 10.35 10.3C10.45 10.2 10.57 10.04 10.68 9.91C10.79 9.78 10.83 9.69 10.9 9.54C10.97 9.39 10.93 9.26 10.88 9.15C10.83 9.04 10.38 7.94 10.19 7.48C10.01 7.03 9.82 7.09 9.68 7.08C9.55 7.07 9.4 7.03 9.13 7.03Z" />
    </svg>
  )
}

export default function BukuTamuPage() {
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]
    )
  }

  const handleResetForm = () => {
    formRef.current?.reset()
    setSelectedSources([])
    setStatusMessage(null)
    setStatusType(null)
  }

  async function submitGuestbook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setStatusMessage(null)
    setStatusType(null)

    const form = new FormData(event.currentTarget)
    const sources = selectedSources.length > 0
      ? selectedSources
      : form.getAll('information_source').map(String)

    try {
      const client = getSupabaseClient()
      if (!client) {
        throw new Error('Koneksi basis data Supabase belum terkonfigurasi. Pastikan variabel lingkungan sudah diatur.')
      }

      const payload = {
        name: String(form.get('name') ?? '').trim(),
        institution: String(form.get('institution') ?? '').trim(),
        phone: String(form.get('phone') ?? '').trim() || null,
        visit_date: String(form.get('visit_date') ?? ''),
        purpose: String(form.get('purpose') ?? '').trim(),
        home_address: String(form.get('home_address') ?? '').trim() || null,
        information_source: sources.join(', ') || null,
        feedback: String(form.get('feedback') ?? '').trim() || null,
        message: String(form.get('message') ?? '').trim() || null,
      }

      const { error } = await (client.from('guestbook_entries') as any).insert(payload)

      if (error) {
        throw error
      }

      setStatusType('success')
      setStatusMessage('Terima kasih banyak! Kehadiran dan masukan Anda telah berhasil tersimpan dalam buku tamu Geosite Kedung Lantung.')
      formRef.current?.reset()
      setSelectedSources([])
    } catch (err: any) {
      console.error('Error submitting guestbook:', err)
      setStatusType('error')
      setStatusMessage(
        err?.message || 'Buku tamu belum dapat disimpan. Silakan periksa kembali isian Anda atau coba sesaat lagi.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const todayDate = new Date().toISOString().slice(0, 10)

  return (
    <main className="guestbook-page">
      {/* Top Floating / Sticky Header */}
      <header className="guestbook-header-bar">
        <div className="page-width guestbook-header-inner">
          <a className="brand" href="/" aria-label="Kembali ke halaman utama Geopark Kedung Lantung">
            <span className="brand-mark" aria-hidden="true"><Compass size={20} /></span>
            <span>
              <b>Geopark</b>
              <small>Kedung Lantung</small>
            </span>
          </a>
          <div className="guestbook-header-actions">
            <a href="/" className="guestbook-back-button">
              <ArrowLeft size={16} />
              <span>Kembali ke Beranda</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="page-width guestbook-layout">
        {/* Left Column: Hero Overview & Welcome Context */}
        <aside className="guestbook-hero-col">
          <div className="guestbook-hero-card">
            <div className="guestbook-badge-pill">
              <span className="badge-dot" />
              <span>Buku Tamu Resmi · Geosite G-05</span>
            </div>

            <h1 className="guestbook-title">
              Catat Jejak <br />
              <em>Kunjungan Anda.</em>
            </h1>

            <p className="guestbook-subtitle">
              Selamat datang di Geosite Kedung Lantung, Bojonegoro. Partisipasi Anda dalam mengisi
              buku tamu ini sangat berharga untuk mendukung konservasi warisan geologi dan peningkatan fasilitas kunjungan.
            </p>

            <div className="guestbook-value-list">
              <div className="guestbook-value-item">
                <div className="value-icon-box value-icon-green">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <strong>Pencatatan Resmi</strong>
                  <span>Data pengunjung terverifikasi untuk evaluasi kawasan wisata</span>
                </div>
              </div>

              <div className="guestbook-value-item">
                <div className="value-icon-box value-icon-yellow">
                  <Compass size={18} />
                </div>
                <div>
                  <strong>Pelestarian Geodiversitas</strong>
                  <span>Mendukung perlindungan bentang batuan dan ekosistem sungai</span>
                </div>
              </div>

              <div className="guestbook-value-item">
                <div className="value-icon-box value-icon-coral">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <strong>Apresiasi & Komunitas</strong>
                  <span>Masukan Anda langsung menjadi pedoman pengembangan ke depan</span>
                </div>
              </div>
            </div>

            {/* Mascot Friendly Greeting Callout */}
            <div className="guestbook-mascot-callout">
              <div className="mascot-callout-avatar">
                <img
                  src="/tokoh/dik-keke.png"
                  alt="Dek Keke"
                  className="mascot-callout-img"
                />
              </div>
              <div className="mascot-callout-text">
                <div className="mascot-callout-name">
                  <span>Dek Keke</span>
                  <small>Si Paling Ceria</small>
                </div>
                <p>
                  “Halo teman-teman! Terima kasih sudah mampir ke Kedung Lantung. Yuk isi buku tamu ini
                  supaya kita bisa terus bertualang bareng!”
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Assistance */}
            <div className="guestbook-wa-callout">
              <div className="wa-callout-header">
                <WhatsAppIcon size={18} />
                <span>Butuh Bantuan Langsung?</span>
              </div>
              <p>
                Jika ada pertanyaan mengenai rombongan, pemandu geosite, atau informasi lokasi, hubungi admin kami.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="guestbook-wa-btn"
                title="Hubungi Admin WhatsApp"
              >
                <WhatsAppIcon size={16} />
                <span>Chat Admin WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Column: Modern Form Card */}
        <section className="guestbook-form-col">
          <div className="guestbook-card">
            <div className="guestbook-card-header">
              <div className="header-text-group">
                <h2 className="guestbook-card-title">Formulir Kehadiran</h2>
                <p className="guestbook-card-desc">
                  Isi data di bawah ini dengan lengkap dan benar. Tanda (<span className="required-star">*</span>) wajib diisi.
                </p>
              </div>
              <span className="card-badge">Form Online</span>
            </div>

            {/* Status Alert Notification */}
            {statusMessage && (
              <div
                className={`guestbook-alert-banner ${
                  statusType === 'success' ? 'alert-success' : 'alert-error'
                }`}
                role="status"
              >
                <div className="alert-icon-wrap">
                  {statusType === 'success' ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <AlertCircle size={24} />
                  )}
                </div>
                <div className="alert-content">
                  <h4>{statusType === 'success' ? 'Data Berhasil Dicatat!' : 'Terjadi Kendala'}</h4>
                  <p>{statusMessage}</p>
                  {statusType === 'success' && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="alert-action-btn"
                    >
                      <RotateCcw size={14} />
                      <span>Isi Formulir untuk Pengunjung Lain</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            <form
              ref={formRef}
              className="guestbook-styled-form"
              onSubmit={submitGuestbook}
            >
              {/* SECTION 1: Identitas Pengunjung */}
              <div className="form-section-card">
                <div className="form-section-header">
                  <div className="section-icon-badge">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="section-title">1. Data Identitas Pengunjung</h3>
                    <p className="section-subtitle">Identitas diri pribadi atau perwakilan rombongan</p>
                  </div>
                </div>

                <div className="form-fields-grid">
                  {/* Nama Lengkap */}
                  <div className="form-input-group">
                    <label htmlFor="guest-name" className="field-label">
                      Nama Lengkap <span className="required-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="input-leading-icon" aria-hidden="true">
                        <User size={16} />
                      </span>
                      <input
                        id="guest-name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Contoh: Budi Santoso"
                        className="styled-input"
                      />
                    </div>
                  </div>

                  {/* Asal Instansi/Komunitas */}
                  <div className="form-input-group">
                    <label htmlFor="guest-institution" className="field-label">
                      Asal Instansi / Komunitas / Sekolah <span className="required-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="input-leading-icon" aria-hidden="true">
                        <Building2 size={16} />
                      </span>
                      <input
                        id="guest-institution"
                        name="institution"
                        type="text"
                        required
                        minLength={2}
                        maxLength={160}
                        placeholder="Contoh: SMAN 1 Bojonegoro / Umum"
                        className="styled-input"
                      />
                    </div>
                  </div>

                  {/* Nomor Telepon */}
                  <div className="form-input-group">
                    <label htmlFor="guest-phone" className="field-label">
                      Nomor WhatsApp / HP <span className="optional-tag">(Opsional)</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="input-leading-icon" aria-hidden="true">
                        <Phone size={16} />
                      </span>
                      <input
                        id="guest-phone"
                        name="phone"
                        type="tel"
                        maxLength={40}
                        autoComplete="tel"
                        placeholder="Contoh: 081234567890"
                        className="styled-input"
                      />
                    </div>
                  </div>

                  {/* Tanggal Kunjungan */}
                  <div className="form-input-group">
                    <label htmlFor="guest-date" className="field-label">
                      Tanggal Kunjungan <span className="required-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="input-leading-icon" aria-hidden="true">
                        <Calendar size={16} />
                      </span>
                      <input
                        id="guest-date"
                        name="visit_date"
                        type="date"
                        required
                        defaultValue={todayDate}
                        className="styled-input date-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Alamat Domisili */}
                <div className="form-input-group full-width">
                  <label htmlFor="guest-address" className="field-label">
                    Alamat Domisili / Kota Asal <span className="optional-tag">(Opsional)</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-leading-icon" aria-hidden="true">
                      <MapPin size={16} />
                    </span>
                    <input
                      id="guest-address"
                      name="home_address"
                      type="text"
                      maxLength={240}
                      placeholder="Contoh: Dander, Kab. Bojonegoro / Surabaya"
                      className="styled-input"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Tujuan & Sumber Informasi */}
              <div className="form-section-card">
                <div className="form-section-header">
                  <div className="section-icon-badge">
                    <Compass size={18} />
                  </div>
                  <div>
                    <h3 className="section-title">2. Detail Kunjungan</h3>
                    <p className="section-subtitle">Tujuan berkunjung dan bagaimana Anda mengetahui tempat ini</p>
                  </div>
                </div>

                <div className="form-input-group full-width">
                  <label htmlFor="guest-purpose" className="field-label">
                    Tujuan Kunjungan <span className="required-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-leading-icon" aria-hidden="true">
                      <Compass size={16} />
                    </span>
                    <input
                      id="guest-purpose"
                      name="purpose"
                      type="text"
                      required
                      minLength={2}
                      maxLength={160}
                      placeholder="Contoh: Wisata Edukasi Geologi / Liburan Keluarga / Penelitian"
                      className="styled-input"
                    />
                  </div>
                </div>

                {/* Multi-Select Information Source Pills */}
                <div className="form-input-group full-width">
                  <label className="field-label">
                    Dari mana Anda mengetahui Geosite Kedung Lantung?
                    <span className="sublabel-hint"> (Bisa pilih lebih dari satu)</span>
                  </label>
                  <div className="source-options-grid">
                    {informationSources.map((source) => {
                      const isChecked = selectedSources.includes(source.id)
                      const IconComp = source.icon
                      return (
                        <label
                          key={source.id}
                          className={`source-chip-card ${isChecked ? 'active' : ''}`}
                        >
                          <input
                            type="checkbox"
                            name="information_source"
                            value={source.id}
                            checked={isChecked}
                            onChange={() => toggleSource(source.id)}
                            className="sr-only-input"
                          />
                          <div className="source-chip-checkbox">
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <div className="source-chip-icon">
                            <IconComp size={16} />
                          </div>
                          <div className="source-chip-content">
                            <strong className="source-chip-title">{source.label}</strong>
                            <span className="source-chip-desc">{source.desc}</span>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Ulasan & Saran */}
              <div className="form-section-card">
                <div className="form-section-header">
                  <div className="section-icon-badge">
                    <MessageSquareHeart size={18} />
                  </div>
                  <div>
                    <h3 className="section-title">3. Pesan & Ulasan Pengunjung</h3>
                    <p className="section-subtitle">Bagikan kesan dan saran untuk penyempurnaan fasilitas wisata</p>
                  </div>
                </div>

                {/* Pesan dan Kesan */}
                <div className="form-input-group full-width">
                  <label htmlFor="guest-message" className="field-label">
                    Pesan dan Kesan Kunjungan <span className="optional-tag">(Opsional)</span>
                  </label>
                  <textarea
                    id="guest-message"
                    name="message"
                    maxLength={1000}
                    rows={3}
                    placeholder="Ceritakan pengalaman Anda saat menjelajahi lanskap batuan dan alam Kedung Lantung..."
                    className="styled-textarea"
                  />
                </div>

                {/* Kritik & Saran */}
                <div className="form-input-group full-width">
                  <label htmlFor="guest-feedback" className="field-label">
                    Kritik & Saran Pengembangan <span className="optional-tag">(Opsional)</span>
                  </label>
                  <textarea
                    id="guest-feedback"
                    name="feedback"
                    maxLength={1000}
                    rows={3}
                    placeholder="Masukan terkait fasilitas, papan informasi, kebersihan, atau petunjuk akses jalan..."
                    className="styled-textarea"
                  />
                </div>
              </div>

              {/* Form Actions Footer */}
              <div className="form-actions-wrapper">
                <div className="form-privacy-note">
                  <ShieldCheck size={16} />
                  <span>
                    Data kunjungan tersimpan dengan aman untuk kepentingan statistik dan pengembangan Geosite Bojonegoro.
                  </span>
                </div>

                <div className="form-buttons-row">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    disabled={isSaving}
                    className="reset-form-button"
                  >
                    Bersihkan
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="submit-form-button"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={18} className="spinner-icon" />
                        <span>Menyimpan ke Buku Tamu...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Simpan ke Buku Tamu</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Guestbook Page Footer */}
      <footer className="guestbook-site-footer">
        <div className="page-width guestbook-footer-inner">
          <div className="footer-brand-wrap">
            <span className="brand-mark"><Compass size={18} /></span>
            <span><b>Geopark</b> Bojonegoro · Kedung Lantung</span>
          </div>
          <div className="footer-links-wrap">
            <a href="/" className="footer-link">Beranda</a>
            <a href="/#tentang" className="footer-link">Tentang Geosite</a>
            <a href="/#tokoh" className="footer-link">Pengenalan Tokoh</a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="footer-wa-link">
              <WhatsAppIcon size={14} /> WhatsApp Admin
            </a>
          </div>
          <p className="footer-copyright">
            © 2026 Geopark Kedung Lantung, Bojonegoro. Seluruh Hak Dilindungi.
          </p>
        </div>
      </footer>
    </main>
  )
}
