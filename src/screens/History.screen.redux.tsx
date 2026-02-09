import React from 'react';
import { ScrollView } from 'react-native';
import { MoodItemRowRedux } from '../components/MoodItemRow.redux.tsx';
import { useAppSelector } from '../hooks/redux.hooks.ts';
import { selectMoodList } from '../store/moodListSlice.ts';

export const HistoryRedux: React.FC = () => {
  const moodList = useAppSelector(selectMoodList);
  return (
    <ScrollView>
      {moodList.map(item => (
        <MoodItemRowRedux item={item} key={item.timestamp} />
      ))}
    </ScrollView>
  );
};
