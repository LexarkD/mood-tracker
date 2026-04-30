import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import type { MoodType } from '../store/slices/moodListSlice.ts';
import useMoodList from '../hooks/useMoodList.ts';
import { theme } from '../constants/theme.ts';
import { AppHeaderText } from './AppHeaderText.tsx';

type PartialMoodCount = Partial<Record<MoodType, number>>;

type ChartItem = {
  value: number;
  color: string;
  description: MoodType;
};

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

    const moodCount = getFiltredMood().reduce<PartialMoodCount>(
      (acc, { description }) => {
        acc[description] = (acc[description] || 0) + 1;
        return acc;
      },
      {},
    );

    const chartData: ChartItem[] = [
      {
        value: moodCount.awesome || 0,
        color: 'rgb(96, 178, 85)',
        description: 'awesome',
      },
      {
        value: moodCount.happy || 0,
        color: 'rgba(178,214,28,1)',
        description: 'happy',
      },
      {
        value: moodCount.neutral || 0,
        color: 'rgba(239,221,7,1)',
        description: 'neutral',
      },
      {
        value: moodCount.sad || 0,
        color: 'rgb(245, 156, 47)',
        description: 'sad',
      },
      {
        value: moodCount.terrible || 0,
        color: 'rgb(240, 105, 1)',
        description: 'terrible',
      },
    ];
    return chartData;
  };
  // TODO: renderLegend должен считать и отображать процентное значение.
  // TODO: Вынести renderLegend в отдельный компонент. Мапить его внутри AppPieChart.
  // TODO: Переработать стилизацию renderLegend.

  const renderLegend = (chartData: ChartItem[]) => {
    const renderDot = (color: string) => {
      return (
        <View
          style={{
            height: 15,
            width: 15,
            borderRadius: 10,
            backgroundColor: color,
            marginRight: 10,
          }}
        />
      );
    };
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              width: 120,
              marginRight: 15,
            }}
          >
            {renderDot(chartData[0].color)}
            <AppHeaderText style={{ color: theme.colorBrown }}>
              {chartData[0].description}: {chartData[0].value}
            </AppHeaderText>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}
          >
            {renderDot(chartData[1].color)}
            <AppHeaderText style={{ color: theme.colorBrown }}>
              {chartData[1].description}: {chartData[1].value}
            </AppHeaderText>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}
          >
            {renderDot(chartData[2].color)}
            <AppHeaderText style={{ color: theme.colorBrown }}>
              {chartData[2].description}: {chartData[2].value}
            </AppHeaderText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot(chartData[3].color)}
            <AppHeaderText style={{ color: theme.colorBrown }}>
              {chartData[3].description}: {chartData[3].value}
            </AppHeaderText>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}
          >
            {renderDot(chartData[4].color)}
            <AppHeaderText style={{ color: theme.colorBrown }}>
              {chartData[4].description}: {chartData[4].value}
            </AppHeaderText>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setSelectedMoodFilter('all')}
        >
          <AppHeaderText style={styles.buttonAppText} variant="bold">
            All
          </AppHeaderText>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setSelectedMoodFilter('week')}
        >
          <AppHeaderText style={styles.buttonAppText} variant="bold">
            Week
          </AppHeaderText>
        </Pressable>
      </View>

      <View style={styles.pie}>
        <PieChart data={selectedPieData()} radius={120} />
      </View>
      <View>{renderLegend(selectedPieData())}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 450,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  pie: {
    alignItems: 'center',
    marginBottom: 10,
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
});
