import React, { useEffect } from 'react';
import { useAppStore } from './store/appStore';
import { SkeletonDashboard } from './components/SkeletonDashboard';
import { MarketingAgencyDashboard } from './components/MarketingAgencyDashboard';
import { ContextualError, logError } from './utils/errors';

function App() {
  const { bootStage, setBootStage, setBootError } = useAppStore();

  useEffect(() => {
    const initializeSystem = async () => {
      try {
        // Step 1: Core CSS & Theme Tokens (Instant)
        setBootStage('css');
        await new Promise(r => setTimeout(r, 100));

        // Step 2: Critical Error Boundary Check (Already passed if we are here)
        
        // Step 3: User Authentication (Simulated)
        setBootStage('auth');
        // Simulate API latency
        await new Promise(r => setTimeout(r, 600)); 
        
        // Step 4: Layout & Data
        setBootStage('layout');
        await new Promise(r => setTimeout(r, 400));
        
        setBootStage('data');
        // Simulate Fetching Live Data
        await new Promise(r => setTimeout(r, 400));

        setBootStage('ready');
      } catch (err) {
        const error = new ContextualError(
          'Initialization Sequence Failed',
          'INIT_SEQ_FAIL_001',
          'AppRoot',
          'critical'
        );
        setBootError(error);
        // We re-throw to let the Global Error Boundary catch it if needed,
        // or handle it locally via state.
        throw err;
      }
    };

    initializeSystem().catch(err => {
      logError(err, 'AppRoot', 'Initialization');
    });
  }, [setBootStage, setBootError]);

  // Render Logic based on Boot Stage
  if (bootStage !== 'ready') {
     return (
       <div className="min-h-screen bg-[#0F172A] text-white">
         {/* Only show skeleton if we are past the raw CSS load, otherwise blank/spinner is fine for <100ms */}
         {(bootStage === 'auth' || bootStage === 'layout' || bootStage === 'data') && (
           <div className="animate-in fade-in duration-500">
             <SkeletonDashboard />
             <div className="fixed bottom-4 right-4 bg-slate-800 text-xs text-gray-500 px-3 py-1 rounded-full font-mono border border-gray-700">
                System Boot: {bootStage.toUpperCase()}...
             </div>
           </div>
         )}
       </div>
     );
  }

  return <MarketingAgencyDashboard />;
}

export default App;