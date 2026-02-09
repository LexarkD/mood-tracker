import { configureStore } from '@reduxjs/toolkit';
import testCounterReducer from '../testRedux/testSlice.ts';
import moodListReducer from './moodListSlice.ts';
import moodPickerUIReducer from './moodPickerUISlice.ts';

export const store = configureStore({
  reducer: {
    moodPickerUI: moodPickerUIReducer,
    moodList: moodListReducer,
    testCounter: testCounterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
// const [hasSelected, setHasSelected] = useState(false);
