import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppPieChart } from '../components/AppPieChart.tsx';
import { theme } from '../constants/theme.ts';

export const Analytics: React.FC = () => {
  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <AppPieChart markOption="moodMark" />
        <AppPieChart markOption="sleepMark" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: theme.COLOR_CONFIG_UI.screenBackground,
  },
  contentContainer: {
    gap: 8,
  },
});
