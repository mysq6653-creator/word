// 오디오 재생 헬퍼 (expo-speech TTS 전용)
// onDone 콜백이 안정적이지 않은 기기를 위해 최대 대기 시간을 설정한다.

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

/**
 * 발음이 끝날 때까지 (또는 최대 타임아웃까지) 기다린 뒤 resolve 한다.
 * onDone 콜백이 fire 되지 않는 기기/환경을 대비해 글자 수 기반 타임아웃을 둔다.
 */
export async function playWordAndWait(
  _cardId: string,
  word: string,
  lang: 'ko' | 'en'
): Promise<void> {
  await stopCurrent();
  return new Promise<void>((resolve) => {
    let resolved = false;
    const done = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };

    // 최대 대기시간 = 단어 길이 기반 추정치 (최소 1.5s, 최대 5s)
    const estimatedMs = Math.min(5000, Math.max(1500, word.length * 450));
    const timeout = setTimeout(done, estimatedMs);

    Speech.speak(word, {
      language: lang === 'ko' ? 'ko-KR' : 'en-US',
      rate: 0.9,
      pitch: 1.1,
      onDone: () => {
        clearTimeout(timeout);
        done();
      },
      onStopped: () => {
        clearTimeout(timeout);
        done();
      },
      onError: () => {
        clearTimeout(timeout);
        done();
      },
    });
  });
}

export async function stopAudio(): Promise<void> {
  await stopCurrent();
}
