import React, { useEffect } from 'react'
import "./styles/global.css";
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/routepage';
import ScrollToTop from './utils/scrolltoup';
import { HelmetProvider } from 'react-helmet-async';

const App = () => { 

  useEffect(() => {
    const handleGlobalError = (event) => {
      const error = event.error;
      if (error?.message?.includes('removeChild') ||
        error?.message?.includes('insertBefore')) {

        console.error('🔴 GLOBAL DOM ERROR:', {
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          url: window.location.href
        });

        // Prevent default error handling to avoid console spam
        event.preventDefault();

        // Log to your API
        fetch('/api/error-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: error.message,
            stack: error.stack,
            type: 'global_dom_error',
            timestamp: new Date().toISOString()
          })
        }).catch(console.error);
      }
    };

    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);
  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

export default App;