// resources/js/components/predictions/PredictionCard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBlockchain } from '../../context/BlockchainContext';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';

// This is a "merged" type that combines Bet and Event data
interface Prediction {
    betId: bigint;
    isWin: boolean;
    isSettled: boolean;
    isPaid: boolean;
    teamHome: string;
    teamAway: string;
    // You would add score data here from your API/Oracle later
    homeScore: number;
    awayScore: number;
    // Payout would be calculated off-chain for display
    potentialPayout: string; 
}

const PredictionCard: React.FC<{ prediction: Prediction }> = ({ prediction }) => {
    const { contract } = useBlockchain();
    const [isClaiming, setIsClaiming] = useState(false);

    const handleClaim = async () => {
        if (!contract) return;
        setIsClaiming(true);
        const toastId = toast.loading('Claiming your winnings...');
        try {
            const tx = await contract.withdrawPayout(prediction.betId);
            await tx.wait();
            toast.success('Winnings claimed!', { id: toastId });
            // Here you would typically refetch the user's bets to update the UI state
        } catch (error: any) {
            const message = error.reason || "Claim failed.";
            toast.error(`Error: ${message}`, { id: toastId });
        } finally {
            setIsClaiming(false);
        }
    };

    const ResultTag = () => {
        if (prediction.isWin) {
            return <div className="text-green-400 font-bold">You won {prediction.potentialPayout}</div>;
        }
        return <div className="text-red-400 font-bold">You lost</div>;
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1E293B] rounded-lg p-4 mb-3"
        >
            <div className="flex items-center">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center">
                        {/* <img src="..." className="w-6 h-6 mr-2" /> */}
                        <span className={`font-semibold ${prediction.isWin ? 'text-green-400' : ''}`}>{prediction.teamHome}</span>
                    </div>
                    <div className="flex items-center">
                        {/* <img src="..." className="w-6 h-6 mr-2" /> */}
                        <span className="font-semibold">{prediction.teamAway}</span>
                    </div>
                </div>
                <div className="text-center mx-4">
                    <div className={`font-bold text-xl ${prediction.isWin ? 'text-green-400' : ''}`}>{prediction.homeScore}</div>
                    <div className="font-bold text-xl">{prediction.awayScore}</div>
                </div>
                <div className="w-28 text-right">
                    {prediction.isSettled && <ResultTag />}
                </div>
            </div>
            
            {prediction.isSettled && prediction.isWin && !prediction.isPaid && (
                 <motion.button
                    onClick={handleClaim}
                    disabled={isClaiming}
                    className="w-full mt-4 bg-green-500 text-black font-bold py-2 rounded-lg"
                 >
                     {isClaiming ? 'Claiming...' : `Claim ${prediction.potentialPayout} OTARA`}
                 </motion.button>
            )}
        </motion.div>
    );
};
export default PredictionCard;