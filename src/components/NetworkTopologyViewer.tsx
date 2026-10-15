import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, NetworkNode } from '../types';
import { translations } from '../data/translations';
import { NETWORK_NODES } from '../data/caseStudies';
import { Terminal, Activity, Radio, Play, Trash2, Send } from 'lucide-react';

interface NetworkTopologyViewerProps {
  currentLang: Language;
}

export const NetworkTopologyViewer: React.FC<NetworkTopologyViewerProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(NETWORK_NODES[0]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Anycast Edge Fabric v3.4.1 initialized.',
    '[BGP] 10 multi-region nodes synced with 0 packet loss.',
    '[READY] Click any topology node or execute commands below.',
  ]);
  const [cliInput, setCliInput] = useState('');

  const appendLog = (msg: string) => {
    setTerminalLogs((prev) => [...prev.slice(-30), msg]);
  };

  const handleRunPing = () => {
    const node = selectedNode || NETWORK_NODES[0];
    appendLog(`$ ping -c 3 ${node.id}.edge.global-fabric.net`);
    appendLog(`PING ${node.id} (${node.location}): 56 data bytes`);
    setTimeout(() => {
      appendLog(`64 bytes from ${node.id}: icmp_seq=1 ttl=58 time=${node.latency + 0.4} ms`);
    }, 150);
    setTimeout(() => {
      appendLog(`64 bytes from ${node.id}: icmp_seq=2 ttl=58 time=${node.latency - 0.2} ms`);
    }, 300);
    setTimeout(() => {
      appendLog(`--- ${node.id} statistics --- 2 packets transmitted, 0.0% packet loss, min/avg/max = ${node.latency - 0.2}/${node.latency}/${node.latency + 0.4} ms`);
    }, 450);
  };

  const handleRunTrace = () => {
    const node = selectedNode || NETWORK_NODES[0];
    appendLog(`$ traceroute -m 4 ${node.id}.edge.global-fabric.net`);
    appendLog(`traceroute to ${node.name} (${node.location}), 4 hops max`);
    setTimeout(() => {
      appendLog(` 1  edge-gateway.core.net (10.0.0.1)  1.204 ms  0.982 ms`);
    }, 150);
    setTimeout(() => {
      appendLog(` 2  transit-backbone.as13335.net (172.69.0.1)  6.419 ms  5.890 ms`);
    }, 300);
    setTimeout(() => {
      appendLog(` 3  ${node.id}.fabric-mesh.net (198.51.100.24)  ${node.latency} ms [OK]`);
    }, 450);
  };

  const handleRunCurl = () => {
    const node = selectedNode || NETWORK_NODES[0];
    appendLog(`$ curl -I https://${node.id}.edge.global-fabric.net/healthz`);
    setTimeout(() => {
      appendLog(`HTTP/2 200 OK`);
      appendLog(`server: envoy-proxy/1.30.1`);
      appendLog(`x-edge-region: ${node.location}`);
      appendLog(`x-response-time: ${node.latency}ms`);
      appendLog(`strict-transport-security: max-age=31536000; includeSubDomains`);
    }, 200);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    appendLog(`$ ${cmd}`);
    setCliInput('');

    const lower = cmd.toLowerCase();
    if (lower === 'help') {
      appendLog('Available commands: ping, traceroute, curl, status, nodes, clear');
    } else if (lower === 'clear') {
      setTerminalLogs([]);
    } else if (lower === 'status') {
      appendLog('System SLA: 99.999% | Active BGP Peers: 24 | Global Traffic: Optimal');
    } else if (lower === 'nodes') {
      NETWORK_NODES.forEach((n) => {
        appendLog(`[${n.id.toUpperCase()}] ${n.name} (${n.location}) - Latency: ${n.latency}ms`);
      });
    } else if (lower.startsWith('ping')) {
      handleRunPing();
    } else if (lower.startsWith('traceroute') || lower.startsWith('trace')) {
      handleRunTrace();
    } else if (lower.startsWith('curl')) {
      handleRunCurl();
    } else {
      appendLog(`Command not recognized: "${cmd}". Type "help" for a list of commands.`);
    }
  };

  return (
    <section id="network" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
      {/* Section Header with Scroll Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mb-12"
      >
        <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3">
          {t.network.kicker}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {t.network.title}
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed">
          {t.network.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Interactive Topology Map Canvas (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-6">
              <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-2">
                <Activity className="w-4 h-4 text-zinc-300" />
                <span>GLOBAL PACKET TOPOLOGY SIMULATION</span>
              </span>
              <span className="text-xs font-mono text-zinc-400">10 ACTIVE NODES</span>
            </div>

            {/* Visual Node Graph Canvas */}
            <div className="relative w-full h-80 bg-zinc-950/90 rounded-xl border border-zinc-800/80 p-4 overflow-hidden select-none">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

              {/* Connections SVG lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {NETWORK_NODES.map((node) =>
                  node.connections.map((targetId) => {
                    const target = NETWORK_NODES.find((n) => n.id === targetId);
                    if (!target) return null;
                    return (
                      <line
                        key={`${node.id}-${target.id}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${target.x}%`}
                        y2={`${target.y}%`}
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    );
                  })
                )}
              </svg>

              {/* Interactive Node Anchors */}
              {NETWORK_NODES.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl transition-all cursor-pointer flex flex-col items-center group z-10 ${
                      isSelected
                        ? 'bg-zinc-100 text-zinc-950 shadow-md scale-110'
                        : 'bg-zinc-900/90 text-zinc-300 border border-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Radio className={`w-3.5 h-3.5 ${isSelected ? 'text-zinc-950' : 'text-zinc-400'}`} />
                      <span className="text-[11px] font-mono font-bold whitespace-nowrap">
                        {node.id.toUpperCase()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node Inspector Telemetry Strip */}
          <div className="mt-6 pt-5 border-t border-zinc-800">
            {selectedNode ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-zinc-950/70 border border-zinc-800 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{t.network.region}</div>
                  <div className="font-semibold text-white mt-0.5 truncate">{selectedNode.location}</div>
                </div>
                <div className="p-2.5 bg-zinc-950/70 border border-zinc-800 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{t.network.type}</div>
                  <div className="font-semibold text-white mt-0.5 uppercase font-mono">{selectedNode.type}</div>
                </div>
                <div className="p-2.5 bg-zinc-950/70 border border-zinc-800 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{t.network.latency}</div>
                  <div className="font-bold text-white mt-0.5 font-mono tabular-nums">{selectedNode.latency} ms</div>
                </div>
                <div className="p-2.5 bg-zinc-950/70 border border-zinc-800 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{t.network.status}</div>
                  <div className="font-semibold text-emerald-400 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span>OPTIMAL</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-zinc-500 font-mono text-center py-2">
                {t.network.selectNodePrompt}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Side: Interactive CLI Diagnostic Terminal (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <span className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-300" />
                <span>DIAGNOSTIC CONSOLE</span>
              </span>
              <button
                onClick={() => setTerminalLogs([])}
                className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 cursor-pointer"
                title="Clear terminal"
              >
                <Trash2 className="w-3 h-3" />
                <span>CLEAR</span>
              </button>
            </div>

            {/* Quick Action Shortcut Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={handleRunPing}
                className="px-2.5 py-1 text-xs font-mono bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 text-zinc-400" />
                <span>{t.network.runPing}</span>
              </button>
              <button
                onClick={handleRunTrace}
                className="px-2.5 py-1 text-xs font-mono bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                {t.network.runTrace}
              </button>
              <button
                onClick={handleRunCurl}
                className="px-2.5 py-1 text-xs font-mono bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                {t.network.runCurl}
              </button>
            </div>

            {/* Terminal Output Area */}
            <div className="w-full h-64 bg-black/60 rounded-xl p-3.5 border border-zinc-900 font-mono text-xs overflow-y-auto space-y-1.5 text-zinc-300">
              {terminalLogs.map((log, index) => (
                <div
                  key={index}
                  className={
                    log.startsWith('$')
                      ? 'text-white font-semibold'
                      : log.includes('200 OK') || log.includes('OPTIMAL')
                      ? 'text-emerald-400'
                      : 'text-zinc-400'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* CLI Input Form */}
          <form onSubmit={handleCommandSubmit} className="mt-4 flex items-center gap-2">
            <span className="text-zinc-500 font-mono text-xs">$</span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="type ping, trace, status, or help..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
            />
            <button
              type="submit"
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors cursor-pointer"
              title="Execute"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
