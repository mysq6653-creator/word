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
    let resolved = false;

    // TTS 지속시간 추정 (언어별로 다름)
    // 한글: 평균 150ms/글자, 영어: 평균 80ms/글자
    const estimatedDuration = lang === 'ko'
      ? word.length * 150
      : word.length * 80;

    // 최소 800ms, 최대 5000ms
    const timeout = Math.max(800, Math.min(5000, estimatedDuration + 200));

    const timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    }, timeout);

    const onComplete = () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeoutId);
        resolve();
      }
    };

    Speech.speak(word, {
      language: lang === 'ko' ? 'ko-KR' : 'en-US',
      rate: 0.9,
      pitch: 1.1,
      onDone: onComplete,
      onStopped: onComplete,
      onError: onComplete,
    });
  });
}

export async function stopAudio(): Promise<void> {
  await stopCurrent();
}
