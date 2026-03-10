import React from 'react';
import { ScrollView } from 'react-native';
import type { MoodWithTimestamp } from '../store/slices/moodListSlice.ts';
import { MoodItemRow } from '../components/MoodItemRow.tsx';
import useMoodList from '../hooks/useMoodList.ts';

export const History: React.FC = () => {
  const { moodList } = useMoodList();
  return (
    <ScrollView>
      {moodList.map((item: MoodWithTimestamp) => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </ScrollView>
  );
};
