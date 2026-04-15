import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSettings } from '../stores/settings';
import { t } from '../lib/i18n';

const INTERVAL_OPTIONS = [2500, 3500, 5000, 7000];

export default function Settings() {
  const autoplayIntervalMs = useSettings((s) => s.autoplayIntervalMs);
  const setAutoplayInterval = useSettings((s) => s.setAutoplayInterval);
  const primaryLang = useSettings((s) => s.primaryLang);
  const setPrimaryLang = useSettings((s) => s.setPrimaryLang);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.section}>{t.autoplayInterval}</Text>
        <View style={styles.row}>
          {INTERVAL_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              style={[
                styles.chip,
                autoplayIntervalMs === opt && styles.chipOn,
              ]}
              onPress={() => setAutoplayInterval(opt)}
            >
              <Text
                style={[
                  styles.chipText,
                  autoplayIntervalMs === opt && styles.chipTextOn,
                ]}
              >
                {opt / 1000}
                {t.seconds}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.section}>먼저 들려줄 언어</Text>
        <View style={styles.row}>
          <Pressable
            style={[styles.chip, primaryLang === 'ko' && styles.chipOn]}
            onPress={() => setPrimaryLang('ko')}
          >
            <Text
              style={[
                styles.chipText,
                primaryLang === 'ko' && styles.chipTextOn,
              ]}
            >
              한국어
            </Text>
          </Pressable>
          <Pressable
            style={[styles.chip, primaryLang === 'en' && styles.chipOn]}
            onPress={() => setPrimaryLang('en')}
          >
            <Text
              style={[
                styles.chipText,
                primaryLang === 'en' && styles.chipTextOn,
              ]}
            >
              English
            </Text>
          </Pressable>
        </View>

        <View style={styles.about}>
          <Text style={styles.aboutText}>{t.about}</Text>
          <Text style={styles.aboutText}>{t.privacyNote}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8E7' },
  container: { padding: 20 },
  section: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2B2B2B',
    marginTop: 8,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    marginBottom: 8,
  },
  chipOn: {
    backgroundColor: '#FFC857',
  },
  chipText: {
    fontSize: 16,
    color: '#6B6B6B',
    fontWeight: '600',
  },
  chipTextOn: {
    color: '#2B2B2B',
  },
  about: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  aboutText: {
    fontSize: 14,
    color: '#6B6B6B',
    lineHeight: 20,
    marginBottom: 8,
  },
});
