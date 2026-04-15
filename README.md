# 아기 낱말카드 (Baby Word Cards)

9개월 아기를 위한 이중 언어(한국어 / English) 낱말 카드 앱.
종이 낱말카드를 물고 접고 찢는 아기에게 앱으로 대체할 수 있는 튼튼한 대안.

## 기능 (MVP)

1. 카드 탭 → 발음 오디오 재생 (번들 MP3, 없으면 TTS 폴백)
2. 좌/우 스와이프로 카드 전환 (reanimated)
3. 카테고리 선택: 동물 / 과일 / 탈것 / 색깔 / 가족 / 음식
4. 자동 재생 모드 (한국어 → 영어 → 다음 카드, 간격 조절 가능)
5. 부모 잠금 (설정 접근 시 2초 길게 누르기)
6. 오프라인 동작, 데이터 수집 없음

## 스택

- **React Native + Expo** (managed workflow, TypeScript)
- **expo-router** — 파일 기반 라우팅
- **zustand + AsyncStorage** — 설정 저장
- **expo-av + expo-speech** — 오디오 재생 / TTS 폴백
- **react-native-gesture-handler + reanimated** — 부드러운 스와이프

## 개발

```bash
# 의존성 설치
npm install

# 웹 미리보기 (가장 빠른 반복)
npx expo start --web

# 아이폰 Expo Go (QR 스캔)
npx expo start

# Android APK 빌드 (EAS)
npx eas build -p android --profile preview
```

## 폴더 구조

```
app/
  _layout.tsx              # Root layout (GestureHandlerRootView + Stack)
  index.tsx                # 홈 = 카테고리 picker
  cards/[category].tsx     # 카드 뷰어 (스와이프 + 탭 + 자동재생)
  settings.tsx             # 부모 전용 설정 (ParentGate 로 보호)
components/
  CardView.tsx             # 카드 한 장 UI
  SwipeDeck.tsx            # 제스처 + 애니메이션 덱
  ParentGate.tsx           # 2초 long-press 게이트
data/
  cards.ts                 # 타입 정의 + 카드 데이터 + require() 매핑
lib/
  audio.ts                 # expo-av / expo-speech 재생 헬퍼
  i18n.ts                  # UI 문자열
stores/
  settings.ts              # Zustand + AsyncStorage
assets/
  images/<category>/<id>.png  # 미래 — OpenMoji 512px PNG
  audio/ko/<id>.mp3           # 미래 — 한국어 녹음
  audio/en/<id>.mp3           # 미래 — 영어 녹음
```

## 에셋 교체 가이드

MVP 는 이모지 placeholder + expo-speech TTS 로 동작한다. 실제 에셋을 추가하려면:

### 이미지 (OpenMoji 512px PNG)

1. <https://openmoji.org> 에서 카테고리별로 다운로드 (CC BY-SA 4.0)
2. `assets/images/<category>/<id>.png` 에 배치
3. `data/cards.ts` 의 `getImage(id)` switch 에 `case` 추가:
   ```ts
   case 'dog': return require('../assets/images/animals/dog.png');
   ```

### 오디오 (직접 녹음 MP3)

1. 아이폰 Voice Memos → m4a 녹음 → Audacity 로 MP3 변환
2. `assets/audio/ko/<id>.mp3`, `assets/audio/en/<id>.mp3` 에 배치
3. `data/cards.ts` 의 `getAudio(id, lang)` switch 에 `case` 추가

## 배포

- **Play Store**: $25 1회 등록 → `eas build -p android --profile production` → AAB 업로드 → "Designed for Families" 등급
- **App Store (나중)**: Apple Developer $99/년 등록 후 `eas build -p ios`

## 라이선스

MIT. 오디오 녹음은 사용자 본인이 직접 추가하는 것을 권장.
