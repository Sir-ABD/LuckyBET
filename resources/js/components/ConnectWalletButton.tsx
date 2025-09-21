// resources/js/components/ConnectWalletButton.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { useBlockchain } from '../context/BlockchainContext';

const ConnectWalletButton: React.FC = () => {
    const { account, connectWallet } = useBlockchain();

    const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    return (
        <div className="flex justify-center">
            {account ? (
                <div className="px-4 py-2 bg-slate-700 text-green-400 rounded-lg font-mono text-sm">
                    {formatAddress(account)}
                </div>
            ) : (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={connectWallet}
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full shadow-lg transition-colors duration-300"
                >
                    Connect Wallet
                </motion.button>
            )}
        </div>
    );
};

export default ConnectWalletButton;