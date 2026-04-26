import React, { useRef, useCallback } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { MoodWithTimestamp } from '../store/slices/moodListSlice.ts';
import { MoodItemRow } from '../components/MoodItemRow.tsx';
import useMoodList from '../hooks/useMoodList.ts';
import { AppText } from '../components/AppText.tsx';
import { theme } from '../constants/theme.ts';

export const History: React.FC = () => {
  const { onClearMoodList, moodList } = useMoodList();
  const flatListRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.flashScrollIndicators();
      return () => {};
    }, []),
  );

  return (
    <SafeAreaView edges={['top', 'right', 'left']}>
      <Pressable hitSlop={16} onPress={onClearMoodList}>
        <AppText style={styles.deleteText} variant="light">
          Clear history
        </AppText>
      </Pressable>
      <FlatList
        ref={flatListRef}
        data={moodList}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return <MoodItemRow mood={item} isEven={isEven} />;
        }}
        keyExtractor={(item: MoodWithTimestamp) => item.timestamp.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteText: {
    color: theme.colorBlue,
  },
});
