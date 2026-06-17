import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { MoodType, SleepType } from '../store/slices/markListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppEmoji } from './AppEmoji.tsx';

// NOTE: FocusableEmojiButton - является компонентом -оберткой для AppEmoji. Добавляет анимацию при нажатии на AppEmoji.
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
  const emojiAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { scale: withTiming(isSelectOption ? 1.5 : 1, { duration: 250 }) },
      ],
    }),
    [isSelectOption],
  );

  return (
    <ReanimatedPressable
      onPress={onPress}
      style={[styles.emoji, emojiAnimatedStyle]}
    >
      <AppEmoji size={theme.iconSize.small} description={description} />
    </ReanimatedPressable>
  );
};

const styles = StyleSheet.create({
  emoji: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
