'use client'

import { useEffect, useState, useRef } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Camera,
  ChevronDown,
  Compass,
  ExternalLink,
  Headphones,
  Landmark,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Pause,
  Play,
  Sparkles,
  Users,
  Volume2,
  X,
} from 'lucide-react'

const heroImage = 'https://i.ibb.co.com/sdd1R1Ym/20250919-100259-IMG-3387.jpg'
const detailImage = 'https://i.ibb.co.com/gMjPxRwL/20250919-100259-IMG-3387-Copy.jpg'
const NARRATION_AUDIO_SRC = '/audio/narasi_kedunglantung.mp3'

const WA_PHONE = '6281234567890'
const WA_TEXT = encodeURIComponent('Halo Admin Geopark Bojonegoro, saya ingin informasi fast response mengenai Geosite Kedung Lantung.')
const waUrl = `https://wa.me/${WA_PHONE}?text=${WA_TEXT}`

interface MascotItem {
  id: string
  emoji: string
  name: string
  alias: string
  title: string
  categoryLabel: string
  greeting: string
  image: string
  stageClass: string
  animClass: string
  desc: string
  takeaway: string
  traits: string[]
  voiceText: string
}

const mascotList: MascotItem[] = [
  {
    id: 'ruslan',
    emoji: '👴',
    name: 'Mbah Lan',
    alias: 'RUSLAN',
    title: 'Tetua Desa',
    categoryLabel: 'Tetua Desa',
    greeting: '“Halo, Nak! Aku Mbah Lan.”',
    image: '/tokoh/mbah-lan.png',
    stageClass: 'ruslan-stage',
    animClass: 'anim-ruslan',
    desc: 'Mbah Lan adalah sosok yang paling memahami sejarah, budaya, dan kearifan lokal Kedung Lantung. Bersama Mbah Lan, kita bisa mendengarkan cerita tentang bagaimana kawasan ini dikenal dan dimanfaatkan oleh masyarakat, mengenal tradisi setempat, serta memahami hubungan masyarakat dengan lingkungan di sekitarnya.',
    takeaway: 'Kalau ingin tahu cerita masa lalu Kedung Lantung, ikuti Mbah Lan!',
    traits: ['Sejarah & Budaya', 'Kearifan Lokal', 'Tradisi Masyarakat'],
    voiceText: 'Halo, Nak! Aku Mbah Lan. Mbah Lan paling memahami sejarah, budaya, dan kearifan lokal Kedung Lantung. Kalau ingin tahu cerita masa lalu Kedung Lantung, ikuti Mbah Lan ya!',
  },
  {
    id: 'tungga',
    emoji: '🔬',
    name: 'Mbak Tungga',
    alias: 'TUNGGA',
    title: 'Scientist (Ilmuwan)',
    categoryLabel: 'Scientist (Ilmuwan)',
    greeting: '“Hai! Aku Mbak Tungga. Yuk, kita cari tahu rahasia alam Kedung Lantung!”',
    image: '/tokoh/mbak-tungga.png',
    stageClass: 'tungga-stage',
    animClass: 'anim-tungga',
    desc: 'Mbak Tungga adalah sosok cerdas yang senang berbagi ilmu pengetahuan, terutama tentang keterkaitan antara geologi, biologi, dan budaya. Bersama Mbak Tungga, kita diajak melihat bahwa alam tidak berdiri sendiri. Bentuk dan proses geologi dapat memengaruhi lingkungan, lingkungan menjadi rumah bagi berbagai makhluk hidup, dan semuanya kemudian berhubungan dengan kehidupan serta budaya masyarakat.',
    takeaway: 'Kalau ingin tahu “mengapa” sesuatu bisa terjadi di alam, tanyakan kepada Mbak Tungga!',
    traits: ['Geologi & Biologi', 'Rahasia Alam', 'Sains Lingkungan'],
    voiceText: 'Hai! Aku Mbak Tungga. Yuk, kita cari tahu rahasia alam Kedung Lantung! Kalau ingin tahu mengapa sesuatu bisa terjadi di alam, tanyakan kepada Mbak Tungga!',
  },
  {
    id: 'kidung',
    emoji: '🧒',
    name: 'Kak Kidung',
    alias: 'KIDUNG',
    title: 'Si Paling Penasaran',
    categoryLabel: 'Si Paling Penasaran',
    greeting: '“Aku Kak Kidung! Ada apa di sana? Kenapa bisa begitu? Yuk, kita cari tahu!”',
    image: '/tokoh/kak-kidung.jpg',
    stageClass: 'kidung-stage',
    animClass: 'anim-kidung',
    desc: 'Kak Kidung adalah sosok yang selalu ingin tahu, menyukai tantangan dan hal-hal baru. Kak Kidung mengajak kita untuk tidak hanya melihat, tetapi juga mengamati, bertanya, mencoba, dan menemukan. Setiap sudut Kedung Lantung bisa menjadi sebuah petualangan baru.',
    takeaway: 'Jadi, jangan takut bertanya. Rasa penasaran adalah awal dari sebuah penemuan!',
    traits: ['Eksplorasi & Petualang', 'Tantangan Baru', 'Rasa Ingin Tahu'],
    voiceText: 'Aku Kak Kidung! Ada apa di sana? Kenapa bisa begitu? Yuk, kita cari tahu! Jadi, jangan takut bertanya. Rasa penasaran adalah awal dari sebuah penemuan!',
  },
  {
    id: 'keke',
    emoji: '👧',
    name: 'Dek Keke',
    alias: 'KEKE',
    title: 'Si Paling Ceria',
    categoryLabel: 'Si Paling Ceria',
    greeting: '“Hai teman-teman! Ayo jalan-jalan dan bertualang bersama!”',
    image: '/tokoh/dik-keke.png',
    stageClass: 'keke-stage',
    animClass: 'anim-keke',
    desc: 'Dek Keke adalah sosok yang penuh semangat, suka berteman, dan suka berpetualang. Bersama Dek Keke, menjelajah Kedung Lantung menjadi kegiatan yang menyenangkan. Kita bisa menikmati alam, bermain sambil belajar, bertemu teman baru, dan menemukan berbagai hal menarik di sepanjang perjalanan.',
    takeaway: 'Karena belajar tidak harus selalu duduk di dalam kelas. Alam juga bisa menjadi tempat belajar yang seru!',
    traits: ['Penuh Semangat', 'Bermain & Belajar', 'Teman Baru'],
    voiceText: 'Hai teman-teman! Ayo jalan-jalan dan bertualang bersama! Karena belajar tidak harus selalu duduk di dalam kelas. Alam juga bisa menjadi tempat belajar yang seru!',
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

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speakingMascotId, setSpeakingMascotId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.nav-dropdown-wrapper')) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('click', handleClickOutside)

    const audio = audioRef.current
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    if (audio) {
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      if (audio) {
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
        audio.pause()
      }
    }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        setSpeakingMascotId(null)
      }
      audio.play().catch((err) => {
        console.error('Gagal memutar audio narasi:', err)
      })
    }
  }

  const speakMascot = (id: string, text: string) => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (speakingMascotId === id) {
        window.speechSynthesis.cancel()
        setSpeakingMascotId(null)
      } else {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'id-ID'
        utterance.rate = 0.95
        utterance.onend = () => setSpeakingMascotId(null)
        utterance.onerror = () => setSpeakingMascotId(null)
        window.speechSynthesis.speak(utterance)
        setSpeakingMascotId(id)
      }
    }
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#beranda" aria-label="Geopark Kedung Lantung">
          <span className="brand-mark" aria-hidden="true"><Compass size={22} /></span>
          <span><b>Geopark</b><small>Kedung Lantung</small></span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => {
            setMenuOpen(!menuOpen)
            setOpenDropdown(null)
          }}
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Navigasi utama">
          <a
            href="#beranda"
            onClick={() => {
              setMenuOpen(false)
              setOpenDropdown(null)
            }}
          >
            Beranda
          </a>

          {/* DROPDOWN 1: Jelajah Geosite */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              className={`nav-dropdown-trigger ${openDropdown === 'geosite' ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setOpenDropdown(openDropdown === 'geosite' ? null : 'geosite')
              }}
              aria-expanded={openDropdown === 'geosite'}
              aria-haspopup="true"
            >
              <span>Jelajah Geosite</span>
              <ChevronDown size={14} />
            </button>
            <div className={`nav-dropdown-menu ${openDropdown === 'geosite' ? 'show' : ''}`}>
              <a
                href="#tentang"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <Compass size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">Tentang Geosite</strong>
                  <span className="nav-dropdown-item-desc">Kisah bentang alam & sejarah bumi</span>
                </span>
              </a>

              <a
                href="#nilai"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <MapPin size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">Warisan Geologi</strong>
                  <span className="nav-dropdown-item-desc">Keanekaragaman geologi kode G-05</span>
                </span>
              </a>

              <a
                href="#tokoh"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <Users size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">Pengenalan Tokoh</strong>
                  <span className="nav-dropdown-item-desc">Kenalan dengan 4 sahabat geosite</span>
                </span>
              </a>

              <a
                href="/hubungkait-ekonomi"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <Landmark size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">
                    Hubung Kait Ekonomi
                    <span className="nav-item-badge">Poster & Audio</span>
                  </strong>
                  <span className="nav-dropdown-item-desc">Pertanian, geoproduk & budaya lokal</span>
                </span>
              </a>

              <a
                href="/hubungkait"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <Sparkles size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">
                    Hubungkait Geologi & Hayati
                    <span className="nav-item-badge">Poster & Audio</span>
                  </strong>
                  <span className="nav-dropdown-item-desc">Rembesan minyak alami & biota sungai</span>
                </span>
              </a>

              <a
                href="/biodiversitas"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <Microscope size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">
                    Biodiversitas Kedung Lantung
                    <span className="nav-item-badge">Kajian</span>
                  </strong>
                  <span className="nav-dropdown-item-desc">Struktur komunitas nekton, bentos & plankton</span>
                </span>
              </a>

              <a
                href="#galeri"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <Camera size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">Galeri Lapangan</strong>
                  <span className="nav-dropdown-item-desc">Dokumentasi suasana & batuan</span>
                </span>
              </a>
            </div>
          </div>

          {/* DROPDOWN 2: Layanan Kunjungan */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              className={`nav-dropdown-trigger ${openDropdown === 'layanan' ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setOpenDropdown(openDropdown === 'layanan' ? null : 'layanan')
              }}
              aria-expanded={openDropdown === 'layanan'}
              aria-haspopup="true"
            >
              <span>Layanan Tamu</span>
              <ChevronDown size={14} />
            </button>
            <div className={`nav-dropdown-menu ${openDropdown === 'layanan' ? 'show' : ''}`}>
              <a
                href="/buku-tamu"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <BookOpen size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">
                    Buku Tamu Digital
                    <span className="nav-item-badge">Online</span>
                  </strong>
                  <span className="nav-dropdown-item-desc">Catat kehadiran & masukan Anda</span>
                </span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  setOpenDropdown(null)
                }}
              >
                <span className="nav-dropdown-item-icon">
                  <MessageCircle size={16} />
                </span>
                <span className="nav-dropdown-item-text">
                  <strong className="nav-dropdown-item-title">
                    WhatsApp Fast Response
                    <ExternalLink size={12} style={{ opacity: 0.6 }} />
                  </strong>
                  <span className="nav-dropdown-item-desc">Konsultasi cepat admin geosite</span>
                </span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-nav-button"
            onClick={() => {
              setMenuOpen(false)
              setOpenDropdown(null)
            }}
            title="Chat WhatsApp Fast Response"
          >
            <WhatsAppIcon size={14} />
            <span>WA Fast Response</span>
          </a>

          <button
            className={`audio-button ${isPlaying ? 'playing' : ''}`}
            onClick={toggleAudio}
            title={isPlaying ? 'Jeda narasi audio' : 'Putar narasi audio Kedung Lantung'}
          >
            <span className="audio-icon">{isPlaying ? <Pause size={15} /> : <Play size={15} />}</span>
            {isPlaying ? 'Jeda narasi' : 'Dengarkan narasi'}
          </button>
        </nav>
      </header>

      <section id="beranda" className="hero-section">
        <img className="hero-image" src={heroImage} alt="Panorama Kedung Lantung di Bojonegoro" />
        <div className="hero-overlay" />
        <div className="hero-content page-width">
          <p className="eyebrow light"><span /> BOJONEGORO · JAWA TIMUR</p>
          <h1>Kedung<br /><em>Lantung</em></h1>
          <p className="hero-lede">Jejak air, batu, dan waktu yang membentuk kisah bumi di tepian hutan Bojonegoro.</p>
          <a href="#tentang" className="round-link" aria-label="Jelajahi Kedung Lantung"><ArrowDown size={22} /></a>
        </div>
        <div className="hero-caption">GEO-SITE <b>G-05</b></div>
      </section>

      <section id="tentang" className="intro-section page-width">
        <div className="section-kicker"><span>01</span><i /></div>
        <div className="intro-grid">
          <div><p className="eyebrow">Tentang geosite</p><h2>Tempat bumi<br /><em>bercerita.</em></h2></div>
          <div className="intro-copy"><p>Kedung Lantung adalah salah satu warisan geologi penting di Geopark Bojonegoro. Air yang mengalir melewati batuan selama ribuan tahun menciptakan lanskap alami yang tenang, teduh, dan penuh karakter.</p><p>Di sini, pengunjung dapat membaca kembali perjalanan bumi melalui bentang alam, aliran sungai, dan lapisan batuan yang menjadi saksi perubahan zaman.</p><a className="text-link" href="#nilai">Kenali lebih jauh <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section id="nilai" className="feature-section">
        <div className="page-width feature-grid">
          <div className="feature-copy"><p className="eyebrow">Warisan geologi</p><h2>Lebih dari<br /><em>sekadar tempat.</em></h2><p className="muted">Kedung Lantung menyimpan nilai ilmiah, pendidikan, dan pariwisata. Setiap lekuk batu dan aliran air membentuk ruang belajar yang hidup.</p><div className="stat-row"><div><strong>G-05</strong><span>Kode geosite</span></div><div><strong>Geo-<br />diversitas</strong><span>Jenis warisan</span></div></div></div>
          <div className="feature-visual"><img src={detailImage} alt="Detail aliran air dan bebatuan Kedung Lantung" /><div className="image-note"><MapPin size={16} /> Kedung Lantung, Bojonegoro</div></div>
        </div>
      </section>

      <section id="tokoh" className="tokoh-section page-width">
        <div className="section-kicker"><span>02</span><i /></div>
        <div className="tokoh-header">
          <div className="tokoh-header-text">
            <p className="eyebrow">Pengenalan tokoh</p>
            <h2>Kenalan dengan<br /><em>Teman-Teman Kita.</em></h2>
            <p className="tokoh-header-intro">
              Agar perjalanan semakin menyenangkan, kita akan ditemani oleh empat sahabat dengan karakter dan keahlian yang berbeda.
            </p>
          </div>
        </div>

        <div className="tokoh-grid-mascots">
          {mascotList.map((m) => (
            <article
              key={m.id}
              className={`tokoh-mascot-card ${speakingMascotId === m.id ? 'speaking' : ''}`}
            >
              <span className="tokoh-tag-float">{m.emoji} {m.categoryLabel}</span>
              <div className={`tokoh-stage ${m.stageClass}`}>
                <div className="tokoh-stage-aura" />
                <img
                  src={m.image}
                  alt={`${m.name} — ${m.title}`}
                  className={`tokoh-mascot-img ${m.animClass}`}
                  loading="lazy"
                />
              </div>
              <div className="tokoh-info-pane">
                <div className="tokoh-title-bar">
                  <h3 className="tokoh-char-name">{m.name}</h3>
                  <span className="tokoh-char-alias">{m.alias}</span>
                </div>
                <p className="tokoh-char-role">{m.emoji} {m.title}</p>
                <div className="tokoh-greeting-bubble">
                  {m.greeting}
                </div>
                <p className="tokoh-char-desc">{m.desc}</p>
                <div className="tokoh-takeaway-box">
                  <p>✨ {m.takeaway}</p>
                </div>
                <div className="tokoh-trait-chips">
                  {m.traits.map((trait) => (
                    <span key={trait} className="tokoh-trait-chip">
                      {trait}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    className={`tokoh-voice-btn ${speakingMascotId === m.id ? 'active' : ''}`}
                    onClick={() => speakMascot(m.id, m.voiceText)}
                    aria-label={`Dengarkan sapaan ${m.name}`}
                  >
                    {speakingMascotId === m.id ? <Pause size={13} /> : <Volume2 size={13} />}
                    <span>{speakingMascotId === m.id ? 'Hentikan Suara' : `Dengar Sapaan ${m.name}`}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="galeri" className="gallery-section page-width">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">Momen di lapangan</p>
            <h2>Rasakan <em>suasananya.</em></h2>
          </div>
          <span>Geser untuk menjelajah</span>
        </div>
        <div className="gallery-grid">
          <img src={heroImage} alt="Pemandangan Kedung Lantung" />
          <div className={`gallery-card ${isPlaying ? 'playing' : ''}`}>
            <div className="gallery-card-top">
              <Volume2 size={24} />
              {isPlaying && (
                <span className="audio-wave-anim" aria-label="Audio sedang diputar">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </div>
            <p>Dengarkan Narasi Kisah Kedung Lantung.</p>
            <button
              type="button"
              className="gallery-audio-btn"
              onClick={toggleAudio}
              aria-label={isPlaying ? 'Jeda narasi audio' : 'Putar audio narasi'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              <span>{isPlaying ? 'Jeda Narasi' : 'Putar Audio Narasi'}</span>
            </button>
            <small>AUDIO RESMI · MP3</small>
          </div>
          <img src={detailImage} alt="Bebatuan di Kedung Lantung" />
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <div className="brand footer-brand">
            <span className="brand-mark"><Compass size={22} /></span>
            <span><b>Geopark</b><small>Kedung Lantung</small></span>
          </div>
          <p>Menjaga warisan bumi,<br />merawat cerita untuk generasi.</p>
          <div className="footer-meta">
            <a href="/hubungkait-ekonomi" className="footer-guestbook-link" title="Hubung Kait Ekonomi dan Budaya Lokal">
              🌾 Hubung Kait Ekonomi
            </a>
            <a href="/hubungkait" className="footer-guestbook-link" title="Hubungkait Geologi & Keanekaragaman Hayati">
              🖼️ Geologi & Hayati
            </a>
            <a href="/biodiversitas" className="footer-guestbook-link" title="Kajian Biodiversitas Kedung Lantung">
              🔬 Biodiversitas Kedung Lantung
            </a>
            <a href="/buku-tamu" className="footer-guestbook-link" title="Isi Buku Tamu Kunjungan">
              ✍️ Buku Tamu Kunjungan
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="footer-wa-link" title="Chat WhatsApp Fast Response">
              <WhatsAppIcon size={14} /> WA Fast Response
            </a>
            <span>© 2026</span>
            <span>BOJONEGORO, INDONESIA</span>
          </div>
        </div>
      </footer>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa"
        aria-label="Hubungi WhatsApp Fast Response"
        title="WA Fast Response"
      >
        <WhatsAppIcon size={24} />
        <span className="floating-wa-badge" aria-hidden="true" />
      </a>

      <button
        className={`floating-audio ${isPlaying ? 'playing' : ''}`}
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Jeda narasi' : 'Putar narasi audio'}
        title={isPlaying ? 'Jeda narasi audio' : 'Dengarkan narasi audio Kedung Lantung'}
      >
        {isPlaying ? <Pause size={18} /> : <Headphones size={18} />}
      </button>

      {/* Audio element for official narration mp3 */}
      <audio ref={audioRef} src={NARRATION_AUDIO_SRC} preload="metadata" />
    </main>
  )
}
