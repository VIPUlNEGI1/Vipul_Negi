import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Fallback funny quotes if API fails
const fallbackQuotes = [
  { text: "I told my wife she was drawing her eyebrows too high for our date. She looked surprised.", author: "Rodney Dangerfield" },
  { text: "My therapist says I have a preoccupation with vengeance. We’ll see about that.", author: "Stewart Francis" },
  { text: "I’m not saying I’m Batman, but have you ever seen me and Batman in the same room?", author: "Unknown" },
  { text: "I used to think I was indecisive, but now I'm not too sure.", author: "Unknown" },
];

function MoodQuote() {
  const [quote, setQuote] = useState({ text: 'Loading...'});

  useEffect(() => {
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.joke) {
          setQuote({ text: data.joke});
        } else {
          const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
          setQuote(randomFallback);
        }
      })
      .catch(() => {
        const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(randomFallback);
      });
  }, []);

  return (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow mb-8 text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <p className="italic text-lg">"{quote.text}"</p>
      
    </motion.div>
  );
}

export default MoodQuote;