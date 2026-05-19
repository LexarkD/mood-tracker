import {
  MoodType,
  SleepType,
  sleepOptions,
  moodOptions,
} from '../store/slices/markListSlice.ts';
import type { MarkEntryWithTimestamp } from '../store/slices/markListSlice.ts';

type KeyOption = 'moodMark' | 'sleepMark';

export type ChartItem = {
  value: number;
  color: string;
  description: MoodType | SleepType;
  percent: number;
};

// NOTE: цветовая палитра вариантов выбора
// TODO: Вынести в constants и переиспользовать внутри SVG
const VISUAL_CONFIG: Record<MoodType | SleepType, string> = {
  awesome: 'rgb(96, 178, 85)',
  happy: 'rgba(178,214,28,1)',
  neutral: 'rgba(239,221,7,1)',
  sad: 'rgb(245, 156, 47)',
  terrible: 'rgb(240, 105, 1)',

  cheerful: 'rgb(43, 147, 251)',
  norm: 'rgb(42, 114, 231)',
  sleepy: 'rgb(76, 68, 192)',
};

// TODO: этот вспомогательный объект нужен по сути из-за нейминга. Потому что вначале moodOptions позже становится moodMark в стейте. Возможно стоит остановится на одном имене.
const OPTIONS_BY_KEY = {
  moodMark: moodOptions,
  sleepMark: sleepOptions,
};

// NOTE: Отделяет нужные значения от общего объекта значений в состоянии, взависимости от выбранного ключа
export const filterMarkOption = <K extends KeyOption>(
  marks: MarkEntryWithTimestamp[],
  keyOption: K,
): ChartItem[] => {
  const extractedValues = marks.map(mark => mark[keyOption]);

  // NOTE: Считает количество значение для выбранной опции
  const counts = extractedValues.reduce<Record<string, number>>(
    (acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    },
    {},
  );

  //  NOTE: Функция считает процент выбранной опции от общего количества
  const calculatePercent = (count = 0) => {
    const total = extractedValues.length;
    if (total === 0) return 0;
    return Math.round((count * 100) / total);
  };

  // NOTE: Динамически собирает объект для статистики, взависимости от того, какая опция выбрана
  const currentOptions = OPTIONS_BY_KEY[keyOption];

  const chartData: ChartItem[] = currentOptions.map(option => {
    const value = counts[option] || 0;

    return {
      value,
      color: VISUAL_CONFIG[option],
      description: option,
      percent: calculatePercent(value),
    };
  });

  return chartData;
};

// NOTE: Ожидаемая структура объекта chartData:
//   const chartData = [
//     {
//       value: countMark.awesome || 0,
//       color: 'rgb(96, 178, 85)',
//       description: 'awesome',
//       percent: calculatePercent(countMark.awesome) || 0,
//     },
//     {
//       value: countMark.happy || 0,
//       color: 'rgba(178,214,28,1)',
//       description: 'happy',
//       percent: calculatePercent(countMark.happy) || 0,
//     },
//     {
//       value: countMark.neutral || 0,
//       color: 'rgba(239,221,7,1)',
//       description: 'neutral',
//       percent: calculatePercent(countMark.neutral) || 0,
//     },
//     {
//       value: countMark.sad || 0,
//       color: 'rgb(245, 156, 47)',
//       description: 'sad',
//       percent: calculatePercent(countMark.sad) || 0,
//     },
//     {
//       value: countMark.terrible || 0,
//       color: 'rgb(240, 105, 1)',
//       description: 'terrible',
//       percent: calculatePercent(countMark.terrible) || 0,
//     },
//   ];
