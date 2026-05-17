import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { MoodType, SleepType } from '../store/slices/markListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppMoodEmoji } from './AppMoodEmoji.tsx';

type FocusableEmojiButton = {
  description: MoodType | SleepType;
  isSelectOption: boolean;
  onPress: () => void;
};
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const FocusableEmojiButton: React.FC<FocusableEmojiButton> = ({
  description,
  isSelectOption,
  onPress,
}) => {
  const emojiStyleSelect = useAnimatedStyle(
    () => ({
      transform: [{ scale: isSelectOption ? withTiming(1.5) : withTiming(1) }],
    }),
    [isSelectOption],
  );

  return (
    <ReanimatedPressable
      onPress={onPress}
      style={[styles.moodItem, emojiStyleSelect]}
    >
      <AppMoodEmoji size={theme.iconSize.small} description={description} />
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
