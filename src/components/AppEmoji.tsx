import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  GreatMoodEmoji,
  HappyMoodEmoji,
  NeutralMoodEmoji,
  SadMoodEmoji,
  AwfulMoodEmoji,
} from './MoodEmoji.tsx';
import {
  CheerfulSleepEmoji,
  NormSleepEmoji,
  SleepySleepEmoji,
} from './SleepEmoji.tsx';
import type { MoodType, SleepType } from '../store/slices/markListSlice.ts';

// NOTE: AppEmoji содержит все emoji. Возвращает emoji взависимости от description.
type AppMoodEmojiProps = {
  description: MoodType | SleepType;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export const AppEmoji: React.FC<AppMoodEmojiProps> = ({
  description,
  size,
  style,
}) => {
  switch (description) {
    case 'great': {
      return <GreatMoodEmoji style={style} size={size} />;
    }
    case 'happy': {
      return <HappyMoodEmoji style={style} size={size} />;
    }
    case 'neutral': {
      return <NeutralMoodEmoji style={style} size={size} />;
    }
    case 'sad': {
      return <SadMoodEmoji style={style} size={size} />;
    }
    case 'awful': {
      return <AwfulMoodEmoji style={style} size={size} />;
    }
    case 'cheerful': {
      return <CheerfulSleepEmoji style={style} size={size} />;
    }
    case 'norm': {
      return <NormSleepEmoji style={style} size={size} />;
    }
    case 'sleepy': {
      return <SleepySleepEmoji style={style} size={size} />;
    }
    default: {
      //NOTE: Исчерпывающая проверка на свичкейс. never говорит о том, что значение дл emojiChecker не должно быть присвоено,
      // (потому что все варианты description должны были быть обработаны раньше)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const emojiChecker: never = description;
      return null;
    }
  }
};
