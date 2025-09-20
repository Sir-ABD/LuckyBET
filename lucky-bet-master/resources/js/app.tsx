// resources/js/app.tsx
// import './bootstrap';
import '../css/app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BlockchainProvider, useBlockchain } from './context/BlockchainContext';
import MainLayout from './layouts/MainLayout';
import MatchesPage from './pages/MatchesPage';
import PredictionsPage from './pages/PredictionsPage';
import ConnectWalletPage from './components/ConnectWalletPage';

const App: React.FC = () => {
    const { account } = useBlockchain();

    // If no account is connected, we show our beautiful new landing page.
    if (!account) {
        return <ConnectWalletPage />;
    }

    // When the account is connected, we show the main app with its routes.
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<MatchesPage />} />
                <Route path="/predictions" element={<PredictionsPage />} />
            </Route>
        </Routes>
    );
};

// The rest of the file remains the same
const rootElement = document.getElementById('app');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <BlockchainProvider>
                    <Toaster position="bottom-center" toastOptions={{
                        className: '!bg-slate-800 !text-white !border !border-slate-700',
                    }}/>
                    <App />
                </BlockchainProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}