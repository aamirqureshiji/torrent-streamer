import React, { useState, useEffect } from 'react';

const TerminalSimulator = () => {
  const [lines, setLines] = useState([
    { type: 'prompt', text: '$ torrent-streamer start' }
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const commands = {
    'start': {
      delay: 500,
      output: [
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '  🎬 Torrent Streamer' },
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '' },
        { type: 'info', text: 'ℹ Starting Torrent Streamer...' },
        { type: 'output', text: '' },
        { type: 'info', text: 'ℹ Dashboard: http://localhost:8080' },
        { type: 'info', text: 'ℹ Downloads: /Users/yourname/.torrent-streamer/downloads' },
        { type: 'output', text: '' },
        { type: 'info', text: 'ℹ Press Ctrl+C to stop the server' },
        { type: 'output', text: '' },
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Torrent streamer listening at http://0.0.0.0:8080' },
        { type: 'output', text: 'Downloads: /Users/yourname/.torrent-streamer/downloads' },
      ]
    },
    'status': {
      delay: 300,
      output: [
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '  🎬 Torrent Streamer' },
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '' },
        { type: 'success', text: '✓ Running (PID: 12345)' },
        { type: 'output', text: '' },
        { type: 'info', text: 'ℹ Dashboard: http://localhost:8080' },
        { type: 'info', text: 'ℹ Data directory: /Users/yourname/.torrent-streamer' },
        { type: 'output', text: '' },
      ]
    },
    'help': {
      delay: 200,
      output: [
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '  🎬 Torrent Streamer' },
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Commands:' },
        { type: 'output', text: '  start [options]     Start the Torrent Streamer' },
        { type: 'output', text: '  stop                Stop the running Torrent Streamer' },
        { type: 'output', text: '  status              Show the status of Torrent Streamer' },
        { type: 'output', text: '  logs                Show recent logs' },
        { type: 'output', text: '  open                Open the dashboard in your browser' },
        { type: 'output', text: '  data                Show data directory location' },
        { type: 'output', text: '  install             Install as a global command' },
        { type: 'output', text: '  help                Show this help message' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Start options:' },
        { type: 'output', text: '  --port PORT         Set custom port (default: 8080)' },
        { type: 'output', text: '  --user USERNAME     Set username for authentication' },
        { type: 'output', text: '  --pass PASSWORD     Set password for authentication' },
        { type: 'output', text: '  --background        Run in background' },
        { type: 'output', text: '' },
      ]
    },
    'install': {
      delay: 400,
      output: [
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '  🎬 Torrent Streamer - Installation' },
        { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'output', text: '' },
        { type: 'info', text: 'ℹ Installing Torrent Streamer...' },
        { type: 'output', text: '' },
        { type: 'info', text: 'ℹ Making CLI executable...' },
        { type: 'success', text: '✓ CLI is executable' },
        { type: 'info', text: 'ℹ Creating global command...' },
        { type: 'success', text: '✓ Global command installed at /usr/local/bin/torrent-streamer' },
        { type: 'info', text: 'ℹ Creating data directory...' },
        { type: 'success', text: '✓ Data directory created at /Users/yourname/.torrent-streamer' },
        { type: 'output', text: '' },
        { type: 'success', text: '✓ Installation complete!' },
        { type: 'output', text: '' },
      ]
    },
  };

  const executeCommand = (cmdName) => {
    if (isRunning) return;

    setIsRunning(true);
    const cmd = commands[cmdName];
    
    if (!cmd) {
      setLines(prev => [...prev, { type: 'error', text: `Command not found: ${cmdName}` }, { type: 'prompt', text: '$ ' }]);
      setIsRunning(false);
      return;
    }

    const outputLines = [...cmd.output];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < outputLines.length) {
        setLines(prev => [...prev, outputLines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setLines(prev => [...prev, { type: 'prompt', text: '$ ' }]);
        setIsRunning(false);
      }
    }, cmd.delay);
  };

  const getLineColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'info':
        return 'text-cyan-400';
      case 'prompt':
        return 'text-cyan-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Terminal Display */}
      <div className="code-block bg-slate-900 border border-cyan-500/30 rounded-lg p-6 min-h-96 max-h-96 overflow-y-auto">
        <div className="terminal-text space-y-1">
          {lines.map((line, idx) => (
            <div key={idx} className={getLineColor(line.type)}>
              {line.text}
            </div>
          ))}
          {isRunning && <span className="terminal-cursor" />}
        </div>
      </div>

      {/* Command Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.keys(commands).map(cmd => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            disabled={isRunning}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Command Examples */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="code-block">
          <p className="text-cyan-400 font-mono text-sm mb-2">Custom port:</p>
          <p className="text-gray-300 font-mono text-xs">torrent-streamer start --port 3000</p>
        </div>
        <div className="code-block">
          <p className="text-cyan-400 font-mono text-sm mb-2">With authentication:</p>
          <p className="text-gray-300 font-mono text-xs">torrent-streamer start --user admin --pass secure</p>
        </div>
        <div className="code-block">
          <p className="text-cyan-400 font-mono text-sm mb-2">Background mode:</p>
          <p className="text-gray-300 font-mono text-xs">torrent-streamer start --background</p>
        </div>
        <div className="code-block">
          <p className="text-cyan-400 font-mono text-sm mb-2">Custom directory:</p>
          <p className="text-gray-300 font-mono text-xs">torrent-streamer start --dir /Volumes/External</p>
        </div>
      </div>
    </div>
  );
};

export default TerminalSimulator;
