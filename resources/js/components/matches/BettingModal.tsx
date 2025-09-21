// resources/js/components/matches/BettingModal.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import { useBlockchain } from '../../context/BlockchainContext';

const BettingModal: React.FC<{ event: any, onClose: () => void }> = ({ event, onClose }) => {
    const { contract } = useBlockchain();
    const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null); // 1: Home, 2: Away, 3: Draw
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const totalBets = Number(event.totalBets);
    const getPercentage = (count: bigint) => {
        if (totalBets === 0) return "0.00%";
        return ((Number(count) / totalBets) * 100).toFixed(2) + "%";
    };

    const handlePlaceBet = async () => {
        if (!contract || !selectedOutcome || !amount || parseFloat(amount) <= 0) {
            toast.error("Please select an outcome and enter a valid amount.");
            return;
        }
        setIsLoading(true);
        const toastId = toast.loading("Confirm transaction in your wallet...");
        
        try {
            const betAmount = ethers.parseEther(amount);
            const tx = await contract.placeBet(event.id, selectedOutcome, { value: betAmount });
            
            toast.loading('Submitting your prediction to the blockchain...', { id: toastId });
            await tx.wait();

            toast.success('Prediction placed successfully!', { id: toastId });
            onClose(); // Close modal on success
        } catch (error: any) {
            console.error(error);
            const message = error.reason || "Transaction failed or was rejected.";
            toast.error(`Error: ${message}`, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    const getButtonClass = (outcome: number) => {
        return `flex-1 py-3 rounded-lg font-bold transition-colors text-sm ${selectedOutcome === outcome ? 'bg-green-500 text-black' : 'bg-slate-700 text-white'}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-end justify-center p-4 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className="bg-[#1A2C28] w-full max-w-md rounded-t-2xl p-6 border-t border-slate-700"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Match Prediction</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white"><FiX size={24} /></button>
                </div>

                <div className="text-center mb-4 flex justify-between items-center">
                    <div className='flex-1 text-center font-bold'>{event.teamHome}</div>
                    <div className='text-sm text-slate-400 px-4'>VS</div>
                    <div className='flex-1 text-center font-bold'>{event.teamAway}</div>
                </div>

                <div className="flex justify-between items-center text-center text-xs text-slate-400 mb-4">
                    <div className="w-1/3">
                        <div className="font-bold text-lg text-white">{getPercentage(event.homeBets)}</div>
                        <span>picked</span>
                    </div>
                    <div className="w-1/3">
                        <div className="font-bold text-lg text-white">{getPercentage(event.drawBets)}</div>
                         <span>picked</span>
                    </div>
                    <div className="w-1/3">
                        <div className="font-bold text-lg text-white">{getPercentage(event.awayBets)}</div>
                         <span>picked</span>
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    <button onClick={() => setSelectedOutcome(1)} className={getButtonClass(1)}>Home Win</button>
                    <button onClick={() => setSelectedOutcome(3)} className={getButtonClass(3)}>Draw</button>
                    <button onClick={() => setSelectedOutcome(2)} className={getButtonClass(2)}>Away Win</button>
                </div>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00 OTARA"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:ring-green-500 focus:border-green-500"
                />

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceBet}
                    disabled={isLoading}
                    className="w-full mt-6 bg-green-500 text-black font-bold py-3 rounded-lg disabled:bg-slate-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Submitting...' : `Submit Prediction`}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default BettingModal;