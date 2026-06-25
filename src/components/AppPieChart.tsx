import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
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
          <View style={styles.legendItem} key={item.description}>
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
      <View style={[styles.segmentButtonsContainer, theme.shadowStyle]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonLeft,
            {
              backgroundColor:
                selectedFilterOptions === 'all'
                  ? theme.COLOR_CONFIG_UI.buttonIsPressed
                  : theme.COLOR_CONFIG_UI.button,
            },
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => setSelectedFilterOptions('all')}
        >
          <AppText variant="button">ALL</AppText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor:
                selectedFilterOptions === 'year'
                  ? theme.COLOR_CONFIG_UI.buttonIsPressed
                  : theme.COLOR_CONFIG_UI.button,
            },
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => setSelectedFilterOptions('year')}
        >
          <AppText variant="button">YEAR</AppText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonRight,
            {
              backgroundColor:
                selectedFilterOptions === 'month'
                  ? theme.COLOR_CONFIG_UI.buttonIsPressed
                  : theme.COLOR_CONFIG_UI.button,
            },
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => setSelectedFilterOptions('month')}
        >
          <AppText variant="button">MONTH</AppText>
        </Pressable>
      </View>

      <View style={styles.chartContainer}>
        <PieChart data={chartData} radius={120} />
      </View>
      <View>{renderLegend()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing.m,
    marginHorizontal: theme.spacing.s,
    padding: theme.spacing.m,
    borderRadius: 12,
    backgroundColor: theme.COLOR_CONFIG_UI.cardBackground,
  },
  segmentButtonsContainer: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: theme.spacing.s,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  buttonLeft: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  buttonRight: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
    flexBasis: '46%',
  },
  legendDot: {
    height: 16,
    width: 16,
    borderRadius: 8,
  },
});
