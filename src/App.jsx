import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from './components/Calandar';
import MoodSummary from './components/Moodsummary';
import MoodQuote from './components/MoodQute'
import { getDominantMood, saveMoods, loadMoods, fetchDemoMoodData } from './moodUtils';
import './App.css';

function App() {
  const [moods, setMoods] = useState(loadMoods());
  // const [isDemoMode, setIsDemoMode] = useState(false);
  const dominantMood = getDominantMood(moods);

  // useEffect(() => {
  //   if (isDemoMode) {
  //     // fetchDemoMoodData().then(demoMoods => {
  //     //   // setMoods(demoMoods);
  //     // });
  //   }
  // }, [isDemoMode]);

  // useEffect(() => {
  //   if (!isDemoMode) {
  //     saveMoods(moods);
  //   }
  // }, [moods, isDemoMode]);

  const bgColors = {
    Happy: 'bg-yellow-100',
    Neutral: 'bg-blue-100',
    Sad: 'bg-gray-300'
  };

  return (
    <motion.div 
      className={`min-h-screen ${bgColors[dominantMood] || 'bg-gray-100'} p-4 transition-colors duration-500`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          MoodBoard
        </motion.h1>
        {/* <button
          className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          onClick={() => setIsDemoMode(!isDemoMode)}
        >
          {isDemoMode ? 'Switch to Local Mode' : 'Switch to Demo API Mode'}
        </button> */}
        <MoodQuote />
        <Calendar moods={moods} setMoods={setMoods} />
        <MoodSummary moods={moods} />
      </div>
    </motion.div>
  );
}

export default App;