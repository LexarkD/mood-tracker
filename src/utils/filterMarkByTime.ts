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
  if (selectedFilterOptions === 'week') {
    timePeriod = 7;
  } else if (selectedFilterOptions === 'month') {
    timePeriod = 31;
  } else {
    return markList;
  }

  const nowDate = new Date();
  const startDate = new Date(nowDate);
  startDate.setDate(nowDate.getDate() - (timePeriod - 1));
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(nowDate);
  endDate.setHours(23, 59, 59, 999);
  const startPeriod = startDate.getTime();
  const endPeriod = endDate.getTime();

  return markList.filter(
    ({ timestamp }) => timestamp >= startPeriod && timestamp <= endPeriod,
  );
};
