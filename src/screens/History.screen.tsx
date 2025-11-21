import React from 'react';
import { useContext } from 'react';
import { ScrollView } from 'react-native';
import { AppContext } from '../App.provider.tsx';
import { MoodOptionWithTimestamp } from '../types.ts';
import { MoodItemRow } from '../components/MoodItemRow.tsx';

export const History: React.FC = () => {
  const { moodList } = useContext(AppContext);
  return (
    <ScrollView>
      {moodList.map((item: MoodOptionWithTimestamp) => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </ScrollView>
  );
};
