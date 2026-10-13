'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Compass,
  Fish,
  Microscope,
  Feather,
  Waves,
  Leaf,
  Maximize2,
  X,
  ExternalLink,
  BookOpen,
  Share2,
  CheckCircle2,
  FileText,
  Sparkles,
} from 'lucide-react'

const WA_PHONE = '6281234567890'
const WA_TEXT = encodeURIComponent('Halo Admin Geopark Bojonegoro, saya ingin bertanya tentang hasil penelitian biodiversitas di Geosite Kedung Lantung.')
const waUrl = `https://wa.me/${WA_PHONE}?text=${WA_TEXT}`

interface FigureItem {
  id: string
  src: string
  title: string
  desc: string
  source?: string
  sourceUrl?: string
  category: 'grafik' | 'nekton' | 'bentos' | 'plankton' | 'fauna'
}

const figures: FigureItem[] = [
  {
    id: 'fig-1',
    src: '/image/Picture1.png',
    title: 'Gambar 1. Ragam Spesies di Kedung Lantung',
    desc: 'Jumlah ragam spesies yang ditemukan pada stasiun hulu (49 spesies), tengah (49 spesies), dan hilir (45 spesies) Sungai Kedung Lantung.',
    category: 'grafik',
  },
  {
    id: 'fig-2',
    src: '/image/Picture2.png',
    title: 'Gambar 2. Kemelimpahan Individu di Kedung Lantung',
    desc: 'Distribusi total individu di setiap stasiun pengamatan, menunjukkan kelimpahan tertinggi di bagian hilir sungai.',
    category: 'grafik',
  },
  {
    id: 'fig-3',
    src: '/image/Picture3.jpg',
    title: 'Gambar 3. Udang Galah (Macrobrachium rosenbergii)',
    desc: 'Spesies nekton dominan dengan proporsi lebih dari 85% di seluruh stasiun pengamatan Sungai Kedung Lantung.',
    category: 'nekton',
  },
  {
    id: 'fig-4',
    src: '/image/Picture4.jpg',
    title: 'Gambar 4. Bekicot (Achatina fulica)',
    desc: 'Organisme bentos dominan pada substrat bagian hulu dan tengah sungai dengan toleransi tinggi terhadap bahan organik.',
    category: 'bentos',
  },
  {
    id: 'fig-5',
    src: '/image/Picture5.jpg',
    title: 'Gambar 5. Siput Air Tawar (Tarebia granifera)',
    desc: 'Organisme bentos dominan pada bagian hilir sungai yang beradaptasi pada sedimen dasar perairan.',
    category: 'bentos',
  },
  {
    id: 'fig-6',
    src: '/image/Picture6.jpg',
    title: 'Gambar 6. Oscillatoria sp.',
    desc: 'Kelompok sianobakteria/fitoplankton yang toleran terhadap perairan kaya bahan organik dan nutrien tinggi.',
    source: 'Oceandatacenter.ucsc.edu',
    sourceUrl: 'https://oceandatacenter.ucsc.edu',
    category: 'plankton',
  },
  {
    id: 'fig-7',
    src: '/image/Picture7.png',
    title: 'Gambar 7. Anabaena sp.',
    desc: 'Mikroorganisme fitoplankton penciri perairan eutrofik dengan produktivitas primer tinggi.',
    source: 'Balasooriya (2019)',
    sourceUrl: 'https://www.researchgate.net/profile/Wajira-Balasooriya',
    category: 'plankton',
  },
  {
    id: 'fig-8',
    src: '/image/Picture8.jpg',
    title: 'Gambar 8. Euglena sp.',
    desc: 'Plankton motil yang mampu beradaptasi dan berkembang baik pada perairan dengan tekanan ekologis tertentu.',
    source: 'Thoughtco.com',
    sourceUrl: 'https://www.thoughtco.com',
    category: 'plankton',
  },
  {
    id: 'fig-9',
    src: '/image/Picture9.png',
    title: 'Gambar 9. Perbandingan Struktur Komunitas di Kedung Lantung',
    desc: 'Indeks keanekaragaman, indeks keseragaman, dan indeks dominansi pada stasiun hulu, tengah, dan hilir Sungai Kedung Lantung.',
    category: 'grafik',
  },
  {
    id: 'fig-10',
    src: '/image/Picture10.jpg',
    title: 'Gambar 10. Burung Cekakak Jawa (Halcyon cyanoventris)',
    desc: 'Predator puncak riparian pemakan udang dan ikan kecil yang menjadi bio-indikator stabilitas rantai makanan Kedung Lantung.',
    source: 'oss-dlh.jabarprov.go.id',
    sourceUrl: 'https://oss-dlh.jabarprov.go.id',
    category: 'fauna',
  },
]

