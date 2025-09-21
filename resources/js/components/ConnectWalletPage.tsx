// resources/js/pages/ConnectWalletPage.tsx

import React from 'react';
import { motion } from 'framer-motion';
import ConnectWalletButton from './ConnectWalletButton'; // We will create this component

const ConnectWalletPage: React.FC = () => {
    return (
        <div className="bg-[#0A1D1A] min-h-screen flex flex-col items-center justify-center p-4 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold mb-3">
                    Welcome to LuckyBet
                </h1>
                <p className="text-slate-400 mb-8 max-w-sm">
                    The fully on-chain, pari-mutuel prediction platform on the BlockDAG network.
                </p>
                <ConnectWalletButton />
            </motion.div>
        </div>
    );
};

export default ConnectWalletPage;