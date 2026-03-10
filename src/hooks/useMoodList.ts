import {
  addMood,
  removeMood,
  clearMoods,
  selectMoodList,
} from '../store/slices/moodListSlice.ts';
import type { MoodType, TimeStamp } from '../store/slices/moodListSlice.ts';
import { useAppDispatch, useAppSelector } from './redux.hooks.ts';

const useMoodList = () => {
  const moodList = useAppSelector(selectMoodList);
  const dispatch = useAppDispatch();

  const onAddMood = (selectedMood: MoodType) => {
    //мой addMood reducer использует prepare - добавляет timestamp. Но вообще я могу сделать это здесь - в кастомном хуке, но не уверен, что хочу.
    dispatch(addMood(selectedMood));
  };
  const onDeleteMood = (timestamp: TimeStamp) => {
    dispatch(removeMood(timestamp));
  };
  const onClearMoodList = () => {
    dispatch(clearMoods());
  };
  return {
    moodList,
    onAddMood,
    onDeleteMood,
    onClearMoodList,
  };
};

export default useMoodList;
