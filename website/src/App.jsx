import React, { useState } from 'react';
import TerminalSimulator from './components/TerminalSimulator';

function App() {
  const [activeTab, setActiveTab] = useState('simulator');

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎬</div>
            <h1 className="text-xl font-bold gradient-text">Torrent Streamer</h1>
          </div>
          <a href="#download" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">
            Download
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Self-Hosted Torrent</span>
              <br />
              <span>Streaming Made Simple</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Add magnet links or .torrent files, stream media directly while downloading, and integrate with Plex or Jellyfin. All from your terminal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Stream torrents instantly with HTTP range requests' },
              { icon: '🔒', title: 'Private & Secure', desc: 'Everything runs on your own hardware, no cloud required' },
              { icon: '🎮', title: 'Easy Terminal UI', desc: 'Beautiful CLI with live progress and status updates' },
              { icon: '📺', title: 'Media Server Ready', desc: 'Integrate seamlessly with Plex and Jellyfin' },
              { icon: '🚀', title: 'Always-On Ready', desc: 'Run as a background service or LaunchAgent' },
              { icon: '📦', title: 'Zero Dependencies', desc: 'Standalone executable, no installation needed' },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Simulator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Try It Now</h3>
            <p className="text-gray-400 text-lg">Click any command to see how it works</p>
          </div>
          <TerminalSimulator />
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Installation</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Quick Start */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-cyan-400">Quick Start (30 seconds)</h4>
              <div className="space-y-4">
                <div className="code-block">
                  <p className="text-cyan-400 font-mono text-sm mb-2"># 1. Extract the ZIP</p>
                  <p className="text-gray-300 font-mono text-xs">unzip torrent-streamer-macos.zip</p>
                </div>
                <div className="code-block">
                  <p className="text-cyan-400 font-mono text-sm mb-2"># 2. Run installer</p>
                  <p className="text-gray-300 font-mono text-xs">cd torrent-streamer && ./install.sh</p>
                </div>
                <div className="code-block">
                  <p className="text-cyan-400 font-mono text-sm mb-2"># 3. Start the server</p>
                  <p className="text-gray-300 font-mono text-xs">torrent-streamer start</p>
                </div>
                <div className="code-block">
                  <p className="text-cyan-400 font-mono text-sm mb-2"># 4. Open dashboard</p>
                  <p className="text-gray-300 font-mono text-xs">http://localhost:8080</p>
                </div>
              </div>
            </div>

            {/* Common Commands */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-cyan-400">Common Commands</h4>
              <div className="space-y-3">
                {[
                  { cmd: 'torrent-streamer start', desc: 'Start in foreground with live output' },
                  { cmd: 'torrent-streamer start --background', desc: 'Run as background service' },
                  { cmd: 'torrent-streamer stop', desc: 'Stop the background service' },
                  { cmd: 'torrent-streamer status', desc: 'Check if running' },
                  { cmd: 'torrent-streamer logs', desc: 'View recent logs' },
                  { cmd: 'torrent-streamer help', desc: 'Show all commands' },
                ].map((item, idx) => (
                  <div key={idx} className="code-block">
                    <p className="text-cyan-400 font-mono text-xs mb-1">{item.cmd}</p>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Options Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Advanced Options</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Custom Port',
                cmd: 'PORT=3000 torrent-streamer start',
                desc: 'Run on a different port'
              },
              {
                title: 'With Authentication',
                cmd: 'torrent-streamer start --user admin --pass secure123',
                desc: 'Add username and password protection'
              },
              {
                title: 'Custom Download Directory',
                cmd: 'torrent-streamer start --dir /Volumes/ExternalDrive',
                desc: 'Store downloads on external drive'
              },
              {
                title: 'Always-On Service',
                cmd: 'launchctl load ~/.config/torrent-streamer/launch-agent.plist',
                desc: 'Auto-start on Mac boot'
              },
            ].map((option, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border border-slate-700 rounded-lg">
                <h4 className="text-lg font-bold text-cyan-400 mb-3">{option.title}</h4>
                <div className="code-block mb-3">
                  <p className="text-gray-300 font-mono text-xs">{option.cmd}</p>
                </div>
                <p className="text-gray-400 text-sm">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">What's Included</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">🎬 Torrent Engine</h4>
                <p className="text-gray-400">Node.js with WebTorrent for reliable torrent handling and streaming</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">🌐 Web Server</h4>
                <p className="text-gray-400">Express.js with JSON APIs and static frontend hosting</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">📡 HTTP Streaming</h4>
                <p className="text-gray-400">Range-request streaming for instant playback of media files</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">💾 Persistent Storage</h4>
                <p className="text-gray-400">Local storage in ~/.torrent-streamer with full state persistence</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">🎨 Beautiful UI</h4>
                <p className="text-gray-400">Terminal CLI with colored output, progress indicators, and status messages</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">🔧 Easy Configuration</h4>
                <p className="text-gray-400">Environment variables and command-line options for full customization</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">📦 Standalone Executable</h4>
                <p className="text-gray-400">Pre-built binaries for macOS (arm64 & x64) with no dependencies</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">🎯 Media Server Ready</h4>
                <p className="text-gray-400">Seamless integration with Plex and Jellyfin for your media library</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-6">
            {[
              {
                q: 'Do I need Node.js installed?',
                a: 'No! The macOS executable includes everything. Just download and run.'
              },
              {
                q: 'Is my data private?',
                a: 'Yes. Everything runs on your own hardware. No cloud, no tracking, no data sharing.'
              },
              {
                q: 'Can I use this with Plex or Jellyfin?',
                a: 'Absolutely! Point your media server to ~/.torrent-streamer/downloads and you\'re all set.'
              },
              {
                q: 'How do I keep it running 24/7?',
                a: 'Use the LaunchAgent setup (included) to auto-start on boot, or run with --background flag.'
              },
              {
                q: 'Can I access it remotely?',
                a: 'Yes, but secure it first with APP_USERNAME and APP_PASSWORD, then use a reverse proxy with HTTPS.'
              },
              {
                q: 'What formats can I stream?',
                a: 'MP4, WebM, MP3, M4A, Ogg, WAV, and more. Your browser determines support.'
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border border-slate-700 rounded-lg">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">{item.q}</h4>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600/20 via-transparent to-cyan-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl text-gray-400 mb-8">Download the terminal version and start streaming in seconds.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-lg transition-colors">
              Download for macOS
            </a>
            <a href="#" className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-bold text-lg transition-colors">
              View Documentation
            </a>
          </div>

          <p className="text-gray-500 text-sm">
            Available for macOS (Intel & Apple Silicon) • Docker • Linux • Always-on self-hosted
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-cyan-400 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Download</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-4">Documentation</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Integration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Issues</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Discussions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">License</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Torrent Streamer. Built with ❤️ for self-hosting enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
