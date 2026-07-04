import {
  MoodType,
  SleepType,
  MARK_OPTIONS,
} from '../store/slices/markListSlice.ts';
import type { MarkEntryWithTimestamp } from '../store/slices/markListSlice.ts';
import { theme } from '../constants/theme.ts';

export type ChartItem = {
  value: number;
  color: string;
  description: MoodType | SleepType;
  percent: number;
};

type ValidKeyType = 'moodMark' | 'sleepMark';

type СalculateDataType = (
  marks: MarkEntryWithTimestamp[],
  keyMark: ValidKeyType,
) => ChartItem[];

export const calculateChartData: СalculateDataType = (marks, keyMark) => {
  // NOTE: Отделяет нужные отметки, взависимости от выбранного ключа KeyOption
  const extractedMarkValues = marks.map(mark => mark[keyMark]);

  // NOTE: Считает количество отметок для выбранной опции
  const countMarks = extractedMarkValues.reduce<Record<string, number>>(
    (acc, mark) => {
      acc[mark] = (acc[mark] || 0) + 1;
      return acc;
    },
    {},
  );

  //  NOTE: Функция считает процент выбранных отметок от общего количества
  const calculateMarkPercent = (count = 0) => {
    const totalMarkValues = extractedMarkValues.length;
    if (totalMarkValues === 0) return 0;
    return Math.round((count * 100) / totalMarkValues);
  };

  // NOTE: Динамически собирает объект для статистики, взависимости от того, какая опция выбрана
  const currentMarks = MARK_OPTIONS[keyMark];

  const chartData = currentMarks.map(mark => {
    const value = countMarks[mark] || 0;

    return {
      value,
      color: theme.COLOR_CONFIG_EMOJI[mark],
      description: mark,
      percent: calculateMarkPercent(value),
    };
  });

  return chartData;
};

// NOTE: Пример ожидаемой структуры объекта chartData:
//   const chartData = [
//   {
//     "value": 1,
//     "color": "rgb(96, 178, 85)",
//     "description": "great",
//     "percent": 9
//   },
//   {
//     "value": 1,
//     "color": "rgba(178,214,28,1)",
//     "description": "happy",
//     "percent": 9
//   },
//   {
//     "value": 6,
//     "color": "rgba(239,221,7,1)",
//     "description": "neutral",
//     "percent": 55
//   },
//   {
//     "value": 3,
//     "color": "rgb(245, 156, 47)",
//     "description": "sad",
//     "percent": 27
//   },
//   {
//     "value": 0,
//     "color": "rgb(240, 105, 1)",
//     "description": "awful",
//     "percent": 0
//   }
// ]
