// 오디오 재생 헬퍼.
// 번들된 MP3 가 있으면 expo-av 로 재생하고, 없으면 expo-speech TTS 로 폴백한다.

import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { getAudio } from '../data/cards';

let currentSound: Audio.Sound | null = null;

async function stopCurrent() {
  try {
    await Speech.stop();
  } catch {}
  if (currentSound) {
    try {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    } catch {}
    currentSound = null;
  }
}

/**
 * 카드 단어를 지정한 언어로 발음한다.
 * @returns Promise<void> — 재생이 시작될 때 resolve. 재생 완료까지는 기다리지 않음.
 */
export async function playWord(
  cardId: string,
  word: string,
  lang: 'ko' | 'en'
): Promise<void> {
  await stopCurrent();

  const audioHandle = getAudio(cardId, lang);
  if (audioHandle) {
    try {
      const { sound } = await Audio.Sound.createAsync(audioHandle, {
        shouldPlay: true,
      });
      currentSound = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
          if (currentSound === sound) currentSound = null;
        }
      });
      return;
    } catch (e) {
      // 번들 오디오 재생 실패 시 TTS 로 폴백
      console.warn('Audio play failed, falling back to TTS', e);
    }
  }

  // TTS 폴백
  Speech.speak(word, {
    language: lang === 'ko' ? 'ko-KR' : 'en-US',
    rate: 0.9,
    pitch: 1.1,
  });
}

/** 재생 완료까지 대기하는 프로미스. 자동재생 모드에서 사용. */
export async function playWordAndWait(
  cardId: string,
  word: string,
  lang: 'ko' | 'en'
): Promise<void> {
  await stopCurrent();

  const audioHandle = getAudio(cardId, lang);
  if (audioHandle) {
    try {
      const { sound } = await Audio.Sound.createAsync(audioHandle, {
        shouldPlay: true,
      });
      currentSound = sound;
      return new Promise<void>((resolve) => {
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync().catch(() => {});
            if (currentSound === sound) currentSound = null;
            resolve();
          }
        });
      });
    } catch (e) {
      console.warn('Audio play failed, falling back to TTS', e);
    }
  }

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
