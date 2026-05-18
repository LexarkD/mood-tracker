import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import type { MoodType } from '../store/slices/markListSlice.ts';
import useMarkList from '../hooks/useMarkList.ts';
import { theme } from '../constants/theme.ts';
import { AppHeaderText } from './AppHeaderText.tsx';

// TODO: Стилизовать кнопки под segmented buttons. Сделать три кнопки -  месяц, год, все время. Стилизация кнопки, которая нажата
// TODO: Сделать AppPieChart переиспользуемым. Для работы будет принимать пропсом ключ объекта состояния .
//type PieChartProps = 'moodMark' | 'sleepMark';

type PartialMoodCount = Partial<Record<MoodType, number>>;

type ChartItem = {
  value: number;
  color: string;
  description: MoodType;
  percent: number;
};

type TimeFilterOptions = 'week' | 'all';

export const AppPieChart: React.FC = () => {
  const { markList } = useMarkList();
  const [selectedFilterOptions, setSelectedFilterOptions] =
    useState<TimeFilterOptions>('all');
  // NOTE: Функция хелпер, фильтрация массива (эмоций) по периоду времени.
  // TODO: Вынести функцию как отдельную утилиту. Передавать вкачестве аргумента timePeriod? Переиспользовать для разный pieChart.
  const timePeriod = 1;
  const markTimeFilter = () => {
    if (selectedFilterOptions === 'all') {
      const filteredMark = markList;
      return filteredMark;
    } else {
      const nowDate = new Date();
      const startDate = new Date(nowDate);
      startDate.setDate(nowDate.getDate() - timePeriod);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(nowDate);
      endDate.setHours(23, 59, 59, 999);
      const startPeriod = startDate.getTime();
      const endPeriod = endDate.getTime();

      const filteredMark = markList.filter(
        ({ timestamp }) => timestamp >= startPeriod && timestamp <= endPeriod,
      );

      return filteredMark;
    }
  };
  // NOTE: получаю отфильтрованный массив эмоций, соответственно значению временного периода
  // TODO: Я могу импортировать в PieChart функцию хелпер и вызывать ее внутри компонента.
  const filteredMarks = markTimeFilter();
  console.log(`отфильтрованный стейт ${filteredMarks.length}`);
  // NOTE: функция countChartData собирает объект moodCount для pieChart и chartLegend.
  // TODO: Попробовать вынести функцию хелпер из компонента. Вызывать ее из компонента, передавая вкачестве аргумента ключ, по которому должны быть посчитаны все значения
  // TODO: Перед countChartData можно сразу отделить нужный объект с опциями внутри filteredMarks

  // FiltredMark - коллекция объектов типа:
  // {
  //  moodMark: MoodType,
  //  sleepMark: SleepType,
  //  timestamp: TimeStamp,
  // }

  const countChartData = () => {
    const markCount = filteredMarks.reduce<PartialMoodCount>(
      (acc, { moodMark }) => {
        acc[moodMark] = (acc[moodMark] || 0) + 1;
        return acc;
      },
      {},
    );

    const moodPercent = (mood = 0) => {
      const summMood = filteredMarks.length;
      const percentMood = (mood * 100) / summMood;
      return Math.round(percentMood);
    };

    const chartData: ChartItem[] = [
      {
        value: markCount.awesome || 0,
        color: 'rgb(96, 178, 85)',
        description: 'awesome',
        percent: moodPercent(markCount.awesome) || 0,
      },
      {
        value: markCount.happy || 0,
        color: 'rgba(178,214,28,1)',
        description: 'happy',
        percent: moodPercent(markCount.happy) || 0,
      },
      {
        value: markCount.neutral || 0,
        color: 'rgba(239,221,7,1)',
        description: 'neutral',
        percent: moodPercent(markCount.neutral) || 0,
      },
      {
        value: markCount.sad || 0,
        color: 'rgb(245, 156, 47)',
        description: 'sad',
        percent: moodPercent(markCount.sad) || 0,
      },
      {
        value: markCount.terrible || 0,
        color: 'rgb(240, 105, 1)',
        description: 'terrible',
        percent: moodPercent(markCount.terrible) || 0,
      },
    ];
    return chartData;
  };
  // NOTE: получаю собраный объект для pieChart и chartLegend.
  // TODO: Это должно остаться внутри компонента. Тут буду вызывать функцию хелпер.
  const chartData = countChartData();

  // NOTE: Функция отрисовывает chartLegend. По сути мапит chartData.
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
