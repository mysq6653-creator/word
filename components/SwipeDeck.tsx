import React, { useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions, Platform, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Card } from '../data/cards';
import { CardView } from './CardView';

type Props = {
  cards: Card[];
  index: number;
  onIndexChange: (newIndex: number) => void;
  onTap: (card: Card) => void;
};

const SWIPE_THRESHOLD = 80;

export function SwipeDeck({ cards, index, onIndexChange, onTap }: Props) {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const isWeb = Platform.OS === 'web';

  const go = useCallback(
    (delta: number) => {
      const next = Math.max(0, Math.min(cards.length - 1, index + delta));
      if (next !== index) onIndexChange(next);
    },
    [cards.length, index, onIndexChange]
  );

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-width, { duration: 180 }, () => {
          translateX.value = 0;
          runOnJS(go)(1);
        });
      } else if (e.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(width, { duration: 180 }, () => {
          translateX.value = 0;
          runOnJS(go)(-1);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const tap = Gesture.Tap().onEnd(() => {
    if (cards[index]) runOnJS(onTap)(cards[index]);
  });

  const composed = Gesture.Exclusive(pan, tap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      {
        rotate: `${interpolate(
          translateX.value,
          [-width, 0, width],
          [-8, 0, 8],
          Extrapolation.CLAMP
        )}deg`,
      },
    ],
  }));

  const card = cards[index];
  if (!card) return null;

  // 웹 환경에서는 GestureDetector 없이 CardView의 onTap만 사용
  if (isWeb) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.cardWrap, animatedStyle]}>
          <CardView card={card} onTap={() => onTap(card)} />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.cardWrap, animatedStyle]}>
          <CardView card={card} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cardWrap: {
    width: '100%',
    height: '100%',
  },
});
