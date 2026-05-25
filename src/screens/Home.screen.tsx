import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodPicker } from '../components/MoodPicker.tsx';
import { theme } from '../constants/theme.ts';

export const Home: React.FC = () => {
  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
      <MoodPicker />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colorGreen,
  },
});
