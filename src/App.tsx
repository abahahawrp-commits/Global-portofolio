/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from './types';
import { ThreeBackground } from './components/ThreeBackground';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { DisciplineMatrix } from './components/DisciplineMatrix';
import { NetworkTopologyViewer } from './components/NetworkTopologyViewer';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [injectedScope, setInjectedScope] = useState<string>('');

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEstimator = () => {
    scrollToSection('estimator');
  };

  const handleExploreWork = () => {
    scrollToSection('works');
  };

  const handleExportScopeToContact = (scopeSummary: string) => {
    setInjectedScope(scopeSummary);
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-white selection:text-black">
      {/* 3D WebGL Three.js Particle Wave & Network Constellation Layer */}
      <ThreeBackground />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Conforming TopBar Contract */}
        <TopBar
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onOpenEstimator={handleOpenEstimator}
        />

        {/* Hero Section with Split Headline & World Clocks */}
        <HeroSection
          currentLang={currentLang}
          onExploreWork={handleExploreWork}
          onOpenEstimator={handleOpenEstimator}
        />

        {/* 4 Core Disciplines Matrix */}
        <DisciplineMatrix currentLang={currentLang} />

        {/* Interactive Global Network Topology & CLI Terminal */}
        <NetworkTopologyViewer currentLang={currentLang} />

        {/* Bento Grid Case Studies & Lightbox Modal */}
        <CaseStudiesSection currentLang={currentLang} />

        {/* Dynamic Global Project Cost & Timeline Estimator */}
        <ProjectEstimator
          currentLang={currentLang}
          onExportToContact={handleExportScopeToContact}
        />

        {/* Contact & Direct Inquiries */}
        <ContactSection
          currentLang={currentLang}
          injectedScope={injectedScope}
        />

        {/* Quiet Editorial Footer */}
        <Footer currentLang={currentLang} />
      </div>
    </div>
  );
}
