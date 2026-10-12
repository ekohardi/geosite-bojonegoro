'use client'

import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Compass,
  GraduationCap,
  Headphones,
  Landmark,
  MapPin,
  Menu,
  Pause,
  Play,
  Quote,
  Sparkles,
  Users,
  Volume2,
  X,
} from 'lucide-react'

const heroImage = 'https://i.ibb.co.com/sdd1R1Ym/20250919-100259-IMG-3387.jpg'
const detailImage = 'https://i.ibb.co.com/gMjPxRwL/20250919-100259-IMG-3387-Copy.jpg'

const WA_PHONE = '6281234567890'
const WA_TEXT = encodeURIComponent('Halo Admin Geopark Bojonegoro, saya ingin informasi fast response mengenai Geosite Kedung Lantung.')
const waUrl = `https://wa.me/${WA_PHONE}?text=${WA_TEXT}`

interface TokohItem {
  id: string
  name: string
  role: string
  category: 'kultural' | 'pokdarwis' | 'akademisi'
  categoryLabel: string
  desc: string
  highlight: string
  icon: 'sparkles' | 'book' | 'users' | 'grad' | 'landmark' | 'quote'
}

const tokohList: TokohItem[] = [
  {
    id: 'mbah-rahmat',
    name: 'Mbah Rahmat',
    role: 'Sesepuh & Tokoh Spiritual Dusun Nglantung',
    category: 'kultural',
    categoryLabel: 'Kultural & Tradisi',
    desc: 'Figur sentral yang sangat dihormati di Desa Drenges. Jejak makam dan petuah beliau menjadi jangkar kultural yang melengkapi keunikan ilmiah Kedung Lantung sebagai cultuursite.',
    highlight: 'Menjaga harmoni spiritual antara masyarakat dan bentang alam hutan Kedung Lantung.',
    icon: 'sparkles',
  },
  {
    id: 'subianto',
    name: 'Subianto',
    role: 'Kepala Dusun Nglantung & Penutur Tradisi',
    category: 'kultural',
    categoryLabel: 'Kultural & Tradisi',
    desc: 'Penjaga memori kolektif yang menuturkan sejarah kearifan lokal pemanfaatan rembesan minyak purba (lantung) menggunakan bulu ayam untuk penerangan dan obat tradisional.',
    highlight: 'Mewariskan cerita tutur kearifan geologi lintas generasi di tepian Sungai Borik.',
    icon: 'book',
  },
  {
    id: 'rico-thomas',
    name: 'Rico Thomas',
    role: 'Koordinator Pokdarwis Kedung Lantung',
    category: 'pokdarwis',
    categoryLabel: 'Pokdarwis & Penggerak',
    desc: 'Ujung tombak pemandu lapangan (guiding & storytelling) yang aktif menyusun site plan pengembangan kawasan geosite saat evaluasi lapangan asesor UNESCO.',
    highlight: 'Menggerakkan pemuda desa menjadi duta geowisata profesional dan tangguh.',
    icon: 'users',
  },
  {
    id: 'dr-laily',
    name: 'Dr. Laily Agustina R., S.Si., M.Sc.',
    role: 'Tenaga Ahli Tim Geopark Bojonegoro (LPPM Unigoro)',
    category: 'akademisi',
    categoryLabel: 'Akademisi & Peneliti',
    desc: 'Akademisi yang memimpin riset ilmiah biodiversitas dan pendampingan teknis masyarakat guna memenuhi pilar konservasi dan edukasi UNESCO Global Geopark.',
    highlight: 'Menghubungkan sains kebumian dengan pemberdayaan nyata masyarakat lokal.',
    icon: 'grad',
  },
  {
    id: 'yaspingi',
    name: 'Yaspingi',
    role: 'Kepala Desa Drenges, Sugihwaras',
    category: 'pokdarwis',
    categoryLabel: 'Pamong Desa',
    desc: 'Pemimpin desa yang mengawal regulasi pelindungan kawasan Kedung Lantung sebagai Cagar Alam Geologi serta mendorong geliat produk UMKM warga desa.',
    highlight: 'Mengokohkan sinergi regulasi desa demi kelestarian cagar geologi berkelanjutan.',
    icon: 'landmark',
  },
  {
    id: 'andre',
    name: 'Muhammad Andre',
    role: 'Ketua Komunitas Bojonegoro History',
    category: 'akademisi',
    categoryLabel: 'Pegiat Sejarah & Riset',
    desc: 'Pegiat literasi sejarah yang menelusuri arsip kolonial 1858-1860 dan memfasilitasi sarasehan budaya untuk mengungkap kronik minyak bumi tertua di Bojonegoro.',
    highlight: 'Menghidupkan arsip sejarah geologi agar mudah dipahami generasi muda.',
    icon: 'quote',
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [tokohCategory, setTokohCategory] = useState<'all' | 'kultural' | 'pokdarwis' | 'akademisi'>('all')

  const filteredTokoh = tokohCategory === 'all' ? tokohList : tokohList.filter((item) => item.category === tokohCategory)

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const toggleAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
      } else {
        window.speechSynthesis.cancel()
        const text =
          'Geopark Kedung Lantung, Bojonegoro, Jawa Timur. Jejak air, batu, dan waktu yang membentuk kisah bumi di tepian hutan Bojonegoro. Warisan geologi ini dirawat bersama oleh sesepuh Mbah Rahmat, Kepala Dusun Subianto, penggerak Pokdarwis Rico Thomas, Kepala Desa Yaspingi, akademisi Unigoro Dr. Laily Agustina, dan komunitas Bojonegoro History menuju UNESCO Global Geopark.'
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'id-ID'
        utterance.rate = 0.95
        utterance.onend = () => setIsPlaying(false)
        utterance.onerror = () => setIsPlaying(false)
        window.speechSynthesis.speak(utterance)
        setIsPlaying(true)
      }
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#beranda" aria-label="Geopark Kedung Lantung">
          <span className="brand-mark" aria-hidden="true"><Compass size={22} /></span>
          <span><b>Geopark</b><small>Kedung Lantung</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Navigasi utama">
          <a href="#beranda" onClick={() => setMenuOpen(false)}>Beranda</a>
          <a href="#tentang" onClick={() => setMenuOpen(false)}>Tentang</a>
          <a href="#nilai" onClick={() => setMenuOpen(false)}>Nilai Geologi</a>
          <a href="#tokoh" onClick={() => setMenuOpen(false)}>Pengenalan Tokoh</a>
          <a href="#galeri" onClick={() => setMenuOpen(false)}>Galeri</a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-nav-button"
            onClick={() => setMenuOpen(false)}
            title="Chat WhatsApp Fast Response"
          >
            <WhatsAppIcon size={14} />
            <span>WA Fast Response</span>
          </a>
          <button className="audio-button" onClick={toggleAudio}><span className="audio-icon">{isPlaying ? <Pause size={15} /> : <Play size={15} />}</span>{isPlaying ? 'Jeda narasi' : 'Dengarkan narasi'}</button>
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
            <h2>Penjaga Tradisi &<br /><em>Penggerak Geopark.</em></h2>
            <p className="tokoh-header-intro">
              Mulai dari sesepuh penjaga kearifan lokal, pemuda penggerak Pokdarwis, hingga akademisi dan pamong desa yang bersama-sama merawat cerita Kedung Lantung menuju pengakuan UNESCO Global Geopark.
            </p>
          </div>
          <div className="tokoh-filters" role="tablist" aria-label="Filter kategori tokoh">
            <button
              type="button"
              className={tokohCategory === 'all' ? 'tokoh-filter-btn active' : 'tokoh-filter-btn'}
              onClick={() => setTokohCategory('all')}
            >
              Semua ({tokohList.length})
            </button>
            <button
              type="button"
              className={tokohCategory === 'kultural' ? 'tokoh-filter-btn active' : 'tokoh-filter-btn'}
              onClick={() => setTokohCategory('kultural')}
            >
              Kultural & Tradisi
            </button>
            <button
              type="button"
              className={tokohCategory === 'pokdarwis' ? 'tokoh-filter-btn active' : 'tokoh-filter-btn'}
              onClick={() => setTokohCategory('pokdarwis')}
            >
              Pokdarwis & Pamong
            </button>
            <button
              type="button"
              className={tokohCategory === 'akademisi' ? 'tokoh-filter-btn active' : 'tokoh-filter-btn'}
              onClick={() => setTokohCategory('akademisi')}
            >
              Akademisi & Peneliti
            </button>
          </div>
        </div>

        <div className="tokoh-grid">
          {filteredTokoh.map((tokoh) => {
            const IconComponent =
              tokoh.icon === 'sparkles'
                ? Sparkles
                : tokoh.icon === 'book'
                ? BookOpen
                : tokoh.icon === 'users'
                ? Users
                : tokoh.icon === 'grad'
                ? GraduationCap
                : tokoh.icon === 'landmark'
                ? Landmark
                : Quote

            return (
              <article key={tokoh.id} className="tokoh-card">
                <div>
                  <div className="tokoh-card-top">
                    <div className="tokoh-icon-wrapper" aria-hidden="true">
                      <IconComponent size={20} />
                    </div>
                    <span className={`tokoh-badge ${tokoh.category}`}>
                      {tokoh.categoryLabel}
                    </span>
                  </div>
                  <h3 className="tokoh-name">{tokoh.name}</h3>
                  <p className="tokoh-role">{tokoh.role}</p>
                  <p className="tokoh-desc">{tokoh.desc}</p>
                </div>
                <div className="tokoh-quote">
                  &ldquo;{tokoh.highlight}&rdquo;
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section id="galeri" className="gallery-section page-width"><div className="gallery-heading"><div><p className="eyebrow">Momen di lapangan</p><h2>Rasakan <em>suasananya.</em></h2></div><span>Geser untuk menjelajah</span></div><div className="gallery-grid"><img src={heroImage} alt="Pemandangan Kedung Lantung" /><div className="gallery-card"><Volume2 size={22} /><p>Suara alam akan melengkapi perjalanan Anda.</p><small>FITUR AUDIO SEGERA HADIR</small></div><img src={detailImage} alt="Bebatuan di Kedung Lantung" /></div></section>
      <footer className="site-footer">
        <div className="page-width footer-inner">
          <div className="brand footer-brand">
            <span className="brand-mark"><Compass size={22} /></span>
            <span><b>Geopark</b><small>Kedung Lantung</small></span>
          </div>
          <p>Menjaga warisan bumi,<br />merawat cerita untuk generasi.</p>
          <div className="footer-meta">
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
      <button className="floating-audio" onClick={toggleAudio} aria-label={isPlaying ? 'Jeda narasi' : 'Putar narasi'} title={isPlaying ? 'Jeda narasi' : 'Dengarkan narasi'}>
        {isPlaying ? <Pause size={18} /> : <Headphones size={18} />}
      </button>
    </main>
  )
}
