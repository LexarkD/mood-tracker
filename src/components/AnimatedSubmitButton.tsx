import React from 'react';
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';

import Reanimated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';

type AnimatedSubmitButtonProps = {
  title: string;
  disabled: boolean;
  onSubmit: () => void;
  style?: StyleProp<ViewStyle>;
};

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const AnimatedSubmitButton: React.FC<AnimatedSubmitButtonProps> = ({
  title,
  disabled,
  onSubmit,
  style,
}) => {
  const isPressed = useSharedValue(false);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    //NOTE: opacity: выбор не сделан - 0,5; выбор сделан и кнопка зажата - 0,7; выбор сделан и кнопка не зажата - 1.
    const targetOpacity = disabled ? 0.5 : isPressed.value ? 0.7 : 1;
    return {
      opacity: withTiming(targetOpacity, { duration: 80 }),
      transform: [{ scale: withTiming(disabled ? 0.8 : 1) }],
    };
  }, [disabled]);

  return (
    <AnimatedPressable
      style={[styles.button, theme.shadowStyle, buttonAnimatedStyle, style]}
      onPress={onSubmit}
      onPressIn={() => {
        // NOTE: Отслеживаю начало и конец нажатия.
        isPressed.value = true;
      }}
      onPressOut={() => {
        isPressed.value = false;
      }}
      disabled={disabled}
    >
      <AppText variant="button">{title}</AppText>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colorYellow,
    width: 150,
    borderRadius: 12,
    alignSelf: 'center',
    padding: 10,
  },
});