const references = [
  {
    author: 'Almeda, R., Connelly, T. L., & Buskey, E. J. (2013)',
    title: 'Novel insight into the role of heterotrophic dinoflagellates in the fate of crude oil in the sea',
    source: 'Scientific Reports, 4(7560), 1–8',
    url: 'https://doi.org/10.1038/srep07560',
  },
  {
    author: 'Balasooriya, W.K. (2019)',
    title: 'Culture Collection of Cyanobacteria and Microalgae',
    source: 'Kandy, Sri Lanka: Nethwin Printers',
  },
  {
    author: 'Fachrul, M. F. (2007)',
    title: 'Metode Sampling Bioekologi',
    source: 'Jakarta: Bumi Aksara',
  },
  {
    author: 'Krebs, C. J. (1989)',
    title: 'Ecological Methodology',
    source: 'New York: Harper Collins Publishers',
  },
  {
    author: 'Odum, E. P. (1993)',
    title: 'Dasar-Dasar Ekologi (Edisi Ketiga)',
    source: 'Yogyakarta: Gadjah Mada University Press',
  },
  {
    author: 'Palaghianu, C. (2016)',
    title: 'A tool for computing diversity and consideration on differences between diversity indices',
    source: 'arXiv preprint',
    url: 'https://arxiv.org/abs/1602.04005',
  },
  {
    author: 'Perhar, G., & Arhonditsis, G. B. (2014)',
    title: 'Modeling the ecological impacts of oil spills in aquatic ecosystems: A review',
    source: 'Journal of Environmental Management, 145, 255–268',
    url: 'https://doi.org/10.1016/j.jenvman.2014.06.026',
  },
  {
    author: 'Paerl, H. W., & Otten, T. G. (2013)',
    title: 'Harmful cyanobacterial blooms: Causes, consequences, and controls',
    source: 'Microbial Ecology, 65(4), 995–1010',
    url: 'https://doi.org/10.1007/s00248-012-0159-y',
  },
  {
    author: 'Prasiwi, I. (2018)',
    title: 'Analisis hubungan kualitas air terhadap indeks keanekaragaman plankton dan benthos',
    source: 'Jurnal Teknik Lingkungan ITENAS, 6(2), 45–56',
  },
  {
    author: 'Rosenberg, D. M., & Resh, V. H. (1993)',
    title: 'Freshwater biomonitoring and benthic macroinvertebrates',
    source: 'New York, NY: Chapman & Hall',
  },
  {
    author: 'Rusmidin, R. (2023)',
    title: 'Identifikasi plankton dan bentos sebagai bioindikator pencemaran sungai',
    source: 'Borneo Journal of Biology Education, 5(1), 11–20',
  },
  {
    author: 'Schwing, P. T., Romero, I. C., Brooks, G. R., Hastings, D. W., et al. (2020)',
    title: 'A synthesis of deep benthic faunal impacts and resilience following the Deepwater Horizon oil spill',
    source: 'Frontiers in Marine Science, 7, 560012',
    url: 'https://doi.org/10.3389/fmars.2020.560012',
  },
  {
    author: 'Soares, M. O., & Mello, L. C. (2023)',
    title: 'Oil spill impacts on aquatic food webs and ecosystem functioning',
    source: 'Marine Pollution Bulletin, 188, 114646',
    url: 'https://doi.org/10.1016/j.marpolbul.2023.114646',
  },
  {
    author: 'UNESCO (2021)',
    title: 'UNESCO Global Geoparks operational guidelines',
    source: 'United Nations Educational, Scientific and Cultural Organization',
  },
  {
    author: 'Wahyudi, R. (2024)',
    title: 'Struktur komunitas makrozoobentos sebagai bioindikator kualitas perairan',
    source: 'Jurnal Perikanan dan Biologi Perairan, 15(2), 33–44',
  },
  {
    author: 'Wahyuningsih, H., Harahap, Z. A., & Siregar, E. S. (2024)',
    title: 'Structure of plankton and benthos communities in Bahorok River, North Sumatra',
    source: 'International Journal of Ecophysiology, 6(2), 111–118',
  },
  {
    author: 'Wowor, D., Ng, P. K. L., & Suharti, S. R. (2009)',
    title: 'The giant freshwater prawns of the genus Macrobrachium in Indonesia',
    source: 'Raffles Bulletin of Zoology, 57(2), 343–368',
  },
]

