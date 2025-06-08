
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoodSelector from './MoodSelector';
import { getWeekDates } from '../moodUtils';

function Calendar({ moods, setMoods }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const weekDates = getWeekDates();
  const today = new Date().toISOString().split('T')[0];

  const moodColors = {
    Happy: 'bg-yellow-400 text-black',
    Neutral: 'bg-blue-400 text-white',
    Sad: 'bg-gray-600 text-white',
    Empty: 'bg-white text-black'
  };

  const handleMoodSelect = (date, mood) => {
    setMoods(prev => ({ ...prev, [date]: mood }));
    setSelectedDate(null);
  };

  const handleDeleteMood = (date) => {
    setMoods(prev => {
      const newMoods = { ...prev };
      delete newMoods[date];
      return newMoods;
    });
    setSelectedDate(null);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-8">
      {weekDates.map(date => (
        <motion.div
          key={date}
          className={`p-4 rounded-lg text-center cursor-pointer ${moods[date] ? moodColors[moods[date]] : moodColors['Empty']} ${date > today ? 'opacity-50 pointer-events-none' : ''} transition-colors duration-200 shadow-md`}
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedDate(date)}
        >
          <p className="font-semibold">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
          <p>{new Date(date).getDate()}</p>
          {moods[date] && <p className="text-sm">{moods[date]}</p>}
        </motion.div>
      ))}
      <AnimatePresence>
        {selectedDate && (
          <MoodSelector
            date={selectedDate}
            currentMood={moods[selectedDate]}
            onSelect={handleMoodSelect}
            onDelete={handleDeleteMood}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Calendar;
