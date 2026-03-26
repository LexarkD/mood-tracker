import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import type { MoodType } from '../store/slices/moodListSlice.ts';
import useMoodList from '../hooks/useMoodList.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';

type MoodFilterOptions = 'week' | 'all';

export const AppPieChart: React.FC = () => {
  const [selectedMoodFilter, setSelectedMoodFilter] =
    useState<MoodFilterOptions>('all');

  const { moodList } = useMoodList();

  const selectedPieData = () => {
    const getFiltredMood = () => {
      if (selectedMoodFilter === 'all') {
        const filtredMood = moodList;
        return filtredMood;
      } else {
        const nowDate = new Date();
        const startDate = new Date(nowDate);
        startDate.setDate(nowDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(nowDate);
        endDate.setHours(23, 59, 59, 999);
        const start = startDate.getTime();
        const end = endDate.getTime();

        const filtredMood = moodList.filter(
          ({ timestamp }) => timestamp >= start && timestamp <= end,
        );
        return filtredMood;
      }
    };

    type PartialMoodCount = Partial<Record<MoodType['description'], number>>;

    const moodCount = getFiltredMood().reduce<PartialMoodCount>(
      (acc, { description }) => {
        acc[description] = (acc[description] || 0) + 1;
        return acc;
      },
      {},
    );

    const chartData = [
      { value: moodCount.funny || 0, color: '#90C343' },
      { value: moodCount.neutral || 0, color: '#FDCE37' },
      { value: moodCount.sad || 0, color: '#E9333E' },
    ];
    return chartData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setSelectedMoodFilter('all')}
        >
          <AppText style={styles.buttonText} variant="bold">
            All
          </AppText>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setSelectedMoodFilter('week')}
        >
          <AppText style={styles.buttonText} variant="bold">
            Week
          </AppText>
        </Pressable>
      </View>

      <View style={styles.pie}>
        <PieChart
          donut
          innerRadius={80}
          data={selectedPieData()}
          showValuesAsLabels={true}
          showText
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  pie: {
    marginVertical: 100,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colorPurple,
    height: 40,
    paddingVertical: 10,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    color: theme.colorWhite,
    textAlign: 'center',
  },
});
