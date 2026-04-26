import React from 'react';
import {
  AwesomeEmoji,
  HappyEmoji,
  NeutralEmoji,
  SadEmoji,
  TerribleEmoji,
} from './MoodEmoji.tsx';

type AppMoodEmojiProps = {
  description: 'awesome' | 'happy' | 'neutral' | 'sad' | 'terrible';
  size?: number;
};

export const AppMoodEmoji: React.FC<AppMoodEmojiProps> = ({
  description,
  size,
}) => {
  if (description === 'awesome') {
    return <AwesomeEmoji size={size} />;
  }
  if (description === 'happy') {
    return <HappyEmoji size={size} />;
  }
  if (description === 'neutral') {
    return <NeutralEmoji size={size} />;
  }
  if (description === 'sad') {
    return <SadEmoji size={size} />;
  }
  if (description === 'terrible') {
    return <TerribleEmoji size={size} />;
  }
};
