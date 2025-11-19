import React from 'react';
import { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types.ts';
import { MoodPicker } from '../components/MoodPicker';
import { MoodItemRow } from '../components/MoodItemRow.tsx';

export const Home: React.FC = () => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(current => [...current, { mood, timestamp: Date.now() }]);
  }, []);

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
      {moodList.map(item => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

// мне не нравится порядок лога- новые записи появляются в внизу списка, а не вверху
// Есть сомнения в эффективности useCallback, так как у меня перерисовываются все компоненты при любом взаимодействии.
