import React, { useRef, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { MarkEntryWithTimestamp } from '../store/slices/markListSlice.ts';
import { MarkItemRow } from '../components/MarkItemRow.tsx';
import useMarkList from '../hooks/useMarkList.ts';

import { theme } from '../constants/theme.ts';

export const History: React.FC = () => {
  const { markList } = useMarkList();
  const flatListRef = useRef<FlatList>(null);

  // NOTE: useFocusEffect отвечает за кратковременное отображение скролл индикатора при переходе на экран.
  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.flashScrollIndicators();
      return () => {};
    }, []),
  );

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={markList}
        renderItem={({ item, index }) => {
          // NOTE: логика стилизации "зеброй" для MarkItemRow.
          const isEven = index % 2 === 0;
          return <MarkItemRow mark={item} isEven={isEven} />;
        }}
        keyExtractor={(item: MarkEntryWithTimestamp) =>
          item.timestamp.toString()
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorGreen,
    padding: 10,
  },
});
