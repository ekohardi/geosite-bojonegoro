'use client'

import { useEffect, useState, useRef } from 'react'
import {
  ArrowLeft,
  Compass,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Download,
  CheckCircle2,
  Leaf,
  Waves,
  Landmark,
  X,
  MessageCircle,
  ExternalLink,
} from 'lucide-react'

const AUDIO_SRC = '/audio/narasi_kedunglantung.mp3'
const POSTER_SRC = '/hubungkait-kedunglantung.jpg'

const WA_PHONE = '6281234567890'
const WA_TEXT = encodeURIComponent('Halo Admin Geopark Bojonegoro, saya ingin informasi mengenai Hubungkait Geosite Kedung Lantung.')
const waUrl = `https://wa.me/${WA_PHONE}?text=${WA_TEXT}`

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

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function HubungkaitPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomScale, setZoomScale] = useState(1)
  const [activeTab, setActiveTab] = useState<'all' | 'ekonomi' | 'hayati' | 'konservasi'>('all')

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration || 0)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    // Attempt gentle autoplay on user arrival (if allowed by browser)
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked by browser policy; user can click to play
        setIsPlaying(false)
      })
    }

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.pause()
    }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((err) => {
        console.error('Playback error:', err)
      })
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  return (
    <main className="hubungkait-page">
      {/* Top Header Bar */}
      <header className="hubungkait-header-bar">
        <div className="page-width hubungkait-header-inner">
          <a className="brand" href="/" aria-label="Kembali ke Beranda">
            <span className="brand-mark" aria-hidden="true"><Compass size={20} /></span>
            <span>
              <b>Geopark</b>
              <small>Kedung Lantung</small>
            </span>
          </a>

          <div className="hubungkait-header-nav">
            <a href="/" className="hubungkait-nav-link">Beranda</a>
            <a href="/hubungkait-ekonomi" className="hubungkait-nav-link">Hubung Kait Ekonomi</a>
            <a href="/biodiversitas" className="hubungkait-nav-link">Biodiversitas</a>
            <a href="/buku-tamu" className="hubungkait-nav-link">Buku Tamu</a>
            <a href="/" className="hubungkait-back-btn">
              <ArrowLeft size={16} />
              <span>Kembali</span>
            </a>
          </div>
        </div>
      </header>

      {/* Floating Sticky Audio Player Bar */}
      <div className={`hubungkait-player-bar ${isPlaying ? 'playing' : ''}`}>
        <div className="page-width player-bar-inner">
          <div className="player-meta-group">
            <button
              type="button"
              className="player-play-btn"
              onClick={toggleAudio}
              aria-label={isPlaying ? 'Jeda Audio Narasi' : 'Putar Audio Narasi'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <div className="player-track-info">
              <div className="track-title-row">
                <span className="track-badge">VOICE OVER RESMI</span>
                <strong className="track-title">Audio Hubungan Geologi & Keanekaragaman Hayati</strong>
                {isPlaying && (
                  <span className="audio-wave-anim small" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                )}
              </div>
              <span className="track-subtitle">
                Dengarkan narasi ini sambil mengamati detail poster infografis di bawah.
              </span>
            </div>
          </div>

          <div className="player-controls-group">
            <span className="player-time-text">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="player-progress-slider"
              aria-label="Progres pemutaran audio"
            />
            <span className="player-time-text player-time-total">{formatTime(duration)}</span>

            <button
              type="button"
              onClick={handleRestart}
              className="player-icon-btn"
              title="Putar Ulang dari Awal"
              aria-label="Putar ulang audio"
            >
              <RotateCcw size={16} />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="player-icon-btn"
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
              aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-width hubungkait-content-wrapper">
        {/* Hero Introduction */}
        <section className="hubungkait-hero-intro">
          <div className="hubungkait-badge-pill">
            <span className="badge-dot" />
            <span>Infografis Edukasi & Suara Narasi · Geosite G-05</span>
          </div>

          <h1 className="hubungkait-title">
            Hubungan Geologi dan Keanekaragaman Hayati <br />
            <em>di Ekosistem Kedung Lantung</em>
          </h1>

          <p className="hubungkait-desc">
            Bagaimana fenomena geologi rembesan minyak alami (*lantung*) di dasar sungai membentuk habitat spesifik bagi
            keanekaragaman hayati (plankton, nekton, bentos), keterkaitan trofik dengan burung Cekakak Jawa, hingga kearifan
            tradisional lampu teplok (ublik) dan aksi bersama menjaga kelestarian sungai? Simak infografis edukatif berikut bersama audio narasi resmi sahabat Kedung Lantung.
          </p>

          <div className="hubungkait-quick-actions">
            <button
              type="button"
              onClick={toggleAudio}
              className="primary-action-btn"
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              <span>{isPlaying ? 'Jeda Audio Narasi' : 'Dengarkan Sambil Melihat Gambar'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsZoomOpen(true)
                setZoomScale(1)
              }}
              className="secondary-action-btn"
            >
              <Maximize2 size={16} />
              <span>Buka Gambar Ukuran Penuh</span>
            </button>

            <a
              href={POSTER_SRC}
              download="Hubungan_Geologi_dan_Keanekaragaman_Hayati_Kedung_Lantung.jpg"
              className="secondary-action-btn"
              title="Unduh file poster"
            >
              <Download size={16} />
              <span>Unduh Poster</span>
            </a>
          </div>
        </section>

        {/* Poster Viewer Stage */}
        <section className="hubungkait-poster-section">
          <div className="poster-card-container">
            <div className="poster-top-bar">
              <div className="poster-top-title">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Hubungan Geologi dan Keanekaragaman Hayati di Ekosistem Kedung Lantung</span>
              </div>
              <div className="poster-top-actions">
                <button
                  type="button"
                  onClick={() => {
                    setIsZoomOpen(true)
                    setZoomScale(1)
                  }}
                  className="poster-zoom-btn"
                  title="Perbesar gambar"
                >
                  <Maximize2 size={14} />
                  <span>Perbesar / Zoom</span>
                </button>
              </div>
            </div>

            {/* Poster Image with Overlay Click to Play/Zoom */}
            <div
              className="poster-image-stage"
              onClick={() => {
                if (!isPlaying) toggleAudio()
              }}
            >
              <img
                src={POSTER_SRC}
                alt="Hubungan Geologi dan Keanekaragaman Hayati di Ekosistem Kedung Lantung"
                className="poster-img"
              />

              {/* Floating Playing Status Indicator */}
              <div className="poster-audio-float-chip">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleAudio()
                  }}
                  className="float-chip-btn"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isPlaying ? 'Audio Narasi Sedang Diputar' : 'Klik untuk Putar Audio'}</span>
                  {isPlaying && (
                    <span className="audio-wave-anim small" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="poster-caption-bar">
              <p>
                💡 <b>Petunjuk:</b> Klik gambar untuk memutar audio narasi atau klik tombol <b>Perbesar / Zoom</b> di atas untuk membaca seluruh detail ilustrasi tokoh, satwa, dan produk olahan.
              </p>
            </div>
          </div>
        </section>

        {/* Structured Breakdown Section */}
        <section className="hubungkait-breakdown-section">
          <div className="breakdown-header">
            <div>
              <p className="eyebrow">Rangkuman Materi Poster</p>
              <h2>Pilar Penting <em>Hubungkait Geosite</em></h2>
            </div>
            <div className="breakdown-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                Semua Materi
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'ekonomi' ? 'active' : ''}`}
                onClick={() => setActiveTab('ekonomi')}
              >
                Ekonomi & Budaya
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'hayati' ? 'active' : ''}`}
                onClick={() => setActiveTab('hayati')}
              >
                Geologi & Hayati
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'konservasi' ? 'active' : ''}`}
                onClick={() => setActiveTab('konservasi')}
              >
                Aksi Jaga Sungai
              </button>
            </div>
          </div>

          <div className="breakdown-grid">
            {/* CARD 1: Ekonomi Lokal */}
            {(activeTab === 'all' || activeTab === 'ekonomi') && (
              <article className="breakdown-card card-ekonomi">
                <div className="card-badge-header">
                  <span className="card-cat-badge">
                    <Landmark size={14} /> Pilar Ekonomi
                  </span>
                  <span className="card-tokoh-tag">Mbah Lan & Warga</span>
                </div>
                <h3>Pemanfaatan Sungai & Geoproduk Desa Drenges</h3>
                <p>
                  Air yang mengalir melewati bebatuan Kedung Lantung dimanfaatkan oleh masyarakat untuk
                  mengairi ladang pertanian jagung dan singkong. Dari hasil tani tersebut lahir geoproduk unggulan:
                </p>
                <div className="geoproduk-items">
                  <div className="geoproduk-chip">
                    <strong>🌽 Marning Drenges</strong>
                    <span>Camilan gurih olahan jagung lokal bermutu tinggi</span>
                  </div>
                  <div className="geoproduk-chip">
                    <strong>🥔 Balung Kuwuk</strong>
                    <span>Keripik renyah olahan singkong khas pedesaan</span>
                  </div>
                </div>
              </article>
            )}

            {/* CARD 2: Budaya & Kearifan Lokal */}
            {(activeTab === 'all' || activeTab === 'ekonomi') && (
              <article className="breakdown-card card-budaya">
                <div className="card-badge-header">
                  <span className="card-cat-badge">
                    <Leaf size={14} /> Kearifan Budaya
                  </span>
                  <span className="card-tokoh-tag">Warisan Leluhur</span>
                </div>
                <h3>Tradisi & Harmoni Bersama Alam</h3>
                <p>
                  Kedung Lantung menyimpan kekayaan tradisi yang diwariskan turun-temurun antargenerasi:
                </p>
                <ul className="tradisi-list">
                  <li>
                    <b>Lampu Teplok (Ublik):</b> Minyak mentah rembesan (*lantung*) dimanfaatkan warga sebagai bahan bakar lampu teplok sebelum listrik menjangkau desa.
                  </li>
                  <li>
                    <b>Jamur Barat:</b> Tumbuh melimpah di bawah serasah daun jati setiap awal musim hujan dan diburu warga sebagai santapan lezat.
                  </li>
                  <li>
                    <b>Enthung Jati:</b> Sumber pangan protein tradisional yang hidup di kanopi daun jati.
                  </li>
                  <li>
                    <b>Daun Jati Alami:</b> Wadah pembungkus makanan ramah lingkungan yang memberikan aroma khas.
                  </li>
                </ul>
              </article>
            )}

            {/* CARD 3: Geologi & Biota Sungai */}
            {(activeTab === 'all' || activeTab === 'hayati') && (
              <article className="breakdown-card card-hayati">
                <div className="card-badge-header">
                  <span className="card-cat-badge">
                    <Waves size={14} /> Geologi & Hayati
                  </span>
                  <span className="card-tokoh-tag">Mbak Tungga (Sains)</span>
                </div>
                <h3>Sungai Unik dengan Rembesan Minyak Alami</h3>
                <p>
                  Keluarnya minyak alami dari celah batuan ribuan tahun lalu membentuk habitat khusus
                  yang menopang organisme perairan sungai:
                </p>
                <div className="biota-grid">
                  <div className="biota-item">
                    <strong>Burung Cekakak Jawa</strong>
                    <span>Burung riparian pemakan ikan & udang, indikator kesehatan ekosistem sungai</span>
                  </div>
                  <div className="biota-item">
                    <strong>Plankton Mikroskopis</strong>
                    <span>Oscillatoria, Anabaena, Euglena, Cyclotella penjaga keseimbangan ekosistem</span>
                  </div>
                  <div className="biota-item">
                    <strong>Nekton (Berenang Bebas)</strong>
                    <span>Udang Galah & Ikan Wader (Rasbora sp.) penjaga rantai makanan</span>
                  </div>
                  <div className="biota-item">
                    <strong>Bentos (Dasar Sungai)</strong>
                    <span>Bekicot & Siput Air Tawar pengurai sedimen dan pendaur ulang nutrien</span>
                  </div>
                </div>
              </article>
            )}

            {/* CARD 4: Konservasi & Sungai */}
            {(activeTab === 'all' || activeTab === 'konservasi') && (
              <article className="breakdown-card card-sungai">
                <div className="card-badge-header">
                  <span className="card-cat-badge">
                    <Sparkles size={14} /> Edukasi Konservasi
                  </span>
                  <span className="card-tokoh-tag">Dek Keke & Kak Kidung</span>
                </div>
                <h3>5 Aksi Nyata: “Yuk Jaga Sungai Kita!”</h3>
                <p>
                  Agar keindahan Kedung Lantung tetap lestari dan airnya terus memberi kehidupan:
                </p>
                <div className="action-checklist">
                  <div className="check-item">
                    <CheckCircle2 size={16} />
                    <span><b>Jangan buang sampah ke sungai:</b> Jaga kemurnian aliran air dari limbah plastik.</span>
                  </div>
                  <div className="check-item">
                    <CheckCircle2 size={16} />
                    <span><b>Lindungi tumbuhan tepi sungai:</b> Cegah erosi dan rawat pohon riparian.</span>
                  </div>
                  <div className="check-item">
                    <CheckCircle2 size={16} />
                    <span><b>Hemat air, jangan boros:</b> Rawat debit air alami untuk generasi penerus.</span>
                  </div>
                  <div className="check-item">
                    <CheckCircle2 size={16} />
                    <span><b>Jangan merusak habitat biota:</b> Hindari penangkapan ikan dengan racun/setrum.</span>
                  </div>
                  <div className="check-item">
                    <CheckCircle2 size={16} />
                    <span><b>Bersama merawat kelestarian:</b> Ajak keluarga dan teman bertualang secara bertanggung jawab.</span>
                  </div>
                </div>
              </article>
            )}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="hubungkait-cta-box">
          <div className="cta-box-text">
            <h3>Ingin Berkunjung Langsung ke Kedung Lantung?</h3>
            <p>
              Catat rencana kedatangan Anda di buku tamu resmi atau hubungi admin WhatsApp untuk informasi jalur dan pemandu lapangan.
            </p>
          </div>
          <div className="cta-box-buttons">
            <a href="/buku-tamu" className="primary-cta-btn">
              Catat di Buku Tamu
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-cta-btn"
            >
              <WhatsAppIcon size={16} />
              <span>Tanya Admin WA</span>
            </a>
          </div>
        </section>
      </div>

      {/* Lightbox Zoom Modal for High-Resolution Poster Viewing */}
      {isZoomOpen && (
        <div
          className="poster-zoom-modal-backdrop"
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="poster-zoom-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="zoom-modal-top-bar">
              <div className="zoom-modal-info">
                <strong>Hubungan Geologi dan Keanekaragaman Hayati di Ekosistem Kedung Lantung</strong>
                <span>Skala: {Math.round(zoomScale * 100)}%</span>
              </div>
              <div className="zoom-modal-controls">
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(prev + 0.25, 2.5))}
                  className="modal-ctrl-btn"
                  title="Perbesar"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(prev - 0.25, 0.75))}
                  className="modal-ctrl-btn"
                  title="Perkecil"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  className="modal-ctrl-btn"
                  title="Reset Ukuran Normal"
                >
                  <RotateCcw size={16} />
                </button>
                <a
                  href={POSTER_SRC}
                  download="Hubungan_Geologi_dan_Keanekaragaman_Hayati_Kedung_Lantung.jpg"
                  className="modal-ctrl-btn"
                  title="Unduh Gambar"
                >
                  <Download size={18} />
                </a>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="modal-close-btn"
                  title="Tutup Modal (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="zoom-modal-scrollable">
              <img
                src={POSTER_SRC}
                alt="Hubungan Geologi dan Keanekaragaman Hayati di Ekosistem Kedung Lantung (Ukuran Penuh)"
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.2s ease-out',
                }}
                className="zoom-modal-img"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="hubungkait-footer">
        <div className="page-width hubungkait-footer-inner">
          <div className="footer-brand">
            <span className="brand-mark"><Compass size={18} /></span>
            <span><b>Geopark</b> Bojonegoro · Kedung Lantung G-05</span>
          </div>
          <div className="footer-links">
            <a href="/">Beranda</a>
            <a href="/hubungkait-ekonomi">Hubung Kait Ekonomi</a>
            <a href="/biodiversitas">Biodiversitas</a>
            <a href="/#lokasi">Peta Lokasi</a>
            <a href="https://www.google.com/maps/place/Wisata+Air+Kedunglantung/@-7.3543218,111.9820539,19.68z/data=!4m14!1m7!3m6!1s0x2e782fdd7fefb283:0x13a6eb104b5b8f9d!2sKedung+Lantung!8m2!3d-7.354203!4d111.9828018!16s%2Fg%2F11jb83q_dy!3m5!1s0x2e782e5c81f187ff:0x89626e76beac4ded!8m2!3d-7.3546584!4d111.9819883!16s%2Fg%2F11g69g7qfv?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
              📍 Google Maps
            </a>
            <a href="/buku-tamu">Buku Tamu Digital</a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={14} /> WhatsApp Admin
            </a>
          </div>
          <p className="footer-copy">
            © 2026 Geopark Kedung Lantung, Bojonegoro. Kolaborasi Pelestarian Budaya, Ekonomi & Geodiversitas.
          </p>
        </div>
      </footer>

      {/* Hidden audio element for the narration */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />
    </main>
  )
}
