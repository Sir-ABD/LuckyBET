// resources/js/Pages/Home.tsx
import React from 'react';
import { Toaster } from 'react-hot-toast'; // For notifications
import { motion } from 'framer-motion';

import { useBlockchain } from '../context/BlockchainContext';
import ConnectWalletButton from '../components/ConnectWalletButton';
import EventList from '../components/events/EventList';

const Home: React.FC = () => {
    const { account } = useBlockchain();

    const WelcomePrompt = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center flex flex-col items-center"
        >
            <h1 className="text-5xl font-bold text-white mb-4">
                Welcome to <span className="text-sky-400">LuckyBet</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8">
                The fully on-chain betting platform. Connect your wallet to begin.
            </p>
            <ConnectWalletButton />
        </motion.div>
    );

    return (
        <>
            {/* This component handles all popup notifications */}
            <Toaster position="bottom-right" toastOptions={{
                className: '!bg-slate-700 !text-white !border !border-slate-600',
            }} />
            
            <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8">
                <header className="w-full max-w-5xl flex justify-between items-center mb-12">
                    <div className="text-2xl font-bold text-white">Lucky<span className="text-sky-400">Bet</span></div>
                    {account && <ConnectWalletButton />}
                </header>

                <main className="w-full flex-1 flex flex-col items-center justify-center">
                    {account ? <EventList /> : <WelcomePrompt />}
                </main>

                <footer className="w-full text-center text-slate-500 mt-12 py-4">
                    Powered by Solidity & BlockDAG
                </footer>
            </div>
        </>
    );
};

export default Home;