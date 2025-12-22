
import React, { ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Use React.Component explicitly to ensure property inheritance like 'props' is correctly typed
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#064e3b' }}>Something went wrong.</h1>
          <p>We encountered an error loading the website content.</p>
          <p style={{ color: '#ef4444', background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', display: 'inline-block', maxWidth: '600px', textAlign:'left' }}>
            {this.state.error?.message}
          </p>
          <br />
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#d97706', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
          >
            Clear Cache & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
