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
  Landmark,
  X,
  Users,
  ExternalLink,
  Waves,
} from 'lucide-react'

const AUDIO_SRC = encodeURI('/audio/narasi kait kedunglantung budaya lokal.mp3')
const POSTER_SRC = '/hubungkait-ekonomi.jpg'

const WA_PHONE = '6285234506751'
const WA_TEXT = encodeURIComponent('Halo Pokdarwis Geosite Kedung Lantung Geopark Bojonegoro, saya ingin informasi mengenai Hubungkait Ekonomi dan Budaya Lokal Kedung Lantung.')
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

export default function HubungkaitEkonomiPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomScale, setZoomScale] = useState(1)
  const [activeTab, setActiveTab] = useState<'all' | 'ekonomi' | 'budaya' | 'tokoh'>('all')

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
              <b>Geosite</b>
              <small>Kedung Lantung</small>
            </span>
          </a>

          <div className="hubungkait-header-nav">
            <a href="/" className="hubungkait-nav-link">Beranda</a>
            <a href="/hubungkait" className="hubungkait-nav-link" title="Hubungan Geologi & Hayati">
              Geologi & Hayati
            </a>
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
                <span className="track-badge">VOICE OVER BUDAYA LOKAL</span>
                <strong className="track-title">Audio Hubungkait Ekonomi & Budaya Lokal</strong>
                {isPlaying && (
                  <span className="audio-wave-anim" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                )}
              </div>
              <p className="track-subtitle">
                Narasi resmi penjelajah sahabat Geopark Bojonegoro (Mbah Lan, Kidung, Keke & Tungga)
              </p>
            </div>
          </div>

          {/* Player Controls & Scrubber */}
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
            <span>Infografis Edukasi & Audio Narasi · Geosite Kedung Lantung G-05</span>
          </div>

          <h1 className="hubungkait-title">
            Hubungkait Kedung Lantung <br />
            <em>dengan Ekonomi dan Budaya Lokal</em>
          </h1>

          <p className="hubungkait-desc">
            Bagaimana rembesan minyak bumi alami (*lantung*) yang mengalir di dasar sungai sejak ribuan tahun lalu
            menjadi sumber penghidupan dan kearifan warga? Simak perpaduan suburnya pertanian jagung dan singkong
            penghasil geoproduk unggulan Desa Drenges, tradisi lampu teplok (*ublik*), berburu jamur barat dan enthung jati,
            hingga kebiasaan membungkus makanan dengan daun jati alami.
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
              download="Hubungkait_Kedunglantung_dengan_Ekonomi_dan_Budaya_Lokal.jpg"
              className="secondary-action-btn"
              title="Unduh file poster resolusi tinggi"
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
                <span>Hubungkait Kedunglantung dengan Ekonomi dan Budaya Lokal</span>
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
                alt="Hubungkait Kedunglantung dengan Ekonomi dan Budaya Lokal"
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
                💡 <b>Petunjuk Interaktif:</b> Klik poster untuk memutar audio narasi resmi sahabat Kedung Lantung, atau klik <b>Perbesar / Zoom</b> di kanan atas untuk membaca tiap detail balon percakapan Mbah Lan, Kidung, dan Keke secara jelas.
              </p>
            </div>
          </div>
        </section>

        {/* Structured Breakdown Section */}
        <section className="hubungkait-breakdown-section">
          <div className="breakdown-header">
            <div>
              <p className="eyebrow">Rangkuman Materi Poster</p>
              <h2>Pilar Penting <em>Ekonomi & Budaya Kedung Lantung</em></h2>
            </div>
            <div className="breakdown-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                Semua Pilar
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'ekonomi' ? 'active' : ''}`}
                onClick={() => setActiveTab('ekonomi')}
              >
                Pilar Ekonomi (Geoproduk)
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'budaya' ? 'active' : ''}`}
                onClick={() => setActiveTab('budaya')}
              >
                Pilar Budaya (4 Tradisi)
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'tokoh' ? 'active' : ''}`}
                onClick={() => setActiveTab('tokoh')}
              >
                Kisah & Dialog Tokoh
              </button>
            </div>
          </div>

          <div className="breakdown-grid">
            {/* CARD 1: Pilar Ekonomi */}
            {(activeTab === 'all' || activeTab === 'ekonomi') && (
              <article className="breakdown-card card-ekonomi">
                <div className="card-badge-header">
                  <span className="card-cat-badge">
                    <Landmark size={14} /> Pilar Ekonomi
                  </span>
                  <span className="card-tokoh-tag">Irigasi & Geoproduk</span>
                </div>
                <h3>Pemanfaatan Air Sungai & Geoproduk Khas Desa Drenges</h3>
                <p>
                  Air dari aliran Sungai Kedunglantung dimanfaatkan oleh masyarakat untuk mengairi ladang pertanian.
                  Hasil panen bumi yang melimpah ini diolah secara kreatif menjadi geoproduk khas bernilai jual tinggi:
                </p>
                <div className="geoproduk-items">
                  <div className="geoproduk-chip">
                    <strong>🌽 Jagung & Marning Drenges</strong>
                    <span>Ladang jagung subur diolah menjadi Marning Drenges, camilan gurih renyah bernilai ekonomi khas warga.</span>
                  </div>
                  <div className="geoproduk-chip">
                    <strong>🥔 Singkong & Balung Kuwuk</strong>
                    <span>Panen singkong melimpah diproduksi menjadi Balung Kuwuk, keripik renyah tradisional yang diminati wisatawan.</span>
                  </div>
                </div>
              </article>
            )}

            {/* CARD 2: Pilar Budaya */}
            {(activeTab === 'all' || activeTab === 'budaya') && (
              <article className="breakdown-card card-budaya">
                <div className="card-badge-header">
                  <span className="card-cat-badge">
                    <Leaf size={14} /> Pilar Budaya
                  </span>
                  <span className="card-tokoh-tag">Kearifan Turun-Temurun</span>
                </div>
                <h3>4 Kekayaan Budaya yang Diwariskan Antargenerasi</h3>
                <p>
                  Kedunglantung dan bentang hutan di sekitarnya menyimpan kearifan lokal yang hidup berdampingan secara harmonis dengan alam:
                </p>
                <ul className="tradisi-list">
                  <li>
                    <b>🍄 Jamur Barat:</b> Setiap awal musim hujan, masyarakat berlomba mencari jamur barat yang tumbuh melimpah di bawah serasah daun jati.
                  </li>
                  <li>
                    <b>🐛 Enthung Jati:</b> Kepompong ulat jati yang hidup di daun pohon jati dipanen sebagai sumber pangan berprotein tinggi khas daerah.
                  </li>
                  <li>
                    <b>🪔 Lampu Teplok (Ublik):</b> Minyak mentah (*lantung*) dari rembesan alami disuling sederhana dan digunakan sebagai bahan bakar penerangan sebelum jaringan listrik masuk desa.
                  </li>
                  <li>
                    <b>🍃 Daun Jati Alami:</b> Daun pohon jati dimanfaatkan warga sebagai pembungkus makanan alami yang aman, ramah lingkungan, serta memberikan aroma sedap khas.
                  </li>
                </ul>
              </article>
            )}

            {/* CARD 3: Dialog Tokoh & Cerita Sejarah */}
            {(activeTab === 'all' || activeTab === 'tokoh') && (
              <article className="breakdown-card card-hayati">
                <div className="card-badge-header">
                  <span className="card-cat-badge">
                    <Users size={14} /> Dialog Interaktif
                  </span>
                  <span className="card-tokoh-tag">Mbah Lan, Kidung & Keke</span>
                </div>
                <h3>Kisah Rembesan Minyak Alami dari Sudut Pandang Tetua</h3>
                <p>
                  Melalui interaksi hangat antara tetua desa dan generasi muda, nilai geologi bertransformasi menjadi pelajaran hidup:
                </p>
                <div className="biota-grid">
                  <div className="biota-item">
                    <strong>Mbah Lan (Tetua Desa)</strong>
                    <span>"Rembesan minyak alami di Kedunglantung sudah ada sejak ribuan tahun lalu, dan menjadi bagian dari kehidupan masyarakat di sini."</span>
                  </div>
                  <div className="biota-item">
                    <strong>Kak Kidung (Anak Petualang)</strong>
                    <span>"Mbah Lan, bagaimana minyak alami di sini dimanfaatkan masyarakat untuk mata pencaharian? Apakah bisa membantu ekonomi warga?"</span>
                  </div>
                  <div className="biota-item">
                    <strong>Dek Keke (Anak Pengamat Sains)</strong>
                    <span>"Wah, menarik sekali! Apakah ada tradisi atau kegiatan budaya masyarakat yang berhubungan dengan Kedunglantung?"</span>
                  </div>
                </div>
              </article>
            )}

            {/* CARD 4: Kesimpulan Filosofis */}
            {(activeTab === 'all' || activeTab === 'ekonomi' || activeTab === 'budaya') && (
              <article className="breakdown-card card-sungai">
                <div className="card-badge-header">
                  <span className="card-cat-badge">
                    <Sparkles size={14} /> Kesimpulan Penting
                  </span>
                  <span className="card-tokoh-tag">Harmoni Tiga Pilar</span>
                </div>
                <h3>Harmoni Geodiversitas, Ekonomi & Budaya</h3>
                <p>
                  Pesona Kedung Lantung bukan sekadar batuan dan genangan air, melainkan simfoni kehidupan:
                </p>
                <div className="action-checklist">
                  <div className="check-item">
                    <CheckCircle2 size={16} />
                    <span><b>Kekayaan Alam:</b> Rembesan minyak alami merupakan bukti geologi istimewa warisan masa lampau bumi Bojonegoro.</span>
                  </div>
                  <div className="check-item">
                    <CheckCircle2 size={16} />
                    <span><b>Dukungan Ekonomi:</b> Air sungai mengalirkan kesuburan tanah bagi pertanian dan produksi olahan pangan masyarakat.</span>
                  </div>
                  <div className="check-item">
                    <CheckCircle2 size={16} />
                    <span><b>Kelestarian Budaya:</b> Tradisi lokal mengajarkan rasa syukur dan pemanfaatan sumber daya secara bijak tanpa mengeksploitasi alam.</span>
                  </div>
                </div>
              </article>
            )}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="hubungkait-cta-box">
          <div className="cta-box-text">
            <h3>Jelajahi Laman Edukasi Geopark Lainnya</h3>
            <p>
              Pelajari juga hubungan geologi dan keanekaragaman hayati ekosistem sungai atau catat kehadiran Anda di buku tamu resmi Geopark Bojonegoro.
            </p>
          </div>
          <div className="cta-box-buttons">
            <a href="/hubungkait" className="primary-cta-btn">
              Lihat Poster Hayati & Geologi
            </a>
            <a href="/buku-tamu" className="secondary-action-btn">
              Buku Tamu Kunjungan
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
                <strong>Hubungkait Kedunglantung dengan Ekonomi dan Budaya Lokal</strong>
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
                  download="Hubungkait_Kedunglantung_dengan_Ekonomi_dan_Budaya_Lokal.jpg"
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
                alt="Hubungkait Kedunglantung dengan Ekonomi dan Budaya Lokal (Ukuran Penuh)"
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
            <span><b>Geopark</b> Bojonegoro · Geosite Kedung Lantung</span>
          </div>
          <div className="footer-links">
            <a href="/">Beranda</a>
            <a href="/hubungkait">Geologi & Hayati</a>
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
            © 2026 Geosite Kedung Lantung, Bojonegoro. Kolaborasi Pelestarian Budaya, Ekonomi & Geodiversitas.
          </p>
        </div>
      </footer>

      {/* Hidden audio element for the narration */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />
    </main>
  )
}
