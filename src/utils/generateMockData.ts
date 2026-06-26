import {
  MARK_OPTIONS,
  MarkEntryWithTimestamp,
} from '../store/slices/markListSlice';

// NOTE: Создает случайную историю за отрезок времени
const moods = MARK_OPTIONS.moodMark;
const sleepQuality = MARK_OPTIONS.sleepMark;
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
