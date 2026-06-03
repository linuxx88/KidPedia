import React, { useState, useEffect } from 'react';

interface Commit {
  hash: string;
  author: string;
  date: string;
  subject: string;
}

interface GitData {
  branch: string;
  status: string;
  commits: Commit[];
}

export const GitTimeline: React.FC = () => {
  const [data, setData] = useState<GitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitData = async () => {
    try {
      const res = await fetch('/api/git');
      const gitData = await res.json();
      setData(gitData);
      setError(null);
    } catch (err) {
      console.error('Error fetching git info:', err);
      setError('Impossible de charger les données Git.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitData();
    // Auto-refresh Git status every 10 seconds
    const interval = setInterval(fetchGitData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ color: '#9ca3af', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        Lecture du dépôt Git...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ color: '#ef4444', padding: '1rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        ⚠️ {error || 'Aucune donnée Git disponible.'}
      </div>
    );
  }

  // Parse git status lines
  const changedFiles = data.status
    ? data.status.split('\n').filter(Boolean).map(line => {
        const flag = line.substring(0, 2);
        const file = line.substring(3);
        return { flag, file };
      })
    : [];

  return (
    <div style={{
      display: 'flex',
      gap: '24px',
      padding: '20px',
      color: '#f3f4f6',
      fontFamily: 'Inter, system-ui, sans-serif',
      flexWrap: 'wrap',
      background: '#09090d',
      borderRadius: '12px'
    }}>
      {/* Git Status Card */}
      <div style={{
        flex: '1 1 300px',
        background: 'rgba(25, 25, 35, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        padding: '16px',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🌿 Branche Active
        </h4>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '30px',
          padding: '6px 14px',
          color: '#a78bfa',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)',
          marginBottom: '20px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #a78bfa', display: 'inline-block' }} />
          {data.branch}
        </div>

        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📝 Modifications Locales
        </h4>
        
        {changedFiles.length === 0 ? (
          <div style={{ color: '#10b981', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ✓ Copie de travail propre (aucun fichier modifié)
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {changedFiles.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255,255,255,0.03)',
                padding: '8px 10px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                borderLeft: `3px solid ${item.flag.includes('M') ? '#f59e0b' : '#10b981'}`
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: item.flag.includes('M') ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: item.flag.includes('M') ? '#fbbf24' : '#34d399',
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }}>
                  {item.flag.trim()}
                </span>
                <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{item.file}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Commits Timeline */}
      <div style={{
        flex: '2 2 400px',
        background: 'rgba(25, 25, 35, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        padding: '16px',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem' }}>📜 Historique des Commits (Vite/Git logs)</h4>
        
        <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
          {data.commits.map((commit, idx) => (
            <div key={commit.hash} style={{
              position: 'relative',
              marginBottom: '20px',
              paddingBottom: idx === data.commits.length - 1 ? '0' : '4px'
            }}>
              {/* Chronological Circle Node */}
              <span style={{
                position: 'absolute',
                left: '-27px',
                top: '4px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: idx === 0 ? '#8b5cf6' : '#4b5563',
                border: idx === 0 ? '3px solid #09090d' : '2px solid #09090d',
                boxShadow: idx === 0 ? '0 0 10px #8b5cf6' : 'none'
              }} />

              {/* Commit details */}
              <div style={{
                background: idx === 0 ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                border: idx === 0 ? '1px solid rgba(139, 92, 246, 0.15)' : 'none',
                padding: idx === 0 ? '8px 12px' : '0',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    color: '#a78bfa',
                    background: 'rgba(167, 139, 250, 0.1)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    {commit.hash}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{commit.date}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>by {commit.author}</span>
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: idx === 0 ? '#ffffff' : '#d1d5db',
                  fontWeight: idx === 0 ? 'bold' : 'normal'
                }}>
                  {commit.subject}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
