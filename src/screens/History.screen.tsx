import React, { useRef, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { MoodWithTimestamp } from '../store/slices/moodListSlice.ts';
import { MoodItemRow } from '../components/MoodItemRow.tsx';
import useMoodList from '../hooks/useMoodList.ts';

export const History: React.FC = () => {
  const { moodList } = useMoodList();
  const flatListRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.flashScrollIndicators();
      return () => {};
    }, []),
  );

  return (
    <FlatList
      ref={flatListRef}
      data={moodList}
      renderItem={({ item, index }) => {
        const isEven = index % 2 === 0;
        return <MoodItemRow item={item} isEven={isEven} />;
      }}
      keyExtractor={(item: MoodWithTimestamp) => item.timestamp.toString()}
    />
  );
};
