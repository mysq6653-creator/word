import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Card, getImage } from '../data/cards';

type Props = {
  card: Card;
  onTap?: () => void;
};

export function CardView({ card, onTap }: Props) {
  const image = getImage(card.id);
  return (
    <Pressable style={styles.card} onPress={onTap}>
      <View style={styles.imageBox}>
        {image ? (
          <Image source={image} style={styles.image} resizeMode="contain" />
        ) : (
          <Text style={styles.emoji}>{card.emoji}</Text>
        )}
      </View>
      <Text style={styles.korean} numberOfLines={1} adjustsFontSizeToFit>
        {card.ko}
      </Text>
      <Text style={styles.english} numberOfLines={1} adjustsFontSizeToFit>
        {card.en}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  emoji: {
    fontSize: 180,
    textAlign: 'center',
  },
  korean: {
    fontSize: 72,
    fontWeight: '800',
    color: '#2B2B2B',
    marginTop: 12,
    textAlign: 'center',
  },
  english: {
    fontSize: 36,
    fontWeight: '600',
    color: '#6B6B6B',
    marginTop: 4,
    textAlign: 'center',
  },
});
