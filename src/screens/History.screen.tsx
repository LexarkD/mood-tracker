import React, { useRef, useCallback } from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { MarkEntryWithTimestamp } from '../store/slices/markListSlice.ts';
import { MarkItemRow } from '../components/MarkItemRow.tsx';
import useMarkList from '../hooks/useMarkList.ts';
import { theme } from '../constants/theme.ts';

const keyExtractor = (item: MarkEntryWithTimestamp) =>
  item.timestamp.toString();

export const History: React.FC = () => {
  const { markList, onDeleteMarkEntry } = useMarkList();
  const flatListRef = useRef<FlatList>(null);

  // NOTE: useFocusEffect отвечает за кратковременное отображение скролл индикатора при переходе на экран.
  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.flashScrollIndicators();
      return () => {};
    }, []),
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<MarkEntryWithTimestamp>) => {
      // NOTE: логика стилизации "зеброй" для MarkItemRow.
      const isEven = index % 2 === 0;
      return (
        <MarkItemRow mark={item} isEven={isEven} onDelete={onDeleteMarkEntry} />
      );
    },
    [onDeleteMarkEntry],
  );

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <FlatList
        // NOTE: removeClippedSubviews={true} конфликтует с удалением отметки свайпом. Можно будет выставить {true} после отказа от удаления свайпом.
        removeClippedSubviews={false}
        initialNumToRender={13}
        maxToRenderPerBatch={5}
        windowSize={7}
        ref={flatListRef}
        data={markList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: theme.COLOR_CONFIG_UI.screenBackground,
  },
});
