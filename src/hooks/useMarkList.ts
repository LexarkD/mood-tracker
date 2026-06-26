import { useCallback } from 'react';
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

  const onAddMarkEntry = useCallback(
    (selectedMarks: MarkEntryType) => {
      dispatch(addMarkEntry(selectedMarks));
    },
    [dispatch],
  );

  const onDeleteMarkEntry = useCallback(
    (timestamp: TimeStamp) => {
      dispatch(removeMarkEntry(timestamp));
    },
    [dispatch],
  );

  const onClearMarkList = useCallback(() => {
    dispatch(clearMarkList());
  }, [dispatch]);

  // NOTE: добавляет историю за 10 последниъх дней с случайными отметками.
  const onAddMockData = useCallback(() => {
    const mockDataArray = generateMockData();
    dispatch(addMockData(mockDataArray));
  }, [dispatch]);

  return {
    markList,
    onAddMarkEntry,
    onDeleteMarkEntry,
    onClearMarkList,
    onAddMockData,
  };
};

export default useMarkList;
