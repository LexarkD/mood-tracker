import React, { useState, memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { format } from 'date-fns/format';
import type { MarkEntryWithTimestamp } from '../store/slices/markListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { AppEmoji } from './AppEmoji.tsx';

type MarkItemProps = {
  mark: MarkEntryWithTimestamp;
  isEven: boolean;
};

// NOTE: Анимированыый компонент для аккордеона
const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

export const MarkItemRow: React.FC<MarkItemProps> = memo(({ mark, isEven }) => {
  const [expanded, setExpanded] = useState(false);

  // TODO: Исправить проблему. По какой-то причине использование arrowAnimationStyle + FlatList сильно роняет UI fps.
  // NOTE: Анимация переворачивания стрелки при открытии аккордеона
  const arrowAnimationStyle = useAnimatedStyle(() => {
    const rotation = withTiming(expanded ? '180deg' : '0deg', {
      duration: 250,
    });
    return {
      transform: [{ rotate: rotation }],
    };
  });

  const toggleExpand = useCallback(() => {
    setExpanded(perv => !perv);
  }, []);

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        isEven ? styles.evenItemZebra : styles.oddItemZebra,
      ]}
      layout={LinearTransition}
    >
      <AnimatedTouch
        style={styles.headerContainer}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.emojiContainer}>
          <AppEmoji size={theme.iconSize.medium} description={mark.moodMark} />
        </View>
        <View style={styles.descriptionContainer}>
          <AppText
            variant="description"
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.75}
          >
            {mark.moodMark}
          </AppText>
        </View>

        <View style={styles.dateContainer}>
          <AppText variant="date">
            {format(new Date(mark.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
          </AppText>
        </View>
        <View style={styles.arrowContainer}>
          <Animated.Text style={[styles.arrowIcon, arrowAnimationStyle]}>
            ▼
          </Animated.Text>
          {/* <View
              style={[styles.arrowContainer, expanded && styles.arrowExpanded]}
            >
              <Text style={styles.arrowIcon}>▼</Text> */}
        </View>
      </AnimatedTouch>
      {expanded && (
        <Animated.View
          entering={FadeIn.duration(700)}
          exiting={FadeOut.duration(150)}
          style={styles.contentContainer}
        >
          <View style={styles.emojiContainer}>
            <AppEmoji
              size={theme.iconSize.medium}
              description={mark.sleepMark}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <AppText
              variant="description"
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.75}
            >
              {mark.sleepMark}
            </AppText>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
    borderRadius: 12,
    ...theme.SHADOW,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m,
    minHeight: 56,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m,
    minHeight: 56,
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateContainer: {
    flex: 2.5,
    alignItems: 'flex-start',
  },
  arrowContainer: {
    width: 16,
    alignItems: 'flex-end',
  },
  //NOTE: Решение без использование reanimated
  // arrowExpanded: {
  //   transform: [{ rotateX: '180deg' }],
  // },
  evenItemZebra: {
    backgroundColor: theme.COLOR_CONFIG_UI.evenItemZebra,
  },
  oddItemZebra: {
    backgroundColor: theme.COLOR_CONFIG_UI.oddItemZebra,
  },
  arrowIcon: {
    fontSize: 14,
    color: theme.COLOR_CONFIG_UI.appText,
  },
});
