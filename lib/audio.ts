// 오디오 재생 헬퍼 (expo-speech TTS 전용)
// MVP 에서는 TTS 로 발음한다. 실제 MP3 를 추가할 때 expo-audio 로 교체 가능.

import * as Speech from 'expo-speech';

async function stopCurrent() {
  try {
    await Speech.stop();
  } catch {}
}

export async function playWord(
  _cardId: string,
  word: string,
  lang: 'ko' | 'en'
): Promise<void> {
  await stopCurrent();
  Speech.speak(word, {
    language: lang === 'ko' ? 'ko-KR' : 'en-US',
    rate: 0.9,
    pitch: 1.1,
  });
}

export async function playWordAndWait(
  _cardId: string,
  word: string,
  lang: 'ko' | 'en'
): Promise<void> {
  await stopCurrent();
  return new Promise<void>((resolve) => {
    Speech.speak(word, {
      language: lang === 'ko' ? 'ko-KR' : 'en-US',
      rate: 0.9,
      pitch: 1.1,
      onDone: () => resolve(),
      onStopped: () => resolve(),
      onError: () => resolve(),
    });
  });
}

export async function stopAudio(): Promise<void> {
  await stopCurrent();
}
