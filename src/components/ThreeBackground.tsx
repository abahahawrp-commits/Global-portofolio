import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Sparkles, Sliders } from 'lucide-react';

interface ThreeBackgroundProps {
  intensity?: number;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ intensity = 1 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isZenMode, setIsZenMode] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [waveAmplitude, setWaveAmplitude] = useState(1.2);
  const [isDockOpen, setIsDockOpen] = useState(false);

  // Mutable refs for high performance 60fps loop without React re-renders
  const stateRef = useRef({
    speed: 1,
    amplitude: 1.2,
    targetMouseX: 0,
    targetMouseY: 0,
    currentMouseX: 0,
    currentMouseY: 0,
    scrollY: 0,
  });

  useEffect(() => {
    stateRef.current.speed = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    stateRef.current.amplitude = waveAmplitude;
  }, [waveAmplitude]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Pre-allocated math structures outside render loop (Zero GC)
    const _pos = new THREE.Vector3();

    // Scene & Camera setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.015);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 36);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    container.appendChild(renderer.domElement);

    // Grid Dimensions
    const cols = 90;
    const rows = 90;
    const count = cols * rows;
    const spacing = 0.9;

    // BufferGeometry for Particle Wave
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacing;
        const z = (j - rows / 2) * spacing;
        const y = 0;

        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        initialPositions[idx] = x;
        initialPositions[idx + 1] = y;
        initialPositions[idx + 2] = z;

        // Monochrome subtle gradient: lighter white near center, deep slate near borders
        const distFromCenter = Math.sqrt(x * x + z * z);
        const factor = Math.max(0.15, 1 - distFromCenter / 45);
        colors[idx] = factor * 0.9;
        colors[idx + 1] = factor * 0.92;
        colors[idx + 2] = factor * 0.98;

        idx += 3;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Texture for sharp round particles without external assets
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(230, 235, 245, 0.7)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);
    particleTexture.colorSpace = THREE.SRGBColorSpace;

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pointsMaterial);
    scene.add(particles);

    // Architectural Constellation Lines Group
    const constellationCount = 35;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(constellationCount * 2 * 3);
    const lineColors = new Float32Array(constellationCount * 2 * 3);

    for (let l = 0; l < constellationCount * 2 * 3; l += 6) {
      const x1 = (Math.random() - 0.5) * 50;
      const y1 = Math.random() * 5 + 1;
      const z1 = (Math.random() - 0.5) * 50;
      const x2 = x1 + (Math.random() - 0.5) * 8;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 8;

      linePositions[l] = x1;
      linePositions[l + 1] = y1;
      linePositions[l + 2] = z1;
      linePositions[l + 3] = x2;
      linePositions[l + 4] = y2;
      linePositions[l + 5] = z2;

      lineColors[l] = 0.5;
      lineColors[l + 1] = 0.55;
      lineColors[l + 2] = 0.65;
      lineColors[l + 3] = 0.2;
      lineColors[l + 4] = 0.25;
      lineColors[l + 5] = 0.35;
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const constellation = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(constellation);

    // Smooth listeners
    const onPointerMove = (e: MouseEvent) => {
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 8;
      stateRef.current.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 5;
    };

    const onScroll = () => {
      stateRef.current.scrollY = window.scrollY;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Lossless 60 FPS Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime() * stateRef.current.speed * 0.8;
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;
      const amp = stateRef.current.amplitude;

      // Exponential Damping for Camera Tracking
      stateRef.current.currentMouseX +=
        (stateRef.current.targetMouseX - stateRef.current.currentMouseX) *
        (1 - Math.exp(-4 * dt));
      stateRef.current.currentMouseY +=
        (stateRef.current.targetMouseY - stateRef.current.currentMouseY) *
        (1 - Math.exp(-4 * dt));

      // Scroll influences camera height and tilt slightly
      const scrollOffset = stateRef.current.scrollY * 0.008;

      camera.position.x = stateRef.current.currentMouseX;
      camera.position.y = 15 - stateRef.current.currentMouseY * 0.5 + scrollOffset * 0.3;
      camera.position.z = 36 - scrollOffset * 0.5;
      camera.lookAt(0, 0, -5);

      // Displace particle wave along double sine frequencies
      let pIdx = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = initialPositions[pIdx];
          const z = initialPositions[pIdx + 2];

          // Complex dual-frequency harmonic wave
          const wave1 = Math.sin(x * 0.18 + time) * Math.cos(z * 0.18 + time * 0.8);
          const wave2 = Math.sin(Math.sqrt(x * x + z * z) * 0.15 - time * 1.2);
          const y = (wave1 * 1.8 + wave2 * 1.1) * amp;

          posArray[pIdx + 1] = y;
          pIdx += 3;
        }
      }
      posAttr.needsUpdate = true;

      // Gentle rotation on constellation
      constellation.rotation.y = time * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      geometry.dispose();
      pointsMaterial.dispose();
      particleTexture.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Vignette Gradient for Luxury Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-transparent to-[#09090b] pointer-events-none" />

      {/* Viewport Ergonomics: Compact Collapsible Bottom Dock (Zen Mode) */}
      <div className="pointer-events-auto fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <div className="flex flex-col items-center">
          {/* Dock Toggle Tab */}
          <button
            onClick={() => setIsDockOpen(!isDockOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-zinc-400 bg-zinc-900/95 border border-zinc-800 rounded-t-lg hover:text-white transition-colors"
            title="Toggle 3D Scene Controls"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>3D Ambient Engine</span>
            <span className="text-[10px] text-zinc-400 font-mono">
              {isDockOpen ? '▼' : '▲'}
            </span>
          </button>

          {/* Collapsible Panel with solid/rgba surfaces (no backdrop-filter over WebGL canvas) */}
          {isDockOpen && (
            <div className="flex items-center gap-5 px-5 py-3 bg-zinc-900/95 border border-zinc-800 rounded-b-lg rounded-tl-lg shadow-2xl text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-mono text-[11px]">SPEED</span>
                <button
                  onClick={() => setSpeedMultiplier(0.5)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    speedMultiplier === 0.5 ? 'bg-zinc-100 text-zinc-950 font-semibold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  0.5x
                </button>
                <button
                  onClick={() => setSpeedMultiplier(1)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    speedMultiplier === 1 ? 'bg-zinc-100 text-zinc-950 font-semibold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  1.0x
                </button>
                <button
                  onClick={() => setSpeedMultiplier(1.8)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    speedMultiplier === 1.8 ? 'bg-zinc-100 text-zinc-950 font-semibold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  1.8x
                </button>
              </div>

              <div className="h-4 w-[1px] bg-zinc-800" />

              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-mono text-[11px]">WAVE</span>
                <input
                  type="range"
                  min="0.4"
                  max="2.2"
                  step="0.2"
                  value={waveAmplitude}
                  onChange={(e) => setWaveAmplitude(parseFloat(e.target.value))}
                  className="w-20 accent-zinc-100 cursor-pointer"
                />
              </div>

              <div className="h-4 w-[1px] bg-zinc-800" />

              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span>60 FPS WebGL</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
