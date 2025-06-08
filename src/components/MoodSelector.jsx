
import { motion } from 'framer-motion';

function MoodSelector({ date, currentMood, onSelect, onDelete, onClose }) {
  const moods = ['Happy', 'Neutral', 'Sad'];

  const getMoodStyles = (mood) => {
  
    const baseStyles = !currentMood
      ? 'bg-white hover:bg-gray-100 text-black'
      : {
          Happy: 'bg-yellow-400 hover:bg-yellow-500 text-black',
          Neutral: 'bg-blue-400 hover:bg-blue-500 text-white',
          Sad: 'bg-gray-600 hover:bg-gray-700 text-white'
        }[mood];

    // Apply ring and scale effects only when the mood is selected
    const selectedStyles = currentMood === mood 
      ? 'ring-4 ring-offset-2 ring-black scale-105 shadow-lg'
      : '';

    return `${baseStyles} ${selectedStyles} px-4 py-2 rounded transition-all duration-200`;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-xl font-bold mb-4">Select Mood for {new Date(date).toLocaleDateString()}</h2>
        <div className="flex gap-2 mb-4">
          {moods.map(mood => (
            <button
              key={mood}
              className={getMoodStyles(mood)}
              onClick={() => onSelect(date, mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        {currentMood && (
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded mr-2 transition-colors duration-200"
            onClick={() => onDelete(date)}
          >
            Delete
          </button>
        )}
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export default MoodSelector;