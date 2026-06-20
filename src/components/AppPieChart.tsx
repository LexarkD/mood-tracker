import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { PieChart } from 'react-native-gifted-charts';
import useMarkList from '../hooks/useMarkList.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { filterMarkByTime } from '../utils/filterMarkByTime.ts';
import { calculateChartData } from '../utils/calculateChartData.ts';

// TODO(style): Сделать стилизацию консистентной
export type TimeFilterOptions = 'all' | 'year' | 'month';

type AppPieChartProps = { markOption: 'moodMark' | 'sleepMark' };

export const AppPieChart: React.FC<AppPieChartProps> = ({ markOption }) => {
  const { markList } = useMarkList();
  const [selectedFilterOptions, setSelectedFilterOptions] =
    useState<TimeFilterOptions>('all');

  // NOTE: получаю отфильтрованный массив эмоций, соответственно значению временного периода
  const filteredMarks = filterMarkByTime(selectedFilterOptions, markList);

  // NOTE: получаю собраный объект для pieChart и chartLegend.
  const chartData = calculateChartData(filteredMarks, markOption);

  // NOTE: Функция отрисовывает chartLegend. По сути мапит chartData.
  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {chartData.map(item => (
          <View key={item.description} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <AppText variant="h2">
              {item.description}: {item.percent}%
            </AppText>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, theme.shadowStyle]}>
      <SegmentedButtons
        value={selectedFilterOptions}
        onValueChange={setSelectedFilterOptions}
        style={styles.button}
        // NOTE: theme задает новые скругления и убирает дефолтную черную границу
        theme={{
          roundness: 3,
          colors: {
            outline: 'transparent',
          },
        }}
        buttons={[
          {
            value: 'all',
            label: 'ALL',
            labelStyle: theme.typography.button,
            style: {
              // NOTE: задаю кастомный разделитель и задаю цвет при нажатии. Остальные кнопки по аналогии.
              borderRightWidth: 1,
              borderRightColor: theme.colorWhite,
              backgroundColor:
                selectedFilterOptions === 'all'
                  ? theme.colorOrange
                  : theme.colorYellow,
            },
          },
          {
            value: 'year',
            label: 'YEAR',
            labelStyle: theme.typography.button,
            style: {
              borderRightWidth: 1,
              borderRightColor: theme.colorWhite,
              backgroundColor:
                selectedFilterOptions === 'year'
                  ? theme.colorOrange
                  : theme.colorYellow,
            },
          },
          {
            value: 'month',
            label: 'MONTH',
            labelStyle: theme.typography.button,
            style: {
              backgroundColor:
                selectedFilterOptions === 'month'
                  ? theme.colorOrange
                  : theme.colorYellow,
            },
          },
        ]}
      />
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
  pie: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
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
});
