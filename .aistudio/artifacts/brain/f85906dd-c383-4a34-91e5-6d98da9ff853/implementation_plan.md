# Minimalist Luxury Global Engineering & Design Portfolio

Situs portofolio web berstandar internasional dengan performa tinggi (60 FPS), dirancang dengan estetika *Minimalist Luxury Editorial* monokrom dan aksen presisi. Mengintegrasikan kanvas interaktif Three.js *Particle Wave & Network Grid*, fitur lokalisasi multi-bahasa (English, Indonesian, Japanese), kalkulator estimasi biaya & timeline proyek global, inspektor topologi jaringan interaktif, serta jam zona waktu ketersediaan live untuk klien di seluruh belahan dunia.

## User Review & Critical Decisions

> [!IMPORTANT]
> Ringkasan keputusan yang telah disepakati bersama pengguna:
> - **Arah Estetika & 3D**: *Minimalist Luxury Editorial* monokrom dengan Three.js particle wave berkontur dinamis yang merespons pergerakan kursor dan scroll tanpa degradasi performa (60 FPS).
> - **Identitas Brand**: Personal Brand sebagai Tech Specialist & Senior Engineer lintas disiplin (Web Programming, UI/UX Design, Computer Networking, Frontend Architecture).
> - **Fitur Interaktif Global**:
>   1. *Multi-Language Engine* (English / Indonesian / Japanese) dengan pergantian instan tanpa reload.
>   2. *Global Client Project Cost & Timeline Estimator* interaktif dengan konversi multi-currency (USD, EUR, IDR, JPY) dan estimasi sprint.
>   3. *Live Time-Zone Availability Clock & Booking Modal* (London, New York, Tokyo, Jakarta).
>   4. *Interactive Networking Topology Showcase & Terminal* yang mendemonstrasikan keahlian jaringan (BGP, SDN, DNS latency, packet routing) secara visual.

## 1. Overview & Core Concept

- **Apa yang Dibangun**: Platform web portofolio personal kelas enterprise yang memamerkan kapabilitas teknis end-to-end: Full-Stack Web Programming, UI/UX Design Systems, High-Performance Frontend, dan Enterprise Networking.
- **Target Audiens**: Pendiri startup internasional, CTO/Engineering Director, Enterprise Agency, dan klien global dari Amerika Utara, Eropa, Asia Timur, hingga Asia Tenggara.
- **Nilai Utama**: Membangun kepercayaan seketika melalui kecepatan muat instan (< 1s), visual Three.js 3D yang elegan, transparansi estimasi proyek interaktif, dan bukti kompetensi nyata dalam arsitektur sistem dan jaringan.

## 2. User Experience & Visual Design

- **Alur Pengguna (User Flow)**:
  1. *Hero Viewport*: Dibuka dengan kanvas Three.js gelombang partikel 3D monokromatik halus, tipografi editorial berukuran megah (*architectural display*), jam ketersediaan zona waktu dunia real-time, dan pemilih bahasa (EN/ID/JA).
  2. *Interactive Capability Matrix*: Demonstrasi 4 pilar utama (Web Programming, UI/UX, Networking, Frontend) dengan preview metrik performa (Lighthouse 100, Core Web Vitals, sub-millisecond network routing).
  3. *Interactive Networking Topology & Terminal*: Simulasi topologi jaringan interaktif (edge nodes, load balancers, database clusters) dengan console simulator untuk menguji latency dan packet trace.
  4. *Curated Case Studies (Bento Architecture)*: Galeri karya kurasi editorial dengan perbandingan sebelum/sesudah UI/UX, arsitektur kode, metrik konversi klien, dan modal inspeksi detail tanpa lag.
  5. *Global Project Estimator*: Alat kalkulasi interaktif bagi calon klien untuk merumuskan ruang lingkup (UI/UX, Full-stack app, Network Infrastructure), memilih timeline, dan mendapatkan estimasi anggaran dalam berbagai mata uang internasional.
  6. *Contact & Direct Inquiry*: Formulir konsultasi proyek terstruktur dengan opsi integrasi WhatsApp / Email instan dan kalender pemesanan jadwal temu.

- **Identitas Visual & Tema**:
  - *Aesthetic Direction*: Minimalist Luxury Editorial monokromatik—bersih, berwibawa, presisi tinggi layaknya publikasi desain kelas atas Swiss dan arsitektur modern.
  - *Palet Warna (60-30-10)*:
    - 60% Canvas Netral: Jet Black pekat (`#09090b`) dan Obsidian (`#050505`).
    - 30% Struktur & Permukaan: Zinc Gelap (`#18181b`), garis pemisah hairline halus (`rgba(255,255,255,0.08)`), dan tipografi abu-abu netral (`#a1a1aa`).
    - 10% Aksen Presisi: Platinum Putih Bersih (`#ffffff`) dengan aksen emerald lembut (`#10b981`) khusus untuk penanda status ketersediaan live.
  - *Tipografi*:
    - Display Headings: *Plus Jakarta Sans* / *Outfit* dengan bobot tebal dan tracking ketat (`tracking-tight`).
    - Body Text: *Manrope* / *DM Sans* untuk keterbacaan artikel dan penjelasan proyek.
    - Metrik & Data Numerik: Monospace tabular (`font-mono tabular-nums`) untuk jam dunia, estimasi biaya, dan data jaringan.
  - *Anti-Slop Discipline*: Bebas dari tombol pil dekoratif ganda, tanpa border tebal di sisi kiri, tanpa teks watermark pudar, dan tanpa status dot buatan yang tidak berfungsi.

