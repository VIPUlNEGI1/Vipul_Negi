import { motion } from 'framer-motion';
import { getWeekDates } from '../moodUtils';

function MoodSummary({ moods }) {
  const weekDates = getWeekDates();
  const moodCounts = { Happy: 0, Neutral: 0, Sad: 0 };
  const moodValues = { Happy: 2, Neutral: 1, Sad: -1 };
  
  weekDates.forEach(date => {
    if (moods[date]) moodCounts[moods[date]]++;
  });

  const mostCommonMood = Object.entries(moodCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['None', 0])[0];
  const goodDays = moodCounts.Happy;
  const badDays = moodCounts.Sad;
  const totalValue = weekDates.reduce((sum, date) => sum + (moodValues[moods[date]] || 0), 0);

  const getPieChartData = () => {
    const total = Object.values(moodCounts).reduce((sum, val) => sum + val, 0);
    if (total === 0) return [];
    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      percentage: (count / total) * 100,
      color: mood === 'Happy' ? '#facc15' : mood === 'Neutral' ? '#3b82f6' : '#4b5563'
    }));
  };

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">Weekly Mood Summary</h2>
      <p>Most Common Mood: {mostCommonMood}</p>
      <p>Good Days (Happy): {goodDays}</p>
      <p>Bad Days (Sad): {badDays}</p>
      <p>Mood Trend Score: {totalValue}</p>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Mood Distribution</h3>
        <div className="h-8 flex rounded overflow-hidden">
          {getPieChartData().map(({ mood, percentage, color }) => (
            <div
              key={mood}
              style={{ width: `${percentage}%`, backgroundColor: color }}
              title={`${mood}: ${percentage.toFixed(1)}%`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default MoodSummary;