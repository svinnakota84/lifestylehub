import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="max-w-xl mx-auto p-12 space-y-4"><h1 className="text-2xl font-bold">LifestyleHub couldn’t load</h1><p>Please reload the page. Your billing account has not been changed.</p><button className="underline" onClick={() => window.location.reload()}>Reload LifestyleHub</button></main>;
    return this.props.children;
  }
}
createRoot(document.getElementById('root')!).render(<AppErrorBoundary><App /></AppErrorBoundary>);
