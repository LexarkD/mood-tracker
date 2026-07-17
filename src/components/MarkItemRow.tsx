import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
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

// NOTE: Анимированая обертка для TouchableOpacity
const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

export const MarkItemRow: React.FC<MarkItemProps> = memo(({ mark, isEven }) => {
  // NOTE: Нет необходимости хранить состояние аккордеона в react хуке useState.
  // NOTE: Так как все вычисления проходят на строне UI-потока, использую useSharedValue.
  const isOpen = useSharedValue(false);

  // NOTE: Задал "разделяемые" дефолтное значение для анимации стрелки, аккордеона и контента.
  const arrowRotation = useSharedValue('0deg');
  const accordionContainerHeight = useSharedValue(0);
  const accordionContainerOpacity = useSharedValue(0);

  // NOTE: Функция запускает анимацию
  const toggleExpand = useCallback(
    () => {
      const nextState = !isOpen.value;
      isOpen.value = nextState;

      arrowRotation.value = nextState
        ? withTiming('180deg', {
            duration: 400,
            easing: Easing.inOut(Easing.circle),
          })
        : withTiming('0deg', {
            duration: 400,
            easing: Easing.inOut(Easing.circle),
          });
      //NOTE: Использование ассиметричных Easing functions синхронизирует анимацию высоты аккордеона и анимацию прозрачности контента, предотвращая "сжевывание" контента.
      accordionContainerHeight.value = nextState
        ? withTiming(56, { duration: 400, easing: Easing.inOut(Easing.circle) })
        : withTiming(0, { duration: 400, easing: Easing.inOut(Easing.circle) });

      accordionContainerOpacity.value = nextState
        ? withTiming(1, { duration: 400, easing: Easing.in(Easing.cubic) })
        : withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) });
    },
    // NOTE: значения, возвращаемые useSharedValue, являются постоянными ссылочными объектами и не вызовут лишних срабатываний useCallback.
    [
      isOpen,
      arrowRotation,
      accordionContainerHeight,
      accordionContainerOpacity,
    ],
  );

  const arrowAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: arrowRotation.value }],
  }));

  const accordionAnimationStyle = useAnimatedStyle(() => ({
    height: accordionContainerHeight.value,
    opacity: accordionContainerOpacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        isEven ? styles.evenItemZebra : styles.oddItemZebra,
      ]}
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
        </View>
      </AnimatedTouch>
      <Animated.View style={[styles.contentContainer, accordionAnimationStyle]}>
        <View style={styles.emojiContainer}>
          <AppEmoji size={theme.iconSize.medium} description={mark.sleepMark} />
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
    overflow: 'hidden',
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
