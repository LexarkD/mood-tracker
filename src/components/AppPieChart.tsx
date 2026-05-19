import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import useMarkList from '../hooks/useMarkList.ts';
import { theme } from '../constants/theme.ts';
import { AppHeaderText } from './AppHeaderText.tsx';
import { filterMarkTime } from '../utils/filterMarkTime.ts';
import { filterMarkOption } from '../utils/filterMarkOption.ts';

// TODO: Стилизовать кнопки под segmented buttons. Сделать три кнопки -  месяц, год, все время. Стилизация кнопки, которая нажата
// TODO: Сделать AppPieChart переиспользуемым. Для работы будет принимать пропсом ключ объекта состояния .

export type TimeFilterOptions = 'week' | 'month' | 'all';

type AppPieChartProps = { markOption: 'moodMark' | 'sleepMark' };

export const AppPieChart: React.FC<AppPieChartProps> = ({ markOption }) => {
  const { markList } = useMarkList();
  const [selectedFilterOptions, setSelectedFilterOptions] =
    useState<TimeFilterOptions>('all');

  // NOTE: получаю отфильтрованный массив эмоций, соответственно значению временного периода
  const filteredMarks = filterMarkTime(selectedFilterOptions, markList);

  // TEST !!!!!
  // NOTE: получаю собраный объект для pieChart и chartLegend.
  const chartData = filterMarkOption(filteredMarks, markOption);
  console.log(JSON.stringify(chartData, null, 2));

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
    borderRadius: 12,
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
