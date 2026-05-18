import {
  addMarkEntry,
  removeMarkEntry,
  clearMarkList,
  selectMarkList,
} from '../store/slices/markListSlice.ts';
import type {
  MarkEntryType,
  TimeStamp,
} from '../store/slices/markListSlice.ts';
import { useAppDispatch, useAppSelector } from './redux.hooks.ts';

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
  return {
    markList,
    onAddMarkEntry,
    onDeleteMarkEntry,
    onClearMarkList,
  };
};

export default useMarkList;

// TODO: useMarkList - кастомный хук-обертка для markListSlice редюсеров