export default function BiodiversitasPage() {
  const [selectedFigure, setSelectedFigure] = useState<FigureItem | null>(null)
  const [activeSection, setActiveSection] = useState<string>('struktur')

  return (
    <main className="bio-page">
      {/* Sticky Header */}
      <header className="bio-header-bar">
        <div className="page-width bio-header-inner">
          <a className="brand" href="/" aria-label="Kembali ke Beranda">
            <span className="brand-mark" aria-hidden="true"><Compass size={20} /></span>
            <span>
              <b>Geopark</b>
              <small>Kedung Lantung</small>
            </span>
          </a>

          <div className="bio-header-nav">
            <a href="/" className="bio-nav-link">Beranda</a>
            <a href="/hubungkait-ekonomi" className="bio-nav-link">Hubung Kait Ekonomi</a>
            <a href="/hubungkait" className="bio-nav-link">Geologi & Hayati</a>
            <a href="/buku-tamu" className="bio-nav-link">Buku Tamu</a>
            <a href="/" className="bio-back-btn">
              <ArrowLeft size={16} />
              <span>Kembali</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bio-hero-section">
        <div className="page-width bio-hero-inner">
          <div className="bio-badge-pill">
            <span className="badge-dot" />
            <span>Kajian Ilmiah Ekologi & Biodiversitas · G-05</span>
          </div>

          <h1 className="bio-hero-title">
            Biodiversitas & Struktur Komunitas <br />
            <em>Sungai Kedung Lantung</em>
          </h1>

          <p className="bio-hero-lead">
            Observasi komprehensif struktur komunitas organisme akuatik (nekton, bentos, dan plankton)
            pada tiga stasiun aliran Sungai Kedung Lantung serta respon adaptasi ekologisnya terhadap
            fenomena rembesan minyak bumi alami.
          </p>

          <div className="bio-stat-banner">
            <div className="bio-stat-card">
              <div className="bio-stat-icon">
                <Waves size={20} />
              </div>
              <div>
                <strong>3 Stasiun Sampel</strong>
                <span>Hulu, Tengah & Hilir Sungai</span>
              </div>
            </div>

            <div className="bio-stat-card">
              <div className="bio-stat-icon">
                <Fish size={20} />
              </div>
              <div>
                <strong>&gt;85% Nekton</strong>
                <span>Didominasi Udang Galah</span>
              </div>
            </div>

            <div className="bio-stat-card">
              <div className="bio-stat-icon">
                <Microscope size={20} />
              </div>
              <div>
                <strong>Plankton Toleran</strong>
                <span>Oscillatoria & Euglena sp.</span>
              </div>
            </div>

            <div className="bio-stat-card">
              <div className="bio-stat-icon">
                <Feather size={20} />
              </div>
              <div>
                <strong>Predator Puncak</strong>
                <span>Burung Cekakak Jawa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Sub-Nav */}
      <div className="page-width bio-main-layout">
        {/* Table of contents bar */}
        <nav className="bio-toc-bar" aria-label="Navigasi bab penelitian">
          <a
            href="#struktur"
            className={`bio-toc-item ${activeSection === 'struktur' ? 'active' : ''}`}
            onClick={() => setActiveSection('struktur')}
          >
            1. Struktur Komunitas
          </a>
          <a
            href="#rembesan"
            className={`bio-toc-item ${activeSection === 'rembesan' ? 'active' : ''}`}
            onClick={() => setActiveSection('rembesan')}
          >
            2. Pengaruh Rembesan Minyak
          </a>
          <a
            href="#fisiologis"
            className={`bio-toc-item ${activeSection === 'fisiologis' ? 'active' : ''}`}
            onClick={() => setActiveSection('fisiologis')}
          >
            3. Respon Fisiologis
          </a>
          <a
            href="#trofik"
            className={`bio-toc-item ${activeSection === 'trofik' ? 'active' : ''}`}
            onClick={() => setActiveSection('trofik')}
          >
            4. Udang Galah & Cekakak Jawa
          </a>
          <a
            href="#geopark"
            className={`bio-toc-item ${activeSection === 'geopark' ? 'active' : ''}`}
            onClick={() => setActiveSection('geopark')}
          >
            5. Nilai Geopark
          </a>
          <a
            href="#referensi"
            className={`bio-toc-item ${activeSection === 'referensi' ? 'active' : ''}`}
            onClick={() => setActiveSection('referensi')}
          >
            6. Daftar Rujukan
          </a>
        </nav>

        {/* SECTION 1: Struktur Komunitas */}
        <section id="struktur" className="bio-article-section">
          <div className="section-header-tag">
            <span className="section-number">01</span>
            <h2>Struktur Komunitas di Kedung Lantung</h2>
          </div>

          <div className="bio-prose">
            <p>
              Pengamatan struktur komunitas organisme di Kedung Lantung dilakukan pada tiga stasiun pengambilan sampel,
              yaitu bagian <b>hulu</b>, <b>tengah</b>, dan <b>hilir sungai</b>. Organisme yang diamati meliputi kelompok <em>nekton</em>,
              <em>bentos</em>, dan <em>plankton</em>. Setiap stasiun menunjukkan karakteristik lingkungan yang berbeda,
              sehingga memengaruhi jumlah individu, komposisi spesies, tingkat dominansi, serta kestabilan komunitas organisme
              di perairan tersebut. Faktor lingkungan seperti arus, sedimentasi, kedalaman perairan, dan kandungan nutrien
              diketahui berperan penting dalam membentuk struktur komunitas organisme akuatik (Odum, 1993; Fachrul, 2007).
            </p>

            <p>
              Berdasarkan jumlah ragam spesies yang ditemukan, stasiun hulu dan tengah memiliki jumlah spesies yang hampir sama,
              yaitu masing-masing sebanyak <b>49 spesies</b>. Sementara itu, bagian hilir memiliki jumlah spesies sedikit lebih rendah,
              yaitu <b>45 spesies</b>. Meskipun demikian, berdasarkan jumlah total individu, bagian hilir justru menunjukkan
              kelimpahan organisme paling tinggi, sedangkan bagian tengah memiliki jumlah individu paling rendah. Perbedaan tersebut
              mengindikasikan adanya variasi kondisi habitat di sepanjang aliran Sungai Kedung Lantung, terutama terkait kecepatan arus,
              akumulasi sedimen, serta distribusi bahan organik dan nutrien di perairan.
            </p>

            {/* Figures 1 & 2 in a 2-column grid */}
            <div className="figure-grid-two">
              <div
                className="figure-card"
                onClick={() => setSelectedFigure(figures[0])}
                title="Klik untuk memperbesar gambar"
              >
                <div className="figure-img-wrap">
                  <img src={figures[0].src} alt={figures[0].title} className="figure-img" />
                  <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar</span>
                </div>
                <div className="figure-caption">
                  <strong>{figures[0].title}</strong>
                  <p>{figures[0].desc}</p>
                </div>
              </div>

              <div
                className="figure-card"
                onClick={() => setSelectedFigure(figures[1])}
                title="Klik untuk memperbesar gambar"
              >
                <div className="figure-img-wrap">
                  <img src={figures[1].src} alt={figures[1].title} className="figure-img" />
                  <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar</span>
                </div>
                <div className="figure-caption">
                  <strong>{figures[1].title}</strong>
                  <p>{figures[1].desc}</p>
                </div>
              </div>
            </div>

            <h3>Kelompok Nekton</h3>
            <p>
              Kelompok nekton di seluruh stasiun didominasi oleh <b>Udang Galah (<em>Macrobrachium rosenbergii</em>)</b> dengan proporsi
              lebih dari <b>85%</b> dari total individu nekton yang ditemukan. Dominasi udang galah menunjukkan bahwa habitat
              Sungai Kedung Lantung masih mampu mendukung kehidupan organisme nekton air tawar, khususnya krustasea yang membutuhkan
              kualitas habitat cukup baik. Kelimpahan udang galah juga mengindikasikan tersedianya sumber pakan dan habitat berlindung
              yang memadai di sepanjang aliran sungai (Wowor et al., 2009).
            </p>

            <h3>Kelompok Plankton</h3>
            <p>
              Pada kelompok plankton, komunitas didominasi oleh <em>Oscillatoria sp.</em>, <em>Anabaena sp.</em>, dan <em>Euglena sp.</em>
              Ketiga jenis plankton tersebut dikenal sebagai organisme yang toleran terhadap perairan dengan kandungan bahan organik dan
              nutrien cukup tinggi (Pratiwi et al., 2019). Dominasi <em>Oscillatoria</em> dan <em>Anabaena</em> umumnya berkaitan dengan
              kondisi perairan eutrofik atau perairan dengan produktivitas primer tinggi (Paerl &amp; Otten, 2013).
            </p>
            <p>
              Kemunculan <em>Cyclotella sp.</em> dalam kelimpahan cukup tinggi di stasiun tengah diduga berkaitan dengan karakteristik
              lingkungan area kedung yang memiliki arus lebih tenang, sedimentasi lebih tinggi, serta adanya rembesan minyak bumi alami.
              Keberadaan hidrokarbon diduga memengaruhi struktur komunitas plankton melalui perubahan kondisi kimia perairan dan
              peningkatan bahan organik. Beberapa diatom, termasuk kelompok <em>Cyclotella</em>, diketahui memiliki toleransi cukup baik
              terhadap tekanan lingkungan dan perubahan kondisi nutrien sehingga mampu berkembang pada habitat dengan gangguan ekologis
              tertentu (Saros &amp; Anderson, 2015; Paniagua-Michel et al., 2024). Selain itu, kondisi perairan yang relatif tenang juga
              mendukung pertumbuhan diatom planktonik seperti <em>Cyclotella sp.</em> yang umumnya berkembang baik pada perairan dengan
              sedimentasi dan kandungan nutrien cukup tinggi (Nur, 2024).
            </p>

            <h3>Kelompok Bentos</h3>
            <p>
              Komunitas bentos pada bagian hulu dan tengah didominasi oleh <b>Bekicot (<em>Achatina fulica</em>)</b>, sedangkan bagian hilir
              didominasi oleh <b>Siput Air Tawar (<em>Tarebia granifera</em>)</b>. Dominasi gastropoda tersebut menunjukkan bahwa substrat
              dasar sungai masih mendukung kehidupan organisme bentik, terutama pada area dengan akumulasi bahan organik dan sedimen halus.
              Organisme bentos diketahui sangat dipengaruhi oleh kondisi substrat dan kualitas sedimen karena sebagian besar hidup menetap
              di dasar perairan (Rosenberg &amp; Resh, 1993).
            </p>

            {/* Figures 3, 4, 5 (Macroorganisms) */}
            <div className="figure-grid-three">
              <div
                className="figure-card"
                onClick={() => setSelectedFigure(figures[2])}
                title="Klik untuk memperbesar gambar"
              >
                <div className="figure-img-wrap">
                  <img src={figures[2].src} alt={figures[2].title} className="figure-img" />
                  <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar</span>
                </div>
                <div className="figure-caption">
                  <strong>{figures[2].title}</strong>
                  <p>{figures[2].desc}</p>
                </div>
              </div>

              <div
                className="figure-card"
                onClick={() => setSelectedFigure(figures[3])}
                title="Klik untuk memperbesar gambar"
              >
                <div className="figure-img-wrap">
                  <img src={figures[3].src} alt={figures[3].title} className="figure-img" />
                  <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar</span>
                </div>
                <div className="figure-caption">
                  <strong>{figures[3].title}</strong>
                  <p>{figures[3].desc}</p>
                </div>
              </div>

              <div
                className="figure-card"
                onClick={() => setSelectedFigure(figures[4])}
                title="Klik untuk memperbesar gambar"
              >
                <div className="figure-img-wrap">
                  <img src={figures[4].src} alt={figures[4].title} className="figure-img" />
                  <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar</span>
                </div>
                <div className="figure-caption">
                  <strong>{figures[4].title}</strong>
                  <p>{figures[4].desc}</p>
                </div>
              </div>
            </div>

            {/* Figures 6, 7, 8 (Microplankton) */}
            <div className="figure-grid-three">
              <div
                className="figure-card"
                onClick={() => setSelectedFigure(figures[5])}
                title="Klik untuk memperbesar gambar"
              >
                <div className="figure-img-wrap">
                  <img src={figures[5].src} alt={figures[5].title} className="figure-img" />
                  <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar</span>
                </div>
                <div className="figure-caption">
                  <strong>{figures[5].title}</strong>
                  <p>{figures[5].desc}</p>
                  {figures[5].source && <small className="figure-source">Sumber: {figures[5].source}</small>}
                </div>
              </div>

              <div
                className="figure-card"
                onClick={() => setSelectedFigure(figures[6])}
                title="Klik untuk memperbesar gambar"
              >
                <div className="figure-img-wrap">
                  <img src={figures[6].src} alt={figures[6].title} className="figure-img" />
                  <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar</span>
                </div>
                <div className="figure-caption">
                  <strong>{figures[6].title}</strong>
                  <p>{figures[6].desc}</p>
                  {figures[6].source && <small className="figure-source">Sumber: {figures[6].source}</small>}
                </div>
              </div>

              <div
                className="figure-card"
                onClick={() => setSelectedFigure(figures[7])}
                title="Klik untuk memperbesar gambar"
              >
                <div className="figure-img-wrap">
                  <img src={figures[7].src} alt={figures[7].title} className="figure-img" />
                  <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar</span>
                </div>
                <div className="figure-caption">
                  <strong>{figures[7].title}</strong>
                  <p>{figures[7].desc}</p>
                  {figures[7].source && <small className="figure-source">Sumber: {figures[7].source}</small>}
                </div>
              </div>
            </div>

            {/* Figure 9: Community Structure Index Comparison */}
            <div
              className="figure-card figure-single-featured"
              onClick={() => setSelectedFigure(figures[8])}
              title="Klik untuk memperbesar grafik perbandingan"
            >
              <div className="figure-img-wrap">
                <img src={figures[8].src} alt={figures[8].title} className="figure-img" />
                <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar Grafik</span>
              </div>
              <div className="figure-caption">
                <strong>{figures[8].title}</strong>
                <p>{figures[8].desc}</p>
              </div>
            </div>

            <p>
              Hasil analisis struktur komunitas menunjukkan bahwa <b>nilai indeks keanekaragaman hayati</b> dan
              <b>indeks keseragaman tertinggi</b> terdapat pada stasiun hilir, sedangkan nilai terendah ditemukan di bagian hulu.
              Tingginya nilai indeks keanekaragaman menunjukkan bahwa komunitas organisme di hilir memiliki komposisi spesies yang
              lebih beragam dan distribusi individu yang lebih merata. Sebaliknya, nilai indeks dominansi tertinggi ditemukan di stasiun hulu,
              disusul bagian tengah, dan terendah di hilir. Kondisi ini menunjukkan bahwa komunitas organisme di hulu cenderung lebih
              dipengaruhi oleh dominasi beberapa spesies tertentu dibandingkan stasiun lainnya.
            </p>

            <div className="bio-highlight-callout">
              <CheckCircle2 size={20} />
              <div>
                <strong>Status Kestabilan Komunitas:</strong>
                <span>
                  Meskipun terdapat perbedaan nilai indeks antar stasiun, seluruh nilai indeks masih berada pada kisaran kategori yang sama:
                  <b> Indeks keanekaragaman berada pada kategori sedang</b>, <b>indeks dominansi tergolong rendah</b>, dan
                  <b> indeks keseragaman termasuk kategori sedang</b>. Kondisi tersebut menunjukkan bahwa komunitas organisme di Sungai Kedung
                  Lantung masih berada dalam kondisi cukup stabil, meskipun belum mencapai kondisi komunitas yang benar-benar seimbang
                  (Krebs, 1989).
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Pengaruh Rembesan Minyak Bumi */}
        <section id="rembesan" className="bio-article-section">
          <div className="section-header-tag">
            <span className="section-number">02</span>
            <h2>Pengaruh Rembesan Minyak Bumi terhadap Struktur Komunitas Organisme di Sungai Kedung Lantung</h2>
          </div>

          <div className="bio-prose">
            <p>
              Berdasarkan hasil analisis struktur komunitas nekton, bentos, dan plankton di Sungai Kedung Lantung, keberadaan rembesan
              minyak bumi alami pada bagian tengah sungai diduga memberikan pengaruh ekologis terhadap komunitas organisme perairan.
              Namun, <b>pengaruh tersebut belum menunjukkan indikasi pencemaran berat</b> karena nilai indeks keanekaragaman masih berada
              pada kategori sedang dan indeks dominansi tergolong rendah. Kondisi ini menunjukkan bahwa ekosistem sungai masih mampu
              mendukung kehidupan berbagai organisme akuatik.
            </p>

            <blockquote className="bio-quote">
              “Fenomena tersebut menarik karena rembesan minyak di Kedung Lantung merupakan proses geologi alami yang telah berlangsung lama.
              Pada ekosistem dengan rembesan minyak alami, organisme perairan umumnya memiliki kemampuan adaptasi lebih baik terhadap
              senyawa hidrokarbon dibanding ekosistem yang mengalami pencemaran minyak secara tiba-tiba akibat aktivitas industri.”
              <footer>— Perhar &amp; Arhonditsis (2014)</footer>
            </blockquote>

            <h3>Pengaruh terhadap Komunitas Plankton</h3>
            <p>
              Kelompok plankton di seluruh stasiun didominasi oleh <em>Oscillatoria sp.</em>, <em>Euglena sp.</em>, dan <em>Anabaena sp.</em>.
              Ketiga kelompok ini dikenal sebagai organisme yang toleran terhadap peningkatan bahan organik dan perubahan kualitas air (Prasiwi, 2018).
              Dominasi <em>Oscillatoria</em> dan <em>Anabaena</em> sering ditemukan pada perairan dengan kandungan nutrien tinggi atau kondisi
              eutrofik (Wahyuningsih et al., 2024). Sementara itu, <em>Euglena sp.</em> umumnya berkembang baik pada lingkungan yang memiliki
              kandungan bahan organik cukup tinggi dan kondisi perairan yang mulai mengalami tekanan ekologis (Rusmidin, 2023).
            </p>
            <p>
              Pada bagian tengah Sungai Kedung Lantung yang terdapat rembesan minyak bumi, komunitas plankton masih menunjukkan nilai
              keanekaragaman sedang. Hal ini mengindikasikan bahwa konsentrasi minyak kemungkinan belum mencapai tingkat toksik akut bagi plankton.
              Selain itu, aliran sungai diduga masih mampu melakukan proses pengenceran alami sehingga dampak toksik minyak tidak terakumulasi secara ekstrem.
              Menurut penelitian Perhar dan Arhonditsis (2014), hidrokarbon minyak bumi dapat mengubah struktur komunitas plankton melalui
              penurunan spesies sensitif dan peningkatan spesies yang lebih toleran. Senyawa hidrokarbon aromatik polisiklik (PAHs) juga diketahui
              mampu menghambat proses fotosintesis dan memicu stres oksidatif pada mikroorganisme perairan (Almeda et al., 2013).
            </p>

            <h3>Pengaruh terhadap Komunitas Bentos</h3>
            <p>
              Kelompok bentos di Sungai Kedung Lantung didominasi oleh <em>Melanoides tuberculata</em>, <em>Tarebia granifera</em>, dan
              <em>Achatina fulica</em>. Jenis-jenis tersebut dikenal memiliki toleransi tinggi terhadap perubahan kualitas lingkungan dan
              peningkatan bahan organik (Wahyudi, 2024).
            </p>
            <p>
              Bentos merupakan kelompok organisme yang paling sensitif terhadap pencemaran kronis karena hidup menetap di dasar perairan dan
              berinteraksi langsung dengan sedimen (Schwing et al., 2020). Pada lingkungan yang terpapar minyak bumi, senyawa hidrokarbon
              cenderung mengendap pada substrat sehingga dampak ekologis lebih cepat terlihat pada komunitas bentos dibanding organisme lain.
              Meskipun demikian, komunitas bentos di Sungai Kedung Lantung masih menunjukkan tingkat keanekaragaman sedang, yang mengindikasikan
              bahwa organisme bentik kemungkinan telah mengalami proses toleransi ekologis terhadap rembesan minyak alami yang berlangsung dalam jangka panjang.
            </p>

            <h3>Pengaruh terhadap Komunitas Nekton</h3>
            <p>
              Kelompok nekton di Sungai Kedung Lantung didominasi oleh <em>Macrobrachium rosenbergii</em>, <em>Rasbora argyrotaenia</em>, dan
              <em>Puntius binotatus</em>. Dominasi udang galah (<em>Macrobrachium rosenbergii</em>) pada seluruh stasiun menunjukkan bahwa habitat
              sungai masih cukup mendukung kehidupan nekton air tawar. Jika rembesan minyak memberikan dampak toksik berat, maka kelompok nekton
              umumnya akan mengalami penurunan kelimpahan, gangguan reproduksi, perubahan perilaku, bahkan migrasi menjauhi area tercemar (Soares &amp; Mello, 2023).
            </p>
            <p>
              Namun pada penelitian ini, nekton masih ditemukan dalam jumlah cukup melimpah, terutama pada bagian hilir. Hal ini menunjukkan
              bahwa rembesan minyak di Kedung Lantung kemungkinan masih berada dalam tingkat paparan rendah hingga sedang serta bersifat lokal.
            </p>
          </div>
        </section>

        {/* SECTION 3: Respon Fisiologis */}
        <section id="fisiologis" className="bio-article-section">
          <div className="section-header-tag">
            <span className="section-number">03</span>
            <h2>Apakah Rembesan Minyak Memicu Respon Fisiologis Organisme?</h2>
          </div>

          <div className="bio-prose">
            <p>
              Berdasarkan struktur komunitas yang ditemukan, keberadaan rembesan minyak bumi alami di Kedung Lantung diduga memicu
              respon fisiologis dan ekologis pada organisme perairan. Indikasi tersebut terlihat dari:
            </p>

            <div className="bio-evidence-grid">
              <div className="evidence-card">
                <span className="evidence-badge">Indikator 1</span>
                <strong>Dominasi Organisme Toleran</strong>
                <p>Spesies yang berkembang pesat adalah kelompok organisme yang mampu bertahan pada kandungan hidrokarbon dan nutrien organik tinggi.</p>
              </div>

              <div className="evidence-card">
                <span className="evidence-badge">Indikator 2</span>
                <strong>Rendahnya Dominansi Spesies Ekstrem</strong>
                <p>Meskipun ada spesies dominan, indeks dominansi keseluruhan masih tergolong rendah, menandakan keanekaragaman belum runtuh.</p>
              </div>

              <div className="evidence-card">
                <span className="evidence-badge">Indikator 3</span>
                <strong>Diferensiasi Hulu vs Area Rembesan</strong>
                <p>Adanya perbedaan komposisi struktur komunitas antara stasiun hulu yang jernih dan area kedung tengah yang memiliki rembesan minyak alami.</p>
              </div>
            </div>

            <p>
              Menurut Perhar dan Arhonditsis (2014), komunitas organisme pada lingkungan yang terpapar hidrokarbon dalam jangka panjang
              cenderung mengalami proses seleksi ekologis, yaitu spesies sensitif berkurang dan spesies toleran menjadi lebih dominan.
              Almeda et al. (2013) juga menjelaskan bahwa hidrokarbon minyak bumi dapat memicu respon fisiologis berupa <b>stres oksidatif</b>,
              <b>perubahan aktivitas enzim</b>, <b>gangguan respirasi</b>, dan <b>penurunan efisiensi metabolisme</b> organisme akuatik.
              Namun karena rembesan minyak di Kedung Lantung bersifat alami dan telah berlangsung lama, kemungkinan organisme lokal telah mengalami
              adaptasi ekologis secara bertahap sehingga dampak yang muncul lebih bersifat kronis dibanding akut.
            </p>
          </div>
        </section>

        {/* SECTION 4: Udang Galah & Burung Cekakak Jawa */}
        <section id="trofik" className="bio-article-section">
          <div className="section-header-tag">
            <span className="section-number">04</span>
            <h2>Udang Galah dan Burung Cekakak Jawa: Penanda Stabilitas Ekosistem Sungai</h2>
          </div>

          <div className="bio-prose">
            <p>
              Dominasi nekton berupa udang galah sangat kuat di bagian hulu, tengah, maupun hilir. Melimpahnya populasi udang galah
              (<em>Macrobrachium rosenbergii</em>) di Kedung Lantung juga diduga memiliki hubungan ekologis dengan keberadaan predator alami,
              salah satunya <b>Burung Cekakak Jawa (<em>Halcyon cyanoventris</em>)</b>. Burung ini merupakan predator akuatik yang umum
              ditemukan di kawasan riparian dan memanfaatkan organisme air seperti ikan kecil, udang, dan serangga air sebagai sumber makanan.
              Tingginya kelimpahan udang galah menunjukkan bahwa habitat sungai masih mampu menyediakan sumber pakan yang cukup bagi predator tingkat lebih tinggi.
            </p>

            {/* Figure 10: Burung Cekakak Jawa */}
            <div
              className="figure-card figure-single-featured"
              onClick={() => setSelectedFigure(figures[9])}
              title="Klik untuk memperbesar foto Burung Cekakak Jawa"
            >
              <div className="figure-img-wrap">
                <img src={figures[9].src} alt={figures[9].title} className="figure-img" />
                <span className="figure-zoom-badge"><Maximize2 size={13} /> Perbesar Foto</span>
              </div>
              <div className="figure-caption">
                <strong>{figures[9].title}</strong>
                <p>{figures[9].desc}</p>
                {figures[9].source && <small className="figure-source">Sumber: {figures[9].source}</small>}
              </div>
            </div>

            <p>
              Interaksi predatori tersebut menunjukkan adanya <b>keterkaitan trofik yang masih berjalan dengan baik</b> dalam ekosistem
              Sungai Kedung Lantung. Kehadiran Burung Cekakak Jawa dapat menjadi indikator bahwa rantai makanan perairan masih relatif stabil
              dan habitat riparian di sekitar sungai masih mendukung kehidupan satwa liar. Dalam ekologi perairan, keberadaan predator puncak
              seperti burung pemakan ikan dan udang berperan penting dalam menjaga keseimbangan populasi organisme akuatik melalui mekanisme kontrol biologis (Odum, 1993).
            </p>
            <p>
              Selain itu, habitat Kedung Lantung yang memiliki kombinasi aliran tenang, vegetasi riparian, dan ketersediaan organisme akuatik
              melimpah menjadikan kawasan ini ideal sebagai lokasi berburu bagi Burung Cekakak Jawa. Dengan demikian, melimpahnya udang galah
              tidak hanya mencerminkan kondisi habitat akuatik yang masih mendukung kehidupan nekton, tetapi juga menunjukkan adanya hubungan
              ekologis antara biodiversitas perairan dan fauna daratan di kawasan geosite Kedung Lantung.
            </p>
          </div>
        </section>

        {/* SECTION 5: Nilai Geosite Geopark */}
        <section id="geopark" className="bio-article-section">
          <div className="section-header-tag">
            <span className="section-number">05</span>
            <h2>Interpretasi Ekologis Kedung Lantung sebagai Geosite Geopark</h2>
          </div>

          <div className="bio-prose">
            <p>
              Kedung Lantung memiliki karakteristik yang sangat unik karena merupakan geosite dengan <b>fenomena rembesan minyak bumi alami
              di aliran sungai</b>. Berbeda dengan sungai yang tercemar limbah industri, tekanan ekologis pada Kedung Lantung berasal dari
              proses geologi alami yang sudah berlangsung ribuan tahun.
            </p>
            <p>
              Kondisi ini menjadikan Sungai Kedung Lantung sebagai contoh penting hubungan antara <b>geodiversitas</b> dan <b>biodiversitas</b> dalam
              suatu ekosistem geopark. Menurut UNESCO Global Geoparks, kawasan geopark tidak hanya memiliki nilai geologi, tetapi juga keterkaitan
              ekologis dan budaya yang penting untuk pendidikan, konservasi, dan penelitian ilmiah (UNESCO, 2021).
            </p>

            <div className="bio-potensi-cards">
              <div className="potensi-card">
                <span className="potensi-icon">🔬</span>
                <strong>Laboratorium Alam</strong>
                <p>Wahana edukasi lapangan terbuka bagi pelajar, mahasiswa, dan peneliti untuk mempelajari proses suksesi ekologis di alam.</p>
              </div>

              <div className="potensi-card">
                <span className="potensi-icon">📊</span>
                <strong>Lokasi Biomonitoring</strong>
                <p>Indikator biologis berkala untuk memantau mutu perairan sungai dan dinamika aliran batuan hidrokarbon Bojonegoro.</p>
              </div>

              <div className="potensi-card">
                <span className="potensi-icon">🌱</span>
                <strong>Riset Adaptasi Alami</strong>
                <p>Pusat penelitian internasional mengenai mekanisme adaptasi dan toleransi genetik mikroorganisme terhadap senyawa hidrokarbon alami.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Daftar Referensi */}
        <section id="referensi" className="bio-article-section bio-references-section">
          <div className="section-header-tag">
            <span className="section-number">06</span>
            <h2>Referensi & Rujukan Ilmiah</h2>
          </div>

          <div className="bio-references-list">
            {references.map((ref, idx) => (
              <div key={idx} className="reference-item">
                <span className="ref-index">[{idx + 1}]</span>
                <div className="ref-text">
                  <span className="ref-author">{ref.author}.</span>{' '}
                  <span className="ref-title">{ref.title}.</span>{' '}
                  <span className="ref-source">{ref.source}.</span>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ref-link"
                    >
                      <ExternalLink size={12} /> Buka Rujukan
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA & Navigation to Other Pages */}
        <section className="bio-cta-card">
          <div className="bio-cta-text">
            <h3>Jelajahi Hubungkait & Catat Kunjungan Anda</h3>
            <p>
              Dengarkan juga audio narasi infografis mengenai keterkaitan fenomena geologi dengan ekonomi dan budaya masyarakat di Kedung Lantung.
            </p>
          </div>
          <div className="bio-cta-actions">
            <a href="/hubungkait" className="primary-cta-btn">
              <Sparkles size={16} />
              <span>Infografis & Audio Hubungkait</span>
            </a>
            <a href="/buku-tamu" className="secondary-cta-btn">
              <span>Isi Buku Tamu Kunjungan</span>
            </a>
          </div>
        </section>
      </div>

      {/* Lightbox Modal for Any Figure */}
      {selectedFigure && (
        <div
          className="bio-modal-backdrop"
          onClick={() => setSelectedFigure(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bio-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bio-modal-header">
              <div>
                <strong>{selectedFigure.title}</strong>
                <p>{selectedFigure.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFigure(null)}
                className="bio-modal-close"
                aria-label="Tutup pratinjau gambar"
              >
                <X size={20} />
              </button>
            </div>
            <div className="bio-modal-body">
              <img
                src={selectedFigure.src}
                alt={selectedFigure.title}
                className="bio-modal-img"
              />
            </div>
            {selectedFigure.source && (
              <div className="bio-modal-footer">
                <span>Sumber Gambar: {selectedFigure.source}</span>
                {selectedFigure.sourceUrl && (
                  <a
                    href={selectedFigure.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kunjungi Sumber <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bio-footer">
        <div className="page-width bio-footer-inner">
          <div className="footer-brand">
            <span className="brand-mark"><Compass size={18} /></span>
            <span><b>Geopark</b> Bojonegoro · Kedung Lantung G-05</span>
          </div>
          <div className="footer-links">
            <a href="/">Beranda</a>
            <a href="/hubungkait-ekonomi">Hubung Kait Ekonomi</a>
            <a href="/hubungkait">Geologi & Hayati</a>
            <a href="/#lokasi">Peta Lokasi</a>
            <a href="https://www.google.com/maps/place/Wisata+Air+Kedunglantung/@-7.3543218,111.9820539,19.68z/data=!4m14!1m7!3m6!1s0x2e782fdd7fefb283:0x13a6eb104b5b8f9d!2sKedung+Lantung!8m2!3d-7.354203!4d111.9828018!16s%2Fg%2F11jb83q_dy!3m5!1s0x2e782e5c81f187ff:0x89626e76beac4ded!8m2!3d-7.3546584!4d111.9819883!16s%2Fg%2F11g69g7qfv?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
              📍 Google Maps
            </a>
            <a href="/buku-tamu">Buku Tamu Digital</a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              Chat Admin WA
            </a>
          </div>
          <p className="footer-copy">
            © 2026 Geopark Bojonegoro. Dokumen Kajian Biodiversitas & Struktur Komunitas Organisme Kedung Lantung.
          </p>
        </div>
      </footer>
    </main>
  )
}
