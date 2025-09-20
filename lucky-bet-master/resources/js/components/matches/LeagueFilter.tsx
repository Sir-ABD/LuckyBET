// resources/js/components/matches/LeagueFilter.tsx
import React from 'react';

interface LeagueFilterProps {
    leagues: string[];
    selectedLeague: string;
    onSelectLeague: (league: string) => void;
}

const LeagueFilter: React.FC<LeagueFilterProps> = ({ leagues, selectedLeague, onSelectLeague }) => {
    return (
        <div className="px-4 mb-4">
            <select
                value={selectedLeague}
                onChange={(e) => onSelectLeague(e.target.value)}
                className="w-full bg-[#1E293B] border border-slate-600 rounded-lg p-3 text-white focus:ring-green-500 focus:border-green-500"
            >
                <option value="All Leagues">All Leagues</option>
                {leagues.map(league => (
                    <option key={league} value={league}>{league}</option>
                ))}
            </select>
        </div>
    );
};
export default LeagueFilter;