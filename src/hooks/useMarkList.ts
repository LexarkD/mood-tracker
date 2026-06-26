import { generateMockData } from '../utils/generateMockData.ts';
import {
  addMarkEntry,
  removeMarkEntry,
  clearMarkList,
  addMockData,
  selectMarkList,
} from '../store/slices/markListSlice.ts';
import type {
  MarkEntryType,
  TimeStamp,
} from '../store/slices/markListSlice.ts';
import { useAppDispatch, useAppSelector } from './redux.hooks.ts';

// NOTE: useMarkList - кастомный хук-обертка для markListSlice редюсеров
const useMarkList = () => {
  const markList = useAppSelector(selectMarkList);
  const dispatch = useAppDispatch();

  const onAddMarkEntry = (selectedMarks: MarkEntryType) => {
    dispatch(addMarkEntry(selectedMarks));
  };
  const onDeleteMarkEntry = (timestamp: TimeStamp) => {
    dispatch(removeMarkEntry(timestamp));
  };
  const onClearMarkList = () => {
    dispatch(clearMarkList());
  };
  // NOTE: добавляет историю за 10 последниъх дней с случайными отметками.
  const onAddMockData = () => {
    const mockDataArray = generateMockData();
    dispatch(addMockData(mockDataArray));
  };
  return {
    markList,
    onAddMarkEntry,
    onDeleteMarkEntry,
    onClearMarkList,
    onAddMockData,
  };
};

export default useMarkList;
