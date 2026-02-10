import React from 'react';
import { ScrollView } from 'react-native';
import { useAppSelector } from '../hooks/redux.hooks.ts';
import type { MoodWithTimestamp } from '../store/moodListSlice.ts';
import { selectMoodList } from '../store/moodListSlice.ts';
import { MoodItemRow } from '../components/MoodItemRow.tsx';

export const History: React.FC = () => {
  const moodList = useAppSelector(selectMoodList);
  return (
    <ScrollView>
      {moodList.map((item: MoodWithTimestamp) => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </ScrollView>
  );
};
