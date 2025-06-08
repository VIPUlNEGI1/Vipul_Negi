export const saveMoods = (moods) => {
  localStorage.setItem('moods', JSON.stringify(moods));
};

export const loadMoods = () => {
  const moods = localStorage.getItem('moods');
  return moods ? JSON.parse(moods) : {};
};

export const getDominantMood = (moods) => {
  const moodCounts = { Happy: 0, Neutral: 0, Sad: 0 };
  Object.values(moods).forEach(mood => moodCounts[mood]++);
  return Object.entries(moodCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['Happy', 0])[0];
};

export const getWeekDates = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.toISOString().split('T')[0];
  });
};

export const fetchDemoMoodData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
    const data = await response.json();
    const mockMoods = {};
    const weekDates = getWeekDates();
    const moods = ['Happy', 'Neutral', 'Sad'];
    data.slice(0, 7).forEach((todo, index) => {
      if (index < weekDates.length) {
        mockMoods[weekDates[index]] = moods[Math.floor(Math.random() * 3)];
      }
    });
    return mockMoods;
  } catch (error) {
    console.error('Error fetching demo mood data:', error);
    return {};
  }
};