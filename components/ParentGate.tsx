// 부모 확인 게이트: 2초간 길게 눌러야 통과
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { t } from '../lib/i18n';

type Props = {
  visible: boolean;
  onPass: () => void;
  onCancel: () => void;
};

const HOLD_MS = 2000;

export function ParentGate({ visible, onPass, onCancel }: Props) {
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const { width } = useWindowDimensions();

  const start = () => {
    startRef.current = Date.now();
    const tick = () => {
      if (startRef.current == null) return;
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(1, elapsed / HOLD_MS);
      setProgress(p);
      if (p >= 1) {
        cleanup();
        onPass();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const cleanup = () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startRef.current = null;
    setProgress(0);
  };

  const cancel = () => {
    cleanup();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{t.parentGate}</Text>
          <Text style={styles.subtitle}>{t.parentGateInstruction}</Text>

          <Pressable
            style={styles.holdArea}
            onPressIn={start}
            onPressOut={cancel}
          >
            <View
              style={[
                styles.progressBar,
                { width: `${Math.round(progress * 100)}%` },
              ]}
            />
            <Text style={styles.holdText}>
              {progress >= 1 ? t.parentGateSuccess : `${Math.ceil((1 - progress) * 2)}초`}
            </Text>
          </Pressable>

          <Pressable style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 420,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2B2B2B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  holdArea: {
    height: 72,
    backgroundColor: '#FFF0B3',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFC857',
  },
  holdText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B2B2B',
  },
  cancelBtn: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  cancelText: {
    fontSize: 16,
    color: '#888',
  },
});
