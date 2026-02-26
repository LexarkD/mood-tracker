import React from 'react';
import { View, Pressable, StyleSheet, LayoutAnimation } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { format } from 'date-fns/format';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import type { MoodWithTimestamp } from '../store/slices/moodListSlice.ts';
import useMoodList from '../hooks/useMoodList.ts';

type MoodItemRowProps = {
  item: MoodWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const { onDeleteMood } = useMoodList();

  const handleDeletedRow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onDeleteMood(item.timestamp);
  };

  const removeWithDelay = () => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onDeleteMood(item.timestamp);
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
      <Animated.View style={[animatedStyles, styles.moodItem]}>
        <View style={styles.iconAndDescription}>
          <AppText style={styles.moodValue}>{item.emoji}</AppText>
          <AppText style={styles.moodDescription} variant="bold">
            {item.description}
          </AppText>
        </View>
        <AppText style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </AppText>
        <Pressable hitSlop={16} onPress={handleDeletedRow}>
          <AppText style={styles.deleteText} variant="light">
            Delete
          </AppText>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colorBlue,
  },
});
