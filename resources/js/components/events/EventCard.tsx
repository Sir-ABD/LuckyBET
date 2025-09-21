// resources/js/components/events/EventCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { ethers } from 'ethers';

// This mirrors the EventView struct from our contract
interface EventView {
    id: bigint;
    title: string;
    teamHome: string;
    teamAway: string;
    startTimestamp: bigint;
    totalAmount: bigint;
    homePool: bigint;
    awayPool: bigint;
    drawPool: bigint;
}

const EventCard: React.FC<{ event: EventView }> = ({ event }) => {
    const formatEther = (amount: bigint) => ethers.formatEther(amount).slice(0, 6);

    return (
        <Card className="w-full text-white">
            <div className="text-sm text-sky-400 mb-2">{event.title}</div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">{event.teamHome}</span>
                <span className="text-xl text-slate-400">vs</span>
                <span className="text-2xl font-bold">{event.teamAway}</span>
            </div>
            
            <div className="h-px bg-slate-700 my-4"></div>

            <div className="flex justify-around text-center">
                <div>
                    <div className="text-xs text-slate-400">HOME WIN</div>
                    <div className="font-bold text-lg">{formatEther(event.homePool)} MATIC</div>
                </div>
                <div>
                    <div className="text-xs text-slate-400">DRAW</div>
                    <div className="font-bold text-lg">{formatEther(event.drawPool)} MATIC</div>
                </div>
                <div>
                    <div className="text-xs text-slate-400">AWAY WIN</div>
                    <div className="font-bold text-lg">{formatEther(event.awayPool)} MATIC</div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <div className="text-sm">Total Pool: <span className="font-bold text-green-400">{formatEther(event.totalAmount)} MATIC</span></div>
            </div>
            {/* We will add betting buttons here */}
        </Card>
    );
};

export default EventCard;