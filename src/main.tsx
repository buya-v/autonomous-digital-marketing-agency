import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GlobalErrorBoundary } from './components/ErrorBoundary.tsx';

// DOM Verification as per requirement 5.4
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('FATAL: Root element not found');
}

console.log('[System] DOM Mounted. Initializing React Root...');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>,
);

// Final boot check
requestAnimationFrame(() => {
  console.log('[System] Application Render Cycle Complete');
});