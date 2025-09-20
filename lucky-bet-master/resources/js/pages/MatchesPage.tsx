// resources/js/pages/MatchesPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBlockchain } from '../context/BlockchainContext';
import { isSameDay } from 'date-fns';

import Calendar from '../components/matches/Calendar';
import MatchCard from '../components/matches/MatchCard';
import BettingModal from '../components/matches/BettingModal';
import OwnerPanel from '../components/admin/OwnerPanel'; // Import the owner panel
import LeagueFilter from '../components/matches/LeagueFilter'; // Import the league filter

const MatchesPage: React.FC = () => {
    const { contract } = useBlockchain();
    const [allEvents, setAllEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [selectedLeague, setSelectedLeague] = useState('All Leagues');

    useEffect(() => {
        const fetchEvents = async () => {
            if (!contract) return;
            setIsLoading(true);
            try {
                const activeEvents = await contract.getActiveEvents();
                setAllEvents(activeEvents);
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, [contract]);

    const uniqueLeagues = useMemo(() => {
        const leagueSet = new Set(allEvents.map(event => event.title));
        return Array.from(leagueSet);
    }, [allEvents]);

    const filteredEvents = useMemo(() => {
        return allEvents.filter(event => {
            const isToday = isSameDay(new Date(Number(event.startTimestamp) * 1000), selectedDate);
            const isCorrectLeague = selectedLeague === 'All Leagues' || event.title === selectedLeague;
            return isToday && isCorrectLeague;
        });
    }, [allEvents, selectedDate, selectedLeague]);

    return (
        <div>
            <header className="text-center pt-8 pb-4 bg-green-900/50 sticky top-0 z-10 backdrop-blur-sm">
                <h1 className="text-3xl font-bold">LUCKY BET</h1>
            </header>
            
            <div className="sticky top-[88px] z-10 bg-[#0A1D1A] py-4">
                <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </div>
            
            <div className="p-4">
                <LeagueFilter leagues={uniqueLeagues} selectedLeague={selectedLeague} onSelectLeague={setSelectedLeague} />

                {isLoading ? <div className="text-center p-8">Loading Matches...</div> : (
                    <AnimatePresence>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <MatchCard 
                                    key={event.id.toString()} 
                                    event={event} 
                                    onDetailsClick={() => setSelectedEvent(event)}
                                />
                            ))
                        ) : (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center text-slate-400 p-8">
                                No matches scheduled for this day/league.
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <BettingModal
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                    />
                )}
            </AnimatePresence>

            {/* The Owner Panel will only be visible to you for testing */}
            <OwnerPanel />
        </div>
    );
};
export default MatchesPage;