import React, { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';
import type { MoodWithTimestamp } from '../store/slices/moodListSlice.ts';
import { MoodItemRow } from '../components/MoodItemRow.tsx';
import useMoodList from '../hooks/useMoodList.ts';

export const History: React.FC = () => {
  const { moodList } = useMoodList();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (moodList.length > 0) {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  }, [moodList.length]);

  return (
    <FlatList
      ref={flatListRef}
      data={moodList}
      renderItem={({ item }: { item: MoodWithTimestamp }) => (
        <MoodItemRow item={item} />
      )}
      keyExtractor={(item: MoodWithTimestamp) => item.timestamp.toString()}
    />
  );
};
