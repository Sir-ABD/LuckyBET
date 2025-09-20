// resources/js/pages/PredictionsPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useBlockchain } from '../context/BlockchainContext';
import PredictionCard from '../components/predictions/PredictionCard';
import { AnimatePresence } from 'framer-motion';

// Mock data until Oracle is built. Replace with actual data fetching.
const MOCK_PREDICTIONS = [
    { betId: 1, isWin: true, isSettled: true, isPaid: false, teamHome: 'Arsenal', teamAway: 'Brentford', homeScore: 3, awayScore: 1, potentialPayout: '2.5' },
    { betId: 2, isWin: false, isSettled: true, isPaid: true, teamHome: 'Genoa', teamAway: 'Monza', homeScore: 2, awayScore: 0, potentialPayout: '0' },
    { betId: 3, isWin: true, isSettled: false, isPaid: false, teamHome: 'Sunderland', teamAway: 'Bradford', homeScore: 0, awayScore: 0, potentialPayout: '7.75' },
];

const PredictionsPage: React.FC = () => {
    const { contract, account } = useBlockchain();
    const [predictions, setPredictions] = useState<any[]>(MOCK_PREDICTIONS); // Using mock data for now
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<'all' | 'wins' | 'losses'>('all');

    useEffect(() => {
        const fetchPredictions = async () => {
            if (!contract || !account) return;
            setIsLoading(true);
            try {
                // In a real app, you would:
                // 1. Get all active events: const events = await contract.getActiveEvents();
                // 2. Get user's bet IDs: const betIds = await contract.getBetIdsForBettor(account);
                // 3. For each betId, get bet details: const bet = await contract.bets(betId);
                // 4. Merge this data to create the `predictions` array.
                // For now, we use the mock data.
                console.log("Fetching user predictions...");
            } catch (error) {
                console.error("Failed to fetch predictions", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPredictions();
    }, [contract, account]);

    const filteredPredictions = useMemo(() => {
        if (filter === 'wins') return predictions.filter(p => p.isWin);
        if (filter === 'losses') return predictions.filter(p => !p.isWin && p.isSettled);
        return predictions;
    }, [filter, predictions]);

    const getFilterClass = (f: typeof filter) => {
        return `px-4 py-1 rounded-full text-sm font-semibold ${filter === f ? 'bg-green-500 text-black' : 'bg-slate-700 text-white'}`;
    };

    return (
        <div className="p-4">
            <header className="text-center my-6">
                <h1 className="text-3xl font-bold">Prediction History</h1>
            </header>

            <div className="flex justify-center gap-2 mb-6">
                <button onClick={() => setFilter('all')} className={getFilterClass('all')}>All</button>
                <button onClick={() => setFilter('wins')} className={getFilterClass('wins')}>Wins</button>
                <button onClick={() => setFilter('losses')} className={getFilterClass('losses')}>Losses</button>
            </div>
            
            {isLoading ? <div>Loading Your Predictions...</div> : (
                <AnimatePresence>
                    {filteredPredictions.map(p => (
                        <PredictionCard key={p.betId} prediction={p} />
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
};
export default PredictionsPage;