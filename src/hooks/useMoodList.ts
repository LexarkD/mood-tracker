import {
  addMark,
  removeMark,
  clearMarkList,
  selectMarkList,
} from '../store/slices/moodListSlice.ts';
import type {
  MarkEntryType,
  TimeStamp,
} from '../store/slices/moodListSlice.ts';
import { useAppDispatch, useAppSelector } from './redux.hooks.ts';

const useMarkList = () => {
  const markList = useAppSelector(selectMarkList);
  const dispatch = useAppDispatch();

  const onAddMark = (selectedMark: MarkEntryType) => {
    dispatch(addMark(selectedMark));
  };
  const onDeleteMark = (timestamp: TimeStamp) => {
    dispatch(removeMark(timestamp));
  };
  const onClearMarkList = () => {
    dispatch(clearMarkList());
  };
  return {
    markList,
    onAddMark,
    onDeleteMark,
    onClearMarkList,
  };
};

export default useMarkList;
