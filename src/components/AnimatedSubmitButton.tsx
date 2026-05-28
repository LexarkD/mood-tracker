import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';

type AnimatedSubmitButtonProps = {
  isAllMarksPicked: boolean;
  isTimeoutOver: boolean;
  onSubmit: () => void;
};

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const AnimatedSubmitButton: React.FC<AnimatedSubmitButtonProps> = ({
  isAllMarksPicked,
  isTimeoutOver,
  onSubmit,
}) => {
  const isPressed = useSharedValue(false);

  // NOTE: Анимация кнопки сработает только если эмоции выбраны и запись разрешена
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const targetOpacity =
      //NOTE: opacity: выбор не сделан - 0,5; выбор сделан и кнопка зажата - 0,7; выбор сделан и кнопка не зажата - 1.
      !isAllMarksPicked || !isTimeoutOver ? 0.5 : isPressed.value ? 0.7 : 1;
    return {
      opacity: withTiming(targetOpacity, { duration: 80 }),
      transform: [
        { scale: isAllMarksPicked && isTimeoutOver ? withTiming(1) : 0.8 },
      ],
    };
  }, [isAllMarksPicked, isTimeoutOver]);

  return (
    <AnimatedPressable
      style={[styles.button, buttonAnimatedStyle]}
      onPress={onSubmit}
      onPressIn={() => {
        // NOTE: Отслеживаю начало и конец нажатия.
        isPressed.value = true;
      }}
      onPressOut={() => {
        isPressed.value = false;
      }}
      disabled={!isAllMarksPicked || !isTimeoutOver}
    >
      <AppText style={styles.buttonText} variant="bold">
        CHOOSE
      </AppText>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colorYellow,
    width: 150,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorBlack,
    textAlign: 'center',
  },
});
