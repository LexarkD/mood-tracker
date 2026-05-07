import React from 'react';
import { View, StyleSheet, LayoutAnimation } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { format } from 'date-fns/format';
import type { EntryMarkWithTimestamp } from '../store/slices/moodListSlice.ts';
import useMarkList from '../hooks/useMoodList.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { AppMoodEmoji } from './AppMoodEmoji.tsx';
//TODO добавить аккардион, с разворотом всех опций
type MarkRowProps = {
  mark: EntryMarkWithTimestamp;
  isEven: boolean;
};
//TODO: MoodItemRow ренейм в MarkItemRow
export const MoodItemRow: React.FC<MarkRowProps> = ({ mark, isEven }) => {
  const { onDeleteMark } = useMarkList();

  const removeWithDelay = () => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onDeleteMark(mark.timestamp);
    }, 250);
  };

  const offset = useSharedValue<number>(0);
  const maxPan = 80;

  const pan = Gesture.Pan()
    .minDistance(10)
    .failOffsetY([-1, 1])
    .onChange(event => {
      offset.value = event.translationX;
    })
    .onEnd(() => {
      if (Math.abs(offset.value) > maxPan) {
        offset.value = withTiming(Math.sign(offset.value) * 2000);
        scheduleOnRN(removeWithDelay);
      } else {
        offset.value = withTiming(0);
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          animatedStyles,
          styles.moodItem,
          isEven ? styles.evenItemZebra : styles.oddItemZebra,
        ]}
      >
        <View style={styles.emojiAndDescription}>
          <AppMoodEmoji
            style={styles.emojiValue}
            size={theme.iconSize.medium}
            description={mark.moodOptions}
          />
          <AppText style={styles.moodDescription} variant="bold">
            {mark.moodOptions}
          </AppText>
        </View>
        <AppText style={styles.moodDate}>
          {format(new Date(mark.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </AppText>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  emojiValue: {
    marginRight: 20,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorBrown,
  },
  moodItem: {
    height: 60,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  evenItemZebra: {
    backgroundColor: theme.colorWhiteCold,
  },
  oddItemZebra: {
    backgroundColor: theme.colorWhiteHeat,
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorBrown,
  },
  emojiAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colorBlue,
  },
});
