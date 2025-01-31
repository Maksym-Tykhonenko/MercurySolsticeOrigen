export const dailyAdvice = {
  morning: {
    timeRange: '6:00–11:00',
    advices: [
      {
        id: 'm1',
        title: 'Rise and shine!',
        description:
          'Drink a glass of water to kickstart your day with energy.',
        category: 'wellness',
        duration: '5 min',
        icon: 'water-glass', // You can map these to your icon set
      },
      {
        id: 'm2',
        title: 'Energize yourself!',
        description: 'Do morning stretches or light exercises.',
        category: 'exercise',
        duration: '10 min',
        icon: 'exercise',
      },
      {
        id: 'm3',
        title: 'Plan for success!',
        description: 'Write down three main goals for the day.',
        category: 'productivity',
        duration: '5 min',
        icon: 'checklist',
      },
      {
        id: 'm4',
        title: 'Savor the moment!',
        description: 'Take 5 minutes for gratitude or meditation.',
        category: 'mindfulness',
        duration: '5 min',
        icon: 'meditation',
      },
      {
        id: 'm5',
        title: 'Catch some sunlight!',
        description: 'Take a walk outside to soak in some vitamin D.',
        category: 'wellness',
        duration: '15 min',
        icon: 'sun',
      },
    ],
  },

  daytime: {
    timeRange: '11:00–15:00',
    advices: [
      {
        id: 'd1',
        title: 'Time for productivity!',
        description: 'Tackle the most challenging task of the day.',
        category: 'productivity',
        duration: '45 min',
        icon: 'target',
      },
      {
        id: 'd2',
        title: 'Keep moving!',
        description: 'Take a 5-minute break for a walk or stretch.',
        category: 'exercise',
        duration: '5 min',
        icon: 'walking',
      },
      {
        id: 'd3',
        title: 'Feed your mind!',
        description: 'Read something inspiring or learn something new.',
        category: 'learning',
        duration: '15 min',
        icon: 'book',
      },
      {
        id: 'd4',
        title: 'Smart lunching!',
        description: 'Have a nutritious lunch to maintain your energy.',
        category: 'nutrition',
        duration: '30 min',
        icon: 'food',
      },
      {
        id: 'd5',
        title: 'Take a deep breath!',
        description: 'Spend 3 minutes doing breathing exercises.',
        category: 'mindfulness',
        duration: '3 min',
        icon: 'breathing',
      },
    ],
  },

  evening: {
    timeRange: '15:00–20:00',
    advices: [
      {
        id: 'e1',
        title: 'Reflect on your day!',
        description: 'Evaluate what you accomplished and celebrate your wins.',
        category: 'reflection',
        duration: '10 min',
        icon: 'journal',
      },
      {
        id: 'e2',
        title: 'Clear your mind!',
        description:
          'Write down your thoughts or worries to free up mental space.',
        category: 'mindfulness',
        duration: '10 min',
        icon: 'brain',
      },
      {
        id: 'e3',
        title: 'Connect with loved ones!',
        description: 'Spend quality time with family or friends.',
        category: 'social',
        duration: '30 min',
        icon: 'family',
      },
      {
        id: 'e4',
        title: 'Prepare for tomorrow!',
        description: 'Plan tasks for the next day.',
        category: 'planning',
        duration: '10 min',
        icon: 'calendar',
      },
      {
        id: 'e5',
        title: 'Unwind!',
        description: 'Enjoy herbal tea and read a book.',
        category: 'relaxation',
        duration: '20 min',
        icon: 'tea',
      },
    ],
  },

  night: {
    timeRange: '20:00–06:00',
    advices: [
      {
        id: 'n1',
        title: 'Screen-free hour!',
        description: 'Put away gadgets an hour before bedtime.',
        category: 'wellness',
        duration: '60 min',
        icon: 'phone-off',
      },
      {
        id: 'n2',
        title: 'Relaxing bath!',
        description: 'Take a warm bath or shower to unwind.',
        category: 'relaxation',
        duration: '20 min',
        icon: 'bath',
      },
      {
        id: 'n3',
        title: 'Create a bedtime ritual!',
        description:
          'Find your way to relax before sleep — meditation, music, or reading.',
        category: 'routine',
        duration: '30 min',
        icon: 'moon',
      },
      {
        id: 'n4',
        title: 'Embrace the dark!',
        description: 'Ensure your room is dark and quiet for optimal sleep.',
        category: 'sleep',
        duration: '5 min',
        icon: 'dark-mode',
      },
      {
        id: 'n5',
        title: 'Sleep on time!',
        description: 'Try to go to bed at the same time each night.',
        category: 'routine',
        duration: '0 min',
        icon: 'bed',
      },
    ],
  },
};

// Helper function to get advice based on current time
export const getCurrentTimeAdvice = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 11) return dailyAdvice.morning;
  if (hour >= 11 && hour < 15) return dailyAdvice.daytime;
  if (hour >= 15 && hour < 20) return dailyAdvice.evening;
  return dailyAdvice.night;
};

// Helper function to get random advice from a specific time period
export const getRandomAdvice = timePeriod => {
  const advices = dailyAdvice[timePeriod].advices;
  return advices[Math.floor(Math.random() * advices.length)];
};
