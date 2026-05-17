import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import type { MoodType } from '../store/slices/markListSlice.ts';
import useMarkList from '../hooks/useMoodList.ts';
import { theme } from '../constants/theme.ts';
import { AppHeaderText } from './AppHeaderText.tsx';

type PartialMoodCount = Partial<Record<MoodType, number>>;

type ChartItem = {
  value: number;
  color: string;
  description: MoodType;
  percent: number;
};

type MoodFilterOptions = 'week' | 'all';

export const AppPieChart: React.FC = () => {
  const { markList } = useMarkList();
  const [selectedFilterOptions, setSelectedFilterOptions] =
    useState<MoodFilterOptions>('all');

  const moodFilter = () => {
    if (selectedFilterOptions === 'all') {
      const filteredMood = markList;
      return filteredMood;
    } else {
      const nowDate = new Date();
      const startDate = new Date(nowDate);
      startDate.setDate(nowDate.getDate() - 2);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(nowDate);
      endDate.setHours(23, 59, 59, 999);
      const start = startDate.getTime();
      const end = endDate.getTime();

      const filteredMood = markList.filter(
        ({ timestamp }) => timestamp >= start && timestamp <= end,
      );

      return filteredMood;
    }
  };

  const filteredMood = moodFilter();

  const countChartData = () => {
    const moodCount = filteredMood.reduce<PartialMoodCount>(
      (acc, { moodOptions }) => {
        acc[moodOptions] = (acc[moodOptions] || 0) + 1;
        return acc;
      },
      {},
    );

    const moodPercent = (mood = 0) => {
      const summMood = filteredMood.length;
      const percentMood = (mood * 100) / summMood;
      return Math.round(percentMood);
    };

    const chartData: ChartItem[] = [
      {
        value: moodCount.awesome || 0,
        color: 'rgb(96, 178, 85)',
        description: 'awesome',
        percent: moodPercent(moodCount.awesome) || 0,
      },
      {
        value: moodCount.happy || 0,
        color: 'rgba(178,214,28,1)',
        description: 'happy',
        percent: moodPercent(moodCount.happy) || 0,
      },
      {
        value: moodCount.neutral || 0,
        color: 'rgba(239,221,7,1)',
        description: 'neutral',
        percent: moodPercent(moodCount.neutral) || 0,
      },
      {
        value: moodCount.sad || 0,
        color: 'rgb(245, 156, 47)',
        description: 'sad',
        percent: moodPercent(moodCount.sad) || 0,
      },
      {
        value: moodCount.terrible || 0,
        color: 'rgb(240, 105, 1)',
        description: 'terrible',
        percent: moodPercent(moodCount.terrible) || 0,
      },
    ];
    return chartData;
  };

  const chartData = countChartData();

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {chartData.map(item => (
          <View key={item.description} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <AppHeaderText style={styles.legendText}>
              {item.description}: {item.percent}%
            </AppHeaderText>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setSelectedFilterOptions('all')}
        >
          <AppHeaderText style={styles.buttonAppText} variant="bold">
            All
          </AppHeaderText>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setSelectedFilterOptions('week')}
        >
          <AppHeaderText style={styles.buttonAppText} variant="bold">
            Week
          </AppHeaderText>
        </Pressable>
      </View>
      <View style={styles.pie}>
        <PieChart data={chartData} radius={120} />
      </View>
      <View>{renderLegend()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
  pie: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colorOrange,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonAppText: {
    fontSize: 15,
    color: theme.colorWhite,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '40%',
    flexGrow: 1,
    marginHorizontal: 10,
  },
  legendDot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    color: theme.colorBrown,
  },
});
