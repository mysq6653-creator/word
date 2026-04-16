# 아기 낱말카드 (Baby Word Cards)

9개월 아기를 위한 이중 언어(한국어 / English) 낱말 카드 앱.
종이 낱말카드를 물고 접고 찢는 아기에게 앱으로 대체할 수 있는 튼튼한 대안.

## 기능 (MVP)

1. 카드 탭 → 발음 오디오 재생 (expo-speech TTS)
2. 이전 / 다음 버튼으로 카드 전환
3. 카테고리 선택: 동물 / 과일 / 탈것 / 색깔 / 가족 / 음식
4. 자동 재생 모드 (한국어 → 영어 → 다음 카드, 간격 조절 가능)
5. 부모 잠금 (설정 접근 시 2초 길게 누르기)
6. 오프라인 동작, 데이터 수집 없음

## 스택

- **React Native + Expo SDK 54** (managed workflow, TypeScript)
- **expo-router 6** — 파일 기반 라우팅 (static web output)
- **zustand + AsyncStorage** — 설정 저장
- **expo-speech** — 한/영 TTS (번들 MP3 가 준비되면 폴백 교체 가능)
- **react-native-safe-area-context** — 안전 영역 처리

## 개발

```bash
# 의존성 설치
npm install

# 웹 미리보기 (가장 빠른 반복)
npx expo start --web

# 아이폰/안드로이드 Expo Go (QR 스캔)
npx expo start
```

Expo Go 앱은 SDK 54 버전이어야 합니다. 앱스토어/플레이스토어에서 최신 버전 설치.

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
  audio.ts                 # expo-speech 재생 + 타임아웃 폴백
  i18n.ts                  # UI 문자열
stores/
  settings.ts              # Zustand + AsyncStorage
assets/                    # 1x1 PNG placeholder (배포 전 교체 필수)
  icon.png                 # 앱 아이콘 (1024x1024 필요)
  adaptive-icon.png        # Android adaptive icon (1024x1024)
  splash.png               # 스플래시 스크린 (1242x2436 권장)
  favicon.png              # 웹 파비콘 (48x48 이상)
```

## 에셋 교체 가이드

### 앱 아이콘 / 스플래시 (배포 전 필수)

현재 `assets/` 는 1x1 투명 PNG placeholder 입니다. Play Store 제출 전 교체:

- `assets/icon.png` — 1024x1024 PNG, 투명 배경 없음
- `assets/adaptive-icon.png` — 1024x1024, 안쪽 여백 고려 (bg 색 `#FFF8E7`)
- `assets/splash.png` — 1242x2436 권장, 배경 `#FFF8E7`
- `assets/favicon.png` — 48x48 이상

[Expo Icon Generator](https://buildicon.expo.dev) 또는 Figma 로 생성.

### 카드 이미지 (이모지 → PNG 교체)

MVP 는 이모지 placeholder 로 동작. 실제 OpenMoji 이미지로 교체:

1. <https://openmoji.org> 에서 카테고리별 다운로드 (CC BY-SA 4.0)
2. `assets/images/<category>/<id>.png` 에 배치
3. `data/cards.ts` 의 `getImage(id)` switch 에 `case` 추가:
   ```ts
   case 'dog': return require('../assets/images/animals/dog.png');
   ```

### 카드 오디오 (TTS → 녹음 MP3)

TTS 품질이 만족스럽지 않다면 직접 녹음으로 교체:

1. Voice Memo 로 한/영 녹음 → Audacity 로 MP3 변환
2. `assets/audio/ko/<id>.mp3`, `assets/audio/en/<id>.mp3` 배치
3. `data/cards.ts` 의 `getAudio(id, lang)` switch 에 `case` 추가
4. `lib/audio.ts` 에서 `getAudio` 가 있으면 expo-audio 로 재생하도록 확장

## 배포

### Vercel (웹)

`vercel.json` 이 준비되어 있음. Vercel 대시보드에서 GitHub 저장소 연결만 하면 자동 빌드:

- Build Command: `npx expo export --platform web`
- Output Directory: `dist`
- Framework: None
- cleanUrls 로 `/settings`, `/cards/animals` 같은 clean URL 처리

### Play Store (Android)

```bash
# 1. EAS CLI 설치
npm i -g eas-cli

# 2. Expo 계정 로그인
eas login

# 3. 프로젝트 설정
eas build:configure

# 4. 먼저 내부 테스트 APK 빌드
eas build -p android --profile preview

# 5. 프로덕션 AAB 빌드 (Play Console 업로드용)
eas build -p android --profile production
```

Play Console: $25 1회 등록 → "Designed for Families" 카테고리.
App Store 는 Apple Developer $99/년 등록 후 `eas build -p ios`.

## 라이선스

MIT. 카드 이미지/오디오는 각 소스의 라이선스를 따르세요.
