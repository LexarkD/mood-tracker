import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodPicker } from '../components/MoodPicker.tsx';
import { theme } from '../constants/theme.ts';

export const Home: React.FC = () => {
  return (
    // TODO: Ориентация будет залочена на вертикальной, кроме ввода комментарев с клавиатуры. Поэтому надо будет скорректирвоать SafeAreaView edges.
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
      <MoodPicker />
    </SafeAreaView>
  );
};

// TODO: Мне не нравится, что часть стилей находится тут, другая - в MoodPicker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colorGreen,
  },
});
