import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { format } from 'date-fns/format';
import type { MarkEntryWithTimestamp } from '../store/slices/markListSlice.ts';
import useMarkList from '../hooks/useMarkList.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { AppEmoji } from './AppEmoji.tsx';

type MarkItemProps = {
  mark: MarkEntryWithTimestamp;
  isEven: boolean;
};

// NOTE: Анимированыый компонент для аккордеона
const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

export const MarkItemRow: React.FC<MarkItemProps> = ({ mark, isEven }) => {
  const { onDeleteMarkEntry } = useMarkList();
  const [expanded, setExpanded] = useState(false);

  // NOTE: Удаление отметки свайпом. Не должно попасть в релизную версию приложения. Так как позволяет исправлять(манипулировать) историю, следовательно - статистику.
  const removeWithDelay = () => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onDeleteMarkEntry(mark.timestamp);
    }, 250);
  };

  const offset = useSharedValue<number>(0);
  const maxPan = 80;

  const pan = Gesture.Pan()
    .minDistance(10)
    .failOffsetY([-1, 1])
    .onChange(event => {
      offset.value = event.translationX;
    })
    .onEnd(() => {
      if (Math.abs(offset.value) > maxPan) {
        offset.value = withTiming(Math.sign(offset.value) * 2000);
        scheduleOnRN(removeWithDelay);
      } else {
        offset.value = withTiming(0);
      }
    });

  // NOTE: Анимация улетания элемента за границы экрана при удалении
  const deleteAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  // NOTE: Анимация переворачивания стрелки при открытии аккордеона
  const arrowAnimationStyle = useAnimatedStyle(() => {
    const rotation = withTiming(expanded ? '180deg' : '0deg', {
      duration: 250,
    });
    return {
      transform: [{ rotate: rotation }],
    };
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          deleteAnimationStyle,
          styles.itemContainer,
          theme.shadowStyle,
          isEven ? styles.evenItemZebra : styles.oddItemZebra,
        ]}
        layout={LinearTransition}
      >
        <AnimatedTouch
          style={styles.headerContainer}
          onPress={toggleExpand}
          activeOpacity={0.7}
        >
          <View style={styles.emojiAndDescription}>
            <AppEmoji
              style={styles.emoji}
              size={theme.iconSize.medium}
              description={mark.moodMark}
            />
            <AppText style={styles.moodDescription} variant="bold">
              {mark.moodMark}
            </AppText>
          </View>
          <AppText style={styles.itemDate}>
            {format(new Date(mark.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
          </AppText>
          <Animated.Text style={[styles.arrowIcon, arrowAnimationStyle]}>
            ▼
          </Animated.Text>
        </AnimatedTouch>
        {expanded && (
          <Animated.View
            entering={FadeIn.duration(700)}
            exiting={FadeOut.duration(150)}
            style={styles.contentContainer}
          >
            <View style={styles.emojiAndDescription}>
              <AppEmoji
                style={styles.emoji}
                size={theme.iconSize.medium}
                description={mark.sleepMark}
              />
              <AppText style={styles.moodDescription} variant="bold">
                {mark.sleepMark}
              </AppText>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

// TODO(style): Выровнять элементы истории
const styles = StyleSheet.create({
  emoji: {
    marginRight: 20,
  },
  itemDate: {
    textAlign: 'center',
    color: theme.colorBrown,
  },
  itemContainer: {
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 4,
  },
  headerContainer: {
    minHeight: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  contentContainer: {
    minHeight: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  evenItemZebra: {
    backgroundColor: theme.colorWhite,
  },
  oddItemZebra: {
    backgroundColor: theme.colorWhiteHeat,
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorBrown,
  },
  emojiAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 14,
    color: theme.colorBrown,
  },
});
