import type { TimeFilterOptions } from '../components/AppPieChart';
import type { MarkEntryWithTimestamp } from '../store/slices/markListSlice';

type FilterMarkTime = (
  selectedFilterOptions: TimeFilterOptions,
  markList: MarkEntryWithTimestamp[],
) => MarkEntryWithTimestamp[];

export const filterMarkByTime: FilterMarkTime = (
  selectedFilterOptions,
  markList,
) => {
  if (selectedFilterOptions === 'all') {
    const filteredMark = markList;
    return filteredMark;
  }

  let timePeriod = 0;
  if (selectedFilterOptions === 'month') {
    timePeriod = 31;
  } else if (selectedFilterOptions === 'year') {
    timePeriod = 365;
  } else {
    return markList;
  }

  const nowDate = new Date();
  const startDate = new Date(nowDate);
  // NOTE correctionCoefficient = 1. необходим, так как отсчет от startDate.setHours(0, 0, 0, 0) до endDate.setHours(23, 59, 59, 999) захватывает один лишний день.
  const correctionCoefficient = 1;
  startDate.setDate(nowDate.getDate() - (timePeriod - correctionCoefficient));
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(nowDate);
  endDate.setHours(23, 59, 59, 999);
  const startPeriod = startDate.getTime();
  const endPeriod = endDate.getTime();

  return markList.filter(
    ({ timestamp }) => timestamp >= startPeriod && timestamp <= endPeriod,
  );
};
