import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import {
  CATEGORIES,
  Card,
  Category,
  getCardsByCategory,
} from '../../data/cards';
import { SwipeDeck } from '../../components/SwipeDeck';
import { playWord, playWordAndWait, stopAudio } from '../../lib/audio';
import { useSettings } from '../../stores/settings';
import { t } from '../../lib/i18n';

export default function CardsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const cards = useMemo(
    () => getCardsByCategory(category as Category),
    [category]
  );
  const catMeta = CATEGORIES.find((c) => c.id === (category as Category));
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const autoplayIntervalMs = useSettings((s) => s.autoplayIntervalMs);
  const primaryLang = useSettings((s) => s.primaryLang);
  const secondaryLang: 'ko' | 'en' = primaryLang === 'ko' ? 'en' : 'ko';

  // 카드 탭 → 기본 언어 재생
  const onTap = async (card: Card) => {
    if (autoplay) return; // 자동재생 중에는 탭 무시
    await playWord(
      card.id,
      primaryLang === 'ko' ? card.ko : card.en,
      primaryLang
    );
  };

  // 자동재생 루프: 각 effect 호출은 현재 카드 한 장만 처리하고,
  // setIndex 로 index 가 바뀌면 effect 가 재호출되어 다음 카드를 진행한다.
  useEffect(() => {
    if (!autoplay) {
      stopAudio();
      return;
    }
    let cancelled = false;

    const run = async () => {
      const current = cards[index];
      if (!current) return;

      await playWordAndWait(
        current.id,
        primaryLang === 'ko' ? current.ko : current.en,
        primaryLang
      );
      if (cancelled) return;
      await sleep(400);
      if (cancelled) return;

      await playWordAndWait(
        current.id,
        secondaryLang === 'ko' ? current.ko : current.en,
        secondaryLang
      );
      if (cancelled) return;
      await sleep(autoplayIntervalMs);
      if (cancelled) return;

      setIndex((i) => (i + 1 >= cards.length ? 0 : i + 1));
    };

    run();
    return () => {
      cancelled = true;
      stopAudio();
    };
  }, [autoplay, index, cards, primaryLang, secondaryLang, autoplayIntervalMs]);

  // 화면 이탈 시 오디오 정지
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  if (!cards.length) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.empty}>카드가 없습니다</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ title: catMeta?.ko ?? '카드' }} />

      <View style={styles.deckArea}>
        <SwipeDeck
          cards={cards}
          index={index}
          onIndexChange={setIndex}
          onTap={onTap}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.counter}>
          {index + 1} / {cards.length}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.autoBtn, autoplay && styles.autoBtnOn]}
          onPress={() => setAutoplay((v) => !v)}
        >
          <Text style={[styles.autoText, autoplay && styles.autoTextOn]}>
            {autoplay ? '⏸ ' + t.autoplayOn : '▶ ' + t.autoplayOff}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8E7' },
  deckArea: { flex: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  counter: {
    fontSize: 18,
    color: '#6B6B6B',
    fontWeight: '600',
  },
  autoBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  autoBtnOn: {
    backgroundColor: '#FFC857',
  },
  autoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B6B6B',
  },
  autoTextOn: {
    color: '#2B2B2B',
  },
  empty: {
    marginTop: 80,
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});
