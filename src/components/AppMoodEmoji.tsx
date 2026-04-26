import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  AwesomeEmoji,
  HappyEmoji,
  NeutralEmoji,
  SadEmoji,
  TerribleEmoji,
} from './MoodEmoji.tsx';
import type { MoodType } from '../store/slices/moodListSlice.ts';

type AppMoodEmojiProps = {
  description: MoodType;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export const AppMoodEmoji: React.FC<AppMoodEmojiProps> = ({
  description,
  size,
  style,
}) => {
  if (description === 'awesome') {
    return <AwesomeEmoji style={style} size={size} />;
  }
  if (description === 'happy') {
    return <HappyEmoji style={style} size={size} />;
  }
  if (description === 'neutral') {
    return <NeutralEmoji style={style} size={size} />;
  }
  if (description === 'sad') {
    return <SadEmoji style={style} size={size} />;
  }
  if (description === 'terrible') {
    return <TerribleEmoji style={style} size={size} />;
  }
};
