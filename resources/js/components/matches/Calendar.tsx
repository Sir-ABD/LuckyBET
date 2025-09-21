import React from 'react';
import { eachDayOfInterval, startOfWeek, endOfWeek, format, isSameDay } from 'date-fns';

interface CalendarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
    const today = new Date();
    const week = eachDayOfInterval({
        start: startOfWeek(today, { weekStartsOn: 1 }), // Monday
        end: endOfWeek(today, { weekStartsOn: 1 }),
    });

    return (
        <div className="px-4">
            <h2 className="text-sm font-semibold text-slate-300 mb-3">Match Schedule</h2>
            <div className="flex justify-between">
                {week.map(day => {
                    const isActive = isSameDay(day, selectedDate);
                    return (
                        <button
                            key={day.toString()}
                            onClick={() => onDateChange(day)}
                            className={`flex flex-col items-center p-2 rounded-lg w-12 transition-colors ${isActive ? 'bg-[#1E293B]' : 'hover:bg-slate-700/50'}`}
                        >
                            <span className="text-xs text-slate-400">{format(day, 'E')}</span>
                            <span className={`font-bold text-lg mt-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>{format(day, 'd')}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
export default Calendar;