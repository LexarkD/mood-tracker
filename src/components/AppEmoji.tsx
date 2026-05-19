import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  AwesomeMoodEmoji,
  HappyMoodEmoji,
  NeutralMoodEmoji,
  SadMoodEmoji,
  TerribleMoodEmoji,
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

// TODO : можно заменить if на switch/case, будт лаконичнее
export const AppEmoji: React.FC<AppMoodEmojiProps> = ({
  description,
  size,
  style,
}) => {
  if (description === 'awesome') {
    return <AwesomeMoodEmoji style={style} size={size} />;
  }
  if (description === 'happy') {
    return <HappyMoodEmoji style={style} size={size} />;
  }
  if (description === 'neutral') {
    return <NeutralMoodEmoji style={style} size={size} />;
  }
  if (description === 'sad') {
    return <SadMoodEmoji style={style} size={size} />;
  }
  if (description === 'terrible') {
    return <TerribleMoodEmoji style={style} size={size} />;
  }
  if (description === 'cheerful') {
    return <CheerfulSleepEmoji style={style} size={size} />;
  }
  if (description === 'norm') {
    return <NormSleepEmoji style={style} size={size} />;
  }
  if (description === 'sleepy') {
    return <SleepySleepEmoji style={style} size={size} />;
  }
};
