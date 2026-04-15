import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORIES } from '../data/cards';
import { ParentGate } from '../components/ParentGate';
import { t } from '../lib/i18n';

export default function Home() {
  const router = useRouter();
  const [gateVisible, setGateVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t.selectCategory}</Text>

        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={styles.tile}
              onPress={() => router.push(`/cards/${cat.id}`)}
            >
              <Text style={styles.tileEmoji}>{cat.emoji}</Text>
              <Text style={styles.tileLabel}>{cat.ko}</Text>
              <Text style={styles.tileSubLabel}>{cat.en}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.settingsBtn}
          onPress={() => setGateVisible(true)}
        >
          <Text style={styles.settingsText}>⚙︎ {t.settings}</Text>
        </Pressable>

        <Text style={styles.hint}>{t.tapToHear}</Text>
      </ScrollView>

      <ParentGate
        visible={gateVisible}
        onPass={() => {
          setGateVisible(false);
          router.push('/settings');
        }}
        onCancel={() => setGateVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8E7' },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2B2B2B',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tileEmoji: {
    fontSize: 80,
  },
  tileLabel: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2B2B2B',
    marginTop: 8,
  },
  tileSubLabel: {
    fontSize: 16,
    color: '#888',
    marginTop: 2,
  },
  settingsBtn: {
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  settingsText: {
    fontSize: 16,
    color: '#6B6B6B',
    fontWeight: '600',
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
});
