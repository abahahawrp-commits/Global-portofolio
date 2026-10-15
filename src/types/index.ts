export type Language = 'en' | 'id' | 'ja';

export type Currency = 'USD' | 'EUR' | 'IDR' | 'JPY';

export interface WorldClock {
  city: string;
  country: string;
  timezone: string;
  code: string;
}

export interface Discipline {
  id: 'web' | 'uiux' | 'networking' | 'frontend';
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  skills: string[];
  architectureFocus: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'Full-Stack' | 'UI/UX Design' | 'Networking' | 'Frontend Architecture';
  clientLocation: string;
  summary: string;
  year: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  technologies: string[];
  deliverables: string[];
}

export interface NetworkNode {
  id: string;
  name: string;
  location: string;
  type: 'edge' | 'core' | 'db' | 'gateway';
  status: 'active' | 'optimal';
  latency: number;
  connections: string[];
  x: number;
  y: number;
}

export interface EstimatorScope {
  id: string;
  title: string;
  category: 'web' | 'uiux' | 'networking' | 'frontend';
  baseHours: number;
  baseCostUSD: number;
  selected: boolean;
}
