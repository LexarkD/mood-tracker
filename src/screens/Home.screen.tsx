import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodPicker } from '../components/MoodPicker.tsx';
import { theme } from '../constants/theme.ts';

export const Home: React.FC = () => {
  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <MoodPicker />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: theme.COLOR_CONFIG_UI.screenBackground,
  },
});
