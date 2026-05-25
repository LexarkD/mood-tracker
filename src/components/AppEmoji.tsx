import React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
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

export const AppEmoji: React.FC<AppMoodEmojiProps> = ({
  description,
  size,
  style,
}) => {
  switch (description) {
    case 'awesome': {
      return <AwesomeMoodEmoji style={style} size={size} />;
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
    case 'terrible': {
      return <TerribleMoodEmoji style={style} size={size} />;
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
      return <View>Emoji not found</View>;
    }
  }
};
