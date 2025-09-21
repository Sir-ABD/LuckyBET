// resources/js/components/events/EventList.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBlockchain } from '../../context/BlockchainContext';
import EventCard from './EventCard';

// Animation variants for the container to stagger children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const EventList: React.FC = () => {
    const { contract } = useBlockchain();
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!contract) return;
            setIsLoading(true);
            try {
                // This is the magic: we call our contract to get all data.
                const activeEvents = await contract.getActiveEvents();
                setEvents(activeEvents);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [contract]);

    if (isLoading) {
        return <div className="text-center text-slate-400">Loading events from the blockchain...</div>;
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl space-y-6"
        >
            {events.length > 0 ? (
                events.map((event) => (
                    <motion.div key={event.id.toString()} variants={itemVariants}>
                        <EventCard event={event} />
                    </motion.div>
                ))
            ) : (
                <div className="text-center text-slate-500">No active events found.</div>
            )}
        </motion.div>
    );
};

export default EventList;