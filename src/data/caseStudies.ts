import { CaseStudy, Discipline, NetworkNode, WorldClock, EstimatorScope } from '../types';

export const WORLD_CLOCKS: WorldClock[] = [
  { city: 'London', country: 'United Kingdom', timezone: 'Europe/London', code: 'LON' },
  { city: 'New York', country: 'United States', timezone: 'America/New_York', code: 'NYC' },
  { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', code: 'TYO' },
  { city: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', code: 'JKT' },
];

export const DISCIPLINES_DATA: Discipline[] = [
  {
    id: 'web',
    title: 'Full-Stack Web Programming',
    subtitle: 'Distributed Systems & High-Load APIs',
    description:
      'Architecting fault-tolerant microservices, resilient database schemas, and high-throughput real-time APIs with strict idempotency and sub-50ms latency SLAs.',
    metrics: [
      { label: 'Max Throughput', value: '45,000 req/s' },
      { label: 'API P99 Latency', value: '28 ms' },
      { label: 'Data Ingestion', value: '1.2 TB / day' },
    ],
    skills: ['Node.js & Go', 'PostgreSQL & Redis', 'GraphQL / REST', 'Event Driven (Kafka/RabbitMQ)', 'Docker & Cloud Orchestration'],
    architectureFocus: 'ACID transactional integrity, horizontal pod autoscaling, rate-limiting algorithms, and zero-downtime database migrations.',
  },
  {
    id: 'uiux',
    title: 'UI/UX & Product Design',
    subtitle: 'Enterprise Design Systems & Behavioral Ergonomics',
    description:
      'Translating intricate technical data workflows into effortless, intuitive human interfaces with rigorous token systems and accessible WCAG AAA contrast ratios.',
    metrics: [
      { label: 'Avg Task Efficiency', value: '+68%' },
      { label: 'System Adoption', value: '94% Org-Wide' },
      { label: 'Design Tokens', value: '400+ Standardized' },
    ],
    skills: ['Figma Design Systems', 'Cognitive Workflow Mapping', 'Interactive Prototyping', 'WCAG AAA Accessibility', 'Design-to-Code Pipelines'],
    architectureFocus: 'Atomic design tokens, spatial rhythmic math, micro-interaction state machines, and context-preserving modal architectures.',
  },
  {
    id: 'networking',
    title: 'Computer Networking & Cloud Edge',
    subtitle: 'Low-Latency Routing, SDN & Zero Trust Security',
    description:
      'Designing robust global networking topologies, anycast DNS, automated BGP failover, multi-region VPC interconnects, and strict zero-trust boundary segmentation.',
    metrics: [
      { label: 'Uptime SLA', value: '99.999%' },
      { label: 'Packet Drop Rate', value: '< 0.001%' },
      { label: 'DDoS Mitigation', value: '400 Gbps Peak' },
    ],
    skills: ['BGP & Anycast Routing', 'Software-Defined Networking (SDN)', 'WireGuard & Zero Trust', 'TCP/UDP Kernel Tuning', 'Cloudflare Workers / Edge CDN'],
    architectureFocus: 'BGP path optimization, geo-DNS routing, TLS 1.3 session resumption, MTU tuning, and automated DDoS failover rings.',
  },
  {
    id: 'frontend',
    title: 'High-Performance Frontend',
    subtitle: 'Vite/React, WebGL 3D & 60 FPS Compositor Loops',
    description:
      'Engineering cinematic web experiences that maintain 60 FPS under intensive graphics loads, achieving 100/100 Core Web Vitals across all global mobile viewports.',
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'First Contentful Paint', value: '0.4s' },
      { label: 'Frame Budget', value: '16.6ms Flat' },
    ],
    skills: ['React 19 & TypeScript', 'Three.js / WebGL / Shaders', 'Tailwind CSS Compositor', 'State Optimization (Zustand/Signals)', 'Offscreen Canvas & Workers'],
    architectureFocus: 'Hardware-accelerated CSS compositor layers, zero-reflow layout math, shader vertex displacement, and pre-warmed GPU pipelines.',
  },
];

export const NETWORK_NODES: NetworkNode[] = [
  { id: 'sfo-1', name: 'Silicon Valley Transit', location: 'San Francisco (US)', type: 'core', status: 'optimal', latency: 45, connections: ['nyc-1', 'tyo-1'], x: 15, y: 35 },
  { id: 'nyc-1', name: 'New York Anycast Node', location: 'New York (US)', type: 'edge', status: 'optimal', latency: 32, connections: ['lon-1', 'sfo-1', 'db-us'], x: 26, y: 55 },
  { id: 'db-us', name: 'US-East Replica Shard', location: 'Virginia (US)', type: 'db', status: 'optimal', latency: 35, connections: ['nyc-1'], x: 30, y: 75 },

  { id: 'lon-1', name: 'London Edge Gateway', location: 'London (UK)', type: 'gateway', status: 'optimal', latency: 14, connections: ['nyc-1', 'fra-1'], x: 46, y: 28 },
  { id: 'fra-1', name: 'Frankfurt Core Router', location: 'Frankfurt (DE)', type: 'core', status: 'optimal', latency: 18, connections: ['lon-1', 'sin-1', 'db-eu'], x: 55, y: 45 },
  { id: 'db-eu', name: 'EU Primary Cluster', location: 'Zurich (CH)', type: 'db', status: 'optimal', latency: 20, connections: ['fra-1'], x: 50, y: 72 },

  { id: 'tyo-1', name: 'Tokyo Edge Cluster', location: 'Tokyo (JP)', type: 'edge', status: 'optimal', latency: 22, connections: ['sfo-1', 'sin-1'], x: 84, y: 30 },
  { id: 'sin-1', name: 'Singapore Regional Hub', location: 'Singapore (SG)', type: 'gateway', status: 'optimal', latency: 29, connections: ['fra-1', 'tyo-1', 'jkt-1'], x: 73, y: 52 },
  { id: 'jkt-1', name: 'Jakarta Ingress Node', location: 'Jakarta (ID)', type: 'edge', status: 'optimal', latency: 12, connections: ['sin-1', 'db-ap'], x: 85, y: 65 },
  { id: 'db-ap', name: 'AP Primary Cluster', location: 'Jakarta DC-2 (ID)', type: 'db', status: 'optimal', latency: 15, connections: ['jkt-1'], x: 74, y: 80 },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'pulse-distributed-cloud',
    title: 'Pulse Global Edge: Multi-Region Distributed API & Topology',
    category: 'Networking',
    clientLocation: 'San Francisco & London',
    summary: 'Architected a multi-region low-latency edge distribution pipeline reducing international p95 latency from 320ms to 42ms.',
    year: '2025',
    featured: true,
    metrics: [
      { label: 'Latency Drop', value: '-87%' },
      { label: 'Throughput', value: '80K req/s' },
      { label: 'Global Uptime', value: '99.999%' },
    ],
    problem:
      'An enterprise fintech platform suffered severe latency timeouts and packet drop when users in Asia Pacific and Europe queried centralized data clusters hosted solely in US-East.',
    solution:
      'Implemented an Anycast BGP routing layer combined with Cloudflare Edge Workers and geo-replicated read caches. Engineered automated health checking with dynamic failover within 400 milliseconds of packet anomaly detection.',
    technologies: ['BGP Routing', 'Go', 'Redis Cluster', 'Terraform', 'WireGuard Zero-Trust Mesh', 'Prometheus'],
    deliverables: [
      'Multi-region VPC interconnect infrastructure',
      'Automated health check daemon with sub-second failover',
      'Real-time network telemetry dashboard',
    ],
  },
  {
    id: 'aeroflux-design-system',
    title: 'AeroFlux: High-Density Enterprise UI/UX Design System',
    category: 'UI/UX Design',
    clientLocation: 'Zurich, Switzerland',
    summary: 'End-to-end design system and ergonomics overhaul for an industrial automation monitoring console used across 14 European factories.',
    year: '2025',
    featured: true,
    metrics: [
      { label: 'Operator Errors', value: '-62%' },
      { label: 'Component Reusability', value: '98%' },
      { label: 'WCAG Score', value: 'AAA Compliant' },
    ],
    problem:
      'Factory engineers struggled with fragmented legacy dashboards containing inconsistent typography, low-contrast alerts, and cumbersome nested navigation that led to critical operational delays.',
    solution:
      'Conducted extensive user task analysis to craft AeroFlux: a high-contrast dark mode design system with standardized color tokens, instant tactile state machines, and a unified one-key command palette.',
    technologies: ['Figma Tokens', 'Radix Primitives', 'Tailwind CSS', 'Storybook', 'WCAG AAA Validation'],
    deliverables: [
      'Comprehensive 420-token Figma Library and Component Guidelines',
      'Production-ready React UI component kit with zero layout shifts',
      'Ergonomic testing matrix and keyboard navigation shortcuts',
    ],
  },
  {
    id: 'krypton-3d-experience',
    title: 'Krypton Spatial: 60 FPS Three.js Interactive Web Experience',
    category: 'Frontend Architecture',
    clientLocation: 'Tokyo, Japan',
    summary: 'Cinematic 3D WebGL portal engineered for an electric vehicle showcase, maintaining stable 60 FPS on mobile and low-power hardware.',
    year: '2024',
    featured: true,
    metrics: [
      { label: 'Render Loop', value: '60 FPS Fixed' },
      { label: 'First Load', value: '0.8s' },
      { label: 'Bounce Rate', value: '-38%' },
    ],
    problem:
      'Previous agency attempt generated heavy 120MB uncompressed assets that crashed iOS Safari and exhibited severe stuttering on scroll.',
    solution:
      'Re-engineered the rendering engine from scratch using procedural Three.js buffers, instanced shaders, and exponential camera damping, reducing download weight by 94% with zero loss in visual realism.',
    technologies: ['Three.js', 'React 19', 'Custom GLSL Shaders', 'Web Workers', 'Draco Compression'],
    deliverables: [
      'Procedural particle wave and model engine',
      'Zero-jank scroll parallax orchestration',
      'Offline asset caching and pre-warming pipeline',
    ],
  },
  {
    id: 'vortex-realtime-engine',
    title: 'Vortex: Real-Time B2B Trading & Telemetry Engine',
    category: 'Full-Stack',
    clientLocation: 'Singapore',
    summary: 'High-concurrency full-stack auction and order book platform processing over $14M in daily commodities volume.',
    year: '2024',
    featured: false,
    metrics: [
      { label: 'Order Execution', value: '< 8ms' },
      { label: 'Concurrent Sockets', value: '120,000' },
      { label: 'Zero-Loss Guarantee', value: '100%' },
    ],
    problem:
      'High-frequency websocket order broadcasts clogged database transactions and led to out-of-order execution states during peak market opening hours.',
    solution:
      'Constructed a dual-ring in-memory queue in Go and Node.js with distributed Redis pub/sub and PostgreSQL append-only audit ledgers, backed by strict client-side optimistic UI updates.',
    technologies: ['Node.js & Go', 'PostgreSQL', 'Redis Streams', 'WebSockets', 'React', 'Docker'],
    deliverables: [
      'High-throughput WebSocket order matching gateway',
      'Audited transaction ledger with cryptographic hashing',
      'Real-time streaming charts and responsive order book UI',
    ],
  },
];

export const ESTIMATOR_SERVICES: EstimatorScope[] = [
  { id: 'web-api', title: 'High-Concurrency Full-Stack Web App & API', category: 'web', baseHours: 70, baseCostUSD: 4200, selected: true },
  { id: 'uiux-system', title: 'Comprehensive UI/UX Product Design & Tokens', category: 'uiux', baseHours: 45, baseCostUSD: 2800, selected: true },
  { id: 'frontend-spa', title: 'Luxury 60 FPS Frontend (React + WebGL 3D)', category: 'frontend', baseHours: 50, baseCostUSD: 3200, selected: true },
  { id: 'network-infra', title: 'Cloud Network Architecture & Edge CDN Routing', category: 'networking', baseHours: 35, baseCostUSD: 2400, selected: false },
  { id: 'perf-audit', title: 'Core Web Vitals & Latency Performance Tuning', category: 'frontend', baseHours: 20, baseCostUSD: 1400, selected: false },
  { id: 'security-audit', title: 'Zero-Trust Network Hardening & DDoS Mitigation', category: 'networking', baseHours: 25, baseCostUSD: 1800, selected: false },
];

export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, format: (val: number) => `$${val.toLocaleString()}` },
  EUR: { symbol: '€', rate: 0.92, format: (val: number) => `€${Math.round(val * 0.92).toLocaleString()}` },
  IDR: { symbol: 'Rp', rate: 15800, format: (val: number) => `Rp ${(Math.round(val * 15800 / 100000) * 100000).toLocaleString('id-ID')}` },
  JPY: { symbol: '¥', rate: 152, format: (val: number) => `¥${Math.round(val * 152).toLocaleString()}` },
};
