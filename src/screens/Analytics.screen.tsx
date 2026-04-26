import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppPieChart } from '../components/AppPieChart.tsx';
import { AppMoodEmoji } from '../components/AppMoodEmoji.tsx';
import type { MoodType } from '../store/slices/moodListSlice.ts';

const moodOptions: MoodType['description'][] = [
  'awesome',
  'happy',
  'neutral',
  'sad',
  'terrible',
];

export const Analytics: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <ScrollView>
        <View>
          <AppPieChart />
        </View>
        <View style={styles.moodList}>
          {moodOptions.map(mood => (
            <View key={mood}>
              <AppMoodEmoji size={50} description={mood} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
