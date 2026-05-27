import React, { useRef, useCallback } from 'react';
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { MarkEntryWithTimestamp } from '../store/slices/markListSlice.ts';
import { MarkItemRow } from '../components/MarkItemRow.tsx';
import useMarkList from '../hooks/useMarkList.ts';
import { AppText } from '../components/AppText.tsx';
import { theme } from '../constants/theme.ts';

export const History: React.FC = () => {
  const { onAddMockData, onClearMarkList, markList } = useMarkList();
  const flatListRef = useRef<FlatList>(null);

  // NOTE: useFocusEffect отвечает за кратковременное отображение скролл индикатора при переходе на экран.
  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.flashScrollIndicators();
      return () => {};
    }, []),
  );

  // TODO(feat): Добавить кнопку "burger button" сверху справа. Положить туда "Clear history"
  //   Настройка кнопки в заголовке для вызова бургер меню
  // https://reactnavigation.org/docs/header-buttons/
  // Реализация бургер- меню
  // https://github.com/gorhom/react-native-bottom-sheet
  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
      <View style={styles.serviceContainer}>
        <Pressable hitSlop={16} onPress={onClearMarkList}>
          <AppText style={styles.serviceText} variant="light">
            Clear history
          </AppText>
        </Pressable>
        <Pressable hitSlop={16} onPress={onAddMockData}>
          <AppText style={styles.serviceText} variant="light">
            Add Mock Data
          </AppText>
        </Pressable>
      </View>
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
  },
  serviceContainer: {
    flexDirection: 'row',
  },
  serviceText: {
    color: theme.colorBrown,
  },
});