- **Gerakan & Performa**:
  - Kanvas Three.js dioptimalkan menggunakan partikel instanced dan shader displacement terhitung, berjalan stabil pada 60 FPS.
  - Scroll smooth dengan animasi elemen berbasis transform dan opacity tanpa pergeseran layout.
  - Kontrol bottom-dock 3D yang dapat diminimalkan (Zen Mode) jika pengunjung ingin menikmati visual interaktif secara penuh.

## 3. Key Product Decisions & Trade-Offs

- **Keputusan 1: Zero External Assets untuk 3D & Ikon**
  - *Pendekatan*: Seluruh geometri gelombang partikel 3D dan topologi jaringan dibuat secara prosedural dalam Three.js; ikon antarmuka menggunakan Lucide React yang di-tree-shake.
  - *Alasan*: Menjamin 0% risiko broken 404 image atau model 3D lambat saat dibuka klien dari negara dengan latensi berbeda.
  - *Alternatif Ditolak*: Memuat file GLB/HDR eksternal dari server pihak ketiga yang rawan gagal muat.

- **Keputusan 2: Multi-Language Engine Client-Side yang Ringan**
  - *Pendekatan*: Kamus lokalisasi terstruktur (English, Bahasa Indonesia, Japanese) yang tersimpan langsung di memori aplikasi dengan state management React terpusat.
  - *Alasan*: Pergantian bahasa terjadi instan (0 ms latency) tanpa reload halaman atau bundle bloat.

- **Keputusan 3: Kalkulator Estimasi Biaya & Ruang Lingkup Proyek**
  - *Pendekatan*: Sistem kalkulator multi-tier dinamis yang memetakan jenis layanan, skala proyek, dan SLA kecepatan pengerjaan ke estimasi mata uang global (USD, EUR, IDR, JPY).
  - *Alasan*: Klien luar negeri mengutamakan kepastian budget dan profesionalitas sebelum inisiasi panggilan pertama.

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        APP ROOT (src/App.tsx)                          │
│   ├── LanguageProvider (State: 'en' | 'id' | 'ja')                     │
│   └── CurrencyProvider (State: 'USD' | 'EUR' | 'IDR' | 'JPY')           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    │                                                               │
┌───▼────────────────────────────────┐             ┌────────────────▼───────────────────┐
│     BACKGROUND 3D CANVAS LAYER     │             │       INTERACTIVE CONTENT LAYER    │
│  (Three.js Viewport / 60 FPS)      │             │  (Single-Page High-Speed Nav)      │
│  - Instanced Particle Wave Mesh    │             │  - TopBar Contract (Brand, Nav, CTA│
│  - Exponential Damped Camera       │             │  - Hero Split & Live World Clocks  │
│  - Mouse Parallax Tracking         │             │  - 4 Disciplines Bento Grid        │
│  - Zen Mode Dock Toggle            │             │  - Interactive Network Topology    │
└────────────────────────────────────┘             │  - Selected Works & Case Studies   │
                                                   │  - Dynamic Project Cost Estimator  │
                                                   │  - Global Inquiry & Contact Hub    │
                                                   └────────────────────────────────────┘
```

- **Komponen Utama**:
  - `HeroSection`: Typographic split headline, call-to-actions, dan live world timezone status strip.
  - `ThreeWaveCanvas`: Komponen Three.js terisolasi dalam `useRef` dengan lifecycle bersih, membersihkan memori saat unmount, dan tidak terganggu render cycle React.
  - `DisciplineMatrix`: 4 kartu kapabilitas (Web Programming, UI/UX, Networking, Frontend) dengan live interactive tabs dan tech stack badges.
  - `NetworkTopologyViewer`: Visualisasi interaktif graf node jaringan server global, routing packet demo, dan micro-terminal.
  - `ProjectEstimator`: Interactive slider and feature toggles dengan kalkulasi real-time biaya, durasi pengerjaan, dan output brief siap salin.
  - `CaseStudyModal`: Detail modal tanpa lag untuk membaca arsitektur dan dampak bisnis dari studi kasus pilihan.
  - `ContactSection`: Form kontak terstruktur dengan opsi direct pesan ke WhatsApp / Email dan tombol salin alamat email.
