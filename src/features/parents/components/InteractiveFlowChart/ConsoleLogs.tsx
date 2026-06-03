import React, { useState, useEffect, useRef } from 'react';

interface LogItem {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info';
  timestamp: string;
  message: string;
}

export const ConsoleLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'log' | 'warn' | 'error'>('all');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    const addLog = (type: 'log' | 'warn' | 'error' | 'info', args: unknown[]) => {
      const msg = args.map(arg => {
        if (arg instanceof Error) return arg.stack || arg.message;
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return '[Object]';
          }
        }
        return String(arg);
      }).join(' ');

      const newLog: LogItem = {
        id: String(Date.now()) + Math.random(),
        type,
        timestamp: new Date().toLocaleTimeString(),
        message: msg
      };
      setLogs(prev => [...prev.slice(-99), newLog]);
    };

    console.log = (...args) => {
      originalLog(...args);
      addLog('log', args);
    };
    console.warn = (...args) => {
      originalWarn(...args);
      addLog('warn', args);
    };
    console.error = (...args) => {
      originalError(...args);
      addLog('error', args);
    };
    console.info = (...args) => {
      originalInfo(...args);
      addLog('info', args);
    };

    // Add initial system logs
    addLog('info', ['Terminal virtuel KidPedia activé. En attente des événements...']);

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.info = originalInfo;
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  const getLogColor = (type: string) => {
    switch (type) {
      case 'error': return '#f87171'; // red
      case 'warn': return '#fbbf24'; // yellow
      case 'info': return '#60a5fa'; // blue
      default: return '#34d399'; // green
    }
  };

  return (
    <div style={{
      background: '#09090d',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      padding: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
      fontSize: '0.85rem',
      display: 'flex',
      flexDirection: 'column',
      height: '500px'
    }}>
      {/* Console Header / Filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '12px',
        marginBottom: '12px',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'log', 'warn', 'error'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: filter === f ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                color: filter === f ? '#fff' : '#9ca3af',
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {f === 'all' ? 'Tous' : f + 's'}
            </button>
          ))}
        </div>

        <button
          onClick={() => setLogs([])}
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#fca5a5',
            padding: '4px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
        >
          🗑️ Effacer
        </button>
      </div>

      {/* Terminal Output Logs */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        paddingRight: '6px'
      }}>
        {filteredLogs.map(log => (
          <div key={log.id} style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            borderBottom: '1px solid rgba(255,255,255,0.02)',
            paddingBottom: '4px'
          }}>
            <span style={{ color: '#6b7280', flexShrink: 0 }}>[{log.timestamp}]</span>
            <span style={{
              color: getLogColor(log.type),
              fontWeight: 'bold',
              flexShrink: 0,
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              padding: '1px 4px',
              borderRadius: '3px',
              background: 'rgba(255,255,255,0.03)'
            }}>
              {log.type}
            </span>
            <span style={{ color: log.type === 'error' ? '#fca5a5' : '#e5e7eb' }}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
export default ConsoleLogs;
