import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import {
  CATEGORIES,
  Card,
  Category,
  getCardsByCategory,
} from '../../data/cards';
import { CardView } from '../../components/CardView';
import { playWord, playWordAndWait, stopAudio } from '../../lib/audio';
import { useSettings } from '../../stores/settings';
import { t } from '../../lib/i18n';

export default function CardsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
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

  const prev = () => {
    if (autoplay) return;
    setIndex((i) => (i - 1 + cards.length) % cards.length);
  };
  const next = () => {
    if (autoplay) return;
    setIndex((i) => (i + 1) % cards.length);
  };

  // 카드 탭 → 기본 언어 재생
  const onTapCard = async () => {
    if (autoplay) return;
    const card = cards[index];
    if (!card) return;
    await playWord(
      card.id,
      primaryLang === 'ko' ? card.ko : card.en,
      primaryLang
    );
  };

  // 자동재생 루프
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
        <Stack.Screen options={{ title: catMeta?.ko ?? '카드' }} />
        <Text style={styles.empty}>카드가 없습니다</Text>
      </SafeAreaView>
    );
  }

  const current = cards[index];

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ title: catMeta?.ko ?? '카드' }} />

      <View style={styles.deckArea}>
        <CardView card={current} onTap={onTapCard} />
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.navBtn}
          onPress={prev}
        >
          <Text style={styles.navArrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.counter}>
          {index + 1} / {cards.length}
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.navBtn}
          onPress={next}
        >
          <Text style={styles.navArrow}>▶</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
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
  deckArea: { flex: 1, padding: 16 },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  navBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrow: {
    fontSize: 28,
    color: '#2B2B2B',
    fontWeight: '700',
  },
  counter: {
    fontSize: 18,
    color: '#6B6B6B',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  autoBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
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
