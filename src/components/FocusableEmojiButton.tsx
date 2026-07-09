import React, { memo } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { MoodType, SleepType } from '../store/slices/markListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppEmoji } from './AppEmoji.tsx';

// NOTE: FocusableEmojiButton - является компонентом -оберткой для AppEmoji. Добавляет анимацию при нажатии на AppEmoji.
// NOTE: Мемоизация FocusableEmojiButton фактически не требовалась. Это показательный кейс для Generics + memo.
type ValidEmojiType = MoodType | SleepType;

// NOTE: Создаю дженерик тип. Параметру типа Т присваиваю границы типов ValidEmojiType.
// Теперь если T имеет тип MoodType, то сразу и для "description: T", и для "onSelect: (description: T) => void"
type FocusableEmojiButtonProps<T extends ValidEmojiType> = {
  description: T;
  isSelectOption: boolean;
  onSelect: (description: T) => void;
};
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);
//NOTE: определяю параметр типа Т еще раз, внутри области видимости FocusableEmojiButton.
const FocusableEmojiButton = <T extends ValidEmojiType>({
  description,
  isSelectOption,
  onSelect,
}: FocusableEmojiButtonProps<T>) => {
  const emojiAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { scale: withTiming(isSelectOption ? 1.5 : 1, { duration: 250 }) },
      ],
    }),
    [isSelectOption],
  );
  const handlePress = () => {
    onSelect(description);
  };

  return (
    <ReanimatedPressable
      onPress={handlePress}
      hitSlop={15}
      style={[styles.emoji, emojiAnimatedStyle]}
    >
      <AppEmoji size={theme.iconSize.small} description={description} />
    </ReanimatedPressable>
  );
};

const styles = StyleSheet.create({
  emoji: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//NOTE: memo ломает гибкое определение дженерика <T>. Поэтому я игнориую типы возвращаемые memo, использую приведение типов as и копирую сигнатуру typeof FocusableEmojiButton.
//Паттерн: "memo(Inner) as typeof Inner"
export const FocusableEmojiButtonMemo = memo(
  FocusableEmojiButton,
) as typeof FocusableEmojiButton;
