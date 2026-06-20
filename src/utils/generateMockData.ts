import {
  MarkEntryWithTimestamp,
  MoodType,
  SleepType,
} from '../store/slices/markListSlice';

const moods: MoodType[] = ['great', 'happy', 'neutral', 'sad', 'awful'];
const sleepQuality: SleepType[] = ['cheerful', 'norm', 'sleepy'];
// NOTE: Создает случайную историю за отрезок времени
const timePeriod = 434;
export const generateMockData = (): MarkEntryWithTimestamp[] => {
  return Array.from({ length: timePeriod }).map((_, index) => {
    const timestamp = Date.now() - index * 86400000;

    return {
      timestamp,
      moodMark: moods[Math.floor(Math.random() * moods.length)],
      sleepMark: sleepQuality[Math.floor(Math.random() * sleepQuality.length)],
    };
  });
};
