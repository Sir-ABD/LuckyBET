// resources/js/components/matches/MatchCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';

const MatchCard: React.FC<{ event: any, onDetailsClick: () => void }> = ({ event, onDetailsClick }) => {
    const prizePool = parseFloat(ethers.formatEther(event.totalAmount)).toFixed(2);
    
    const StatusTag = () => {
        // This logic will need to be expanded based on start time and settled status
        return <div className="bg-slate-600 text-xs px-2 py-1 rounded">Not Started</div>;
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#1A2C28] border border-slate-700 rounded-lg p-4 mb-3"
        >
            <div className="flex justify-between items-center text-sm">
                <div className="w-1/3 font-semibold">{event.teamHome}</div>
                <div className="w-1/3 text-center">
                    {/* Scores would be shown here if the match is ended */}
                    <div className="font-bold text-lg">
                        {new Date(Number(event.startTimestamp) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                <div className="w-1/3 text-right font-semibold">{event.teamAway}</div>
            </div>

            <div className="h-px bg-slate-700 my-3"></div>

            <div className="flex justify-between items-center">
                <div>
                    <div className="text-xs text-slate-400">PRIZE POOL</div>
                    <div><span className="font-bold text-lg text-green-400">{prizePool}</span> OTARA</div>
                    <div className="text-xs text-slate-400">{Number(event.totalBets)} users joined</div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onDetailsClick}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-full text-sm"
                >
                    Details ▸
                </motion.button>
            </div>
        </motion.div>
    );
};
export default MatchCard;