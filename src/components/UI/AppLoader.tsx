interface AppLoaderProps {
  message?: string;
}

export function AppLoader({ message }: AppLoaderProps) {
  return (
    <div 
      id="app-loader"
      role="alert"
      aria-busy="true"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div 
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '4px solid #1e293b',
          borderTopColor: '#3b82f6',
          animation: 'spin 1s linear infinite'
        }} 
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <h2 
        style={{
          marginTop: '24px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          letterSpacing: '0.05em',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}
      >
        {message || 'KidPedia'}
      </h2>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default AppLoader;
