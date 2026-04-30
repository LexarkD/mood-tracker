import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { MoodType } from '../store/slices/moodListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppMoodEmoji } from './AppMoodEmoji.tsx';

type FocusableEmojiButton = {
  mood: MoodType;
  selectedMood: boolean;
  onPress: () => void;
};
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const FocusableEmojiButton: React.FC<FocusableEmojiButton> = ({
  mood,
  selectedMood,
  onPress,
}) => {
  const emojiStyleSelect = useAnimatedStyle(
    () => ({
      transform: [{ scale: selectedMood ? withTiming(1.5) : withTiming(1) }],
    }),
    [selectedMood],
  );

  return (
    <ReanimatedPressable
      onPress={onPress}
      style={[styles.moodItem, emojiStyleSelect]}
    >
      <AppMoodEmoji size={theme.iconSize.small} description={mood} />
    </ReanimatedPressable>
  );
};

const styles = StyleSheet.create({
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
