'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Compass, Headphones, MapPin, Menu, Pause, Play, Volume2, X } from 'lucide-react'

const heroImage = 'https://i.ibb.co.com/sdd1R1Ym/20250919-100259-IMG-3387.jpg'
const detailImage = 'https://i.ibb.co.com/gMjPxRwL/20250919-100259-IMG-3387-Copy.jpg'

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

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
          'Geopark Kedung Lantung, Bojonegoro, Jawa Timur. Jejak air, batu, dan waktu yang membentuk kisah bumi di tepian hutan Bojonegoro. Kedung Lantung adalah salah satu warisan geologi penting di Geopark Bojonegoro. Air yang mengalir melewati batuan selama ribuan tahun menciptakan lanskap alami yang tenang, teduh, dan penuh karakter.'
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
          <a href="#galeri" onClick={() => setMenuOpen(false)}>Galeri</a>
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

      <section id="galeri" className="gallery-section page-width"><div className="gallery-heading"><div><p className="eyebrow">Momen di lapangan</p><h2>Rasakan <em>suasananya.</em></h2></div><span>Geser untuk menjelajah</span></div><div className="gallery-grid"><img src={heroImage} alt="Pemandangan Kedung Lantung" /><div className="gallery-card"><Volume2 size={22} /><p>Suara alam akan melengkapi perjalanan Anda.</p><small>FITUR AUDIO SEGERA HADIR</small></div><img src={detailImage} alt="Bebatuan di Kedung Lantung" /></div></section>
      <footer className="site-footer"><div className="page-width footer-inner"><div className="brand footer-brand"><span className="brand-mark"><Compass size={22} /></span><span><b>Geopark</b><small>Kedung Lantung</small></span></div><p>Menjaga warisan bumi,<br />merawat cerita untuk generasi.</p><div className="footer-meta"><span>© 2026</span><span>BOJONEGORO, INDONESIA</span></div></div></footer>
      <button className="floating-audio" onClick={toggleAudio} aria-label={isPlaying ? 'Jeda narasi' : 'Putar narasi'}>{isPlaying ? <Pause size={18} /> : <Headphones size={18} />}</button>
    </main>
  )
}
