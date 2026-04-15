// 카드 데이터 모델 및 정의
// MVP 단계에서는 이모지 placeholder + expo-speech TTS 폴백을 사용한다.
// 실제 이미지(OpenMoji PNG)와 오디오(MP3)가 준비되면 아래 getImage/getAudio 함수의
// switch 문에 require() 호출을 추가하여 교체한다.

export type Category =
  | 'animals'
  | 'fruits'
  | 'vehicles'
  | 'colors'
  | 'family'
  | 'food';

export type Card = {
  id: string;
  category: Category;
  ko: string;
  en: string;
  emoji: string; // MVP placeholder
};

export const CATEGORIES: { id: Category; ko: string; en: string; emoji: string }[] = [
  { id: 'animals', ko: '동물', en: 'Animals', emoji: '🐶' },
  { id: 'fruits', ko: '과일', en: 'Fruits', emoji: '🍎' },
  { id: 'vehicles', ko: '탈것', en: 'Vehicles', emoji: '🚗' },
  { id: 'colors', ko: '색깔', en: 'Colors', emoji: '🎨' },
  { id: 'family', ko: '가족', en: 'Family', emoji: '👨‍👩‍👧' },
  { id: 'food', ko: '음식', en: 'Food', emoji: '🍚' },
];

export const CARDS: Card[] = [
  // 동물
  { id: 'dog', category: 'animals', ko: '강아지', en: 'Dog', emoji: '🐶' },
  { id: 'cat', category: 'animals', ko: '고양이', en: 'Cat', emoji: '🐱' },
  { id: 'rabbit', category: 'animals', ko: '토끼', en: 'Rabbit', emoji: '🐰' },
  { id: 'bear', category: 'animals', ko: '곰', en: 'Bear', emoji: '🐻' },
  { id: 'lion', category: 'animals', ko: '사자', en: 'Lion', emoji: '🦁' },
  { id: 'tiger', category: 'animals', ko: '호랑이', en: 'Tiger', emoji: '🐯' },
  { id: 'elephant', category: 'animals', ko: '코끼리', en: 'Elephant', emoji: '🐘' },
  { id: 'monkey', category: 'animals', ko: '원숭이', en: 'Monkey', emoji: '🐵' },
  { id: 'pig', category: 'animals', ko: '돼지', en: 'Pig', emoji: '🐷' },
  { id: 'cow', category: 'animals', ko: '소', en: 'Cow', emoji: '🐮' },
  { id: 'chick', category: 'animals', ko: '병아리', en: 'Chick', emoji: '🐥' },
  { id: 'duck', category: 'animals', ko: '오리', en: 'Duck', emoji: '🦆' },

  // 과일
  { id: 'apple', category: 'fruits', ko: '사과', en: 'Apple', emoji: '🍎' },
  { id: 'banana', category: 'fruits', ko: '바나나', en: 'Banana', emoji: '🍌' },
  { id: 'grapes', category: 'fruits', ko: '포도', en: 'Grapes', emoji: '🍇' },
  { id: 'strawberry', category: 'fruits', ko: '딸기', en: 'Strawberry', emoji: '🍓' },
  { id: 'orange', category: 'fruits', ko: '오렌지', en: 'Orange', emoji: '🍊' },
  { id: 'watermelon', category: 'fruits', ko: '수박', en: 'Watermelon', emoji: '🍉' },
  { id: 'peach', category: 'fruits', ko: '복숭아', en: 'Peach', emoji: '🍑' },
  { id: 'pear', category: 'fruits', ko: '배', en: 'Pear', emoji: '🍐' },
  { id: 'pineapple', category: 'fruits', ko: '파인애플', en: 'Pineapple', emoji: '🍍' },
  { id: 'kiwi', category: 'fruits', ko: '키위', en: 'Kiwi', emoji: '🥝' },

  // 탈것
  { id: 'car', category: 'vehicles', ko: '자동차', en: 'Car', emoji: '🚗' },
  { id: 'bus', category: 'vehicles', ko: '버스', en: 'Bus', emoji: '🚌' },
  { id: 'train', category: 'vehicles', ko: '기차', en: 'Train', emoji: '🚆' },
  { id: 'airplane', category: 'vehicles', ko: '비행기', en: 'Airplane', emoji: '✈️' },
  { id: 'ship', category: 'vehicles', ko: '배', en: 'Ship', emoji: '🚢' },
  { id: 'bicycle', category: 'vehicles', ko: '자전거', en: 'Bicycle', emoji: '🚲' },
  { id: 'truck', category: 'vehicles', ko: '트럭', en: 'Truck', emoji: '🚚' },
  { id: 'taxi', category: 'vehicles', ko: '택시', en: 'Taxi', emoji: '🚕' },
  { id: 'fire_engine', category: 'vehicles', ko: '소방차', en: 'Fire Truck', emoji: '🚒' },
  { id: 'police_car', category: 'vehicles', ko: '경찰차', en: 'Police Car', emoji: '🚓' },

  // 색깔
  { id: 'red', category: 'colors', ko: '빨강', en: 'Red', emoji: '🔴' },
  { id: 'orange_color', category: 'colors', ko: '주황', en: 'Orange', emoji: '🟠' },
  { id: 'yellow', category: 'colors', ko: '노랑', en: 'Yellow', emoji: '🟡' },
  { id: 'green', category: 'colors', ko: '초록', en: 'Green', emoji: '🟢' },
  { id: 'blue', category: 'colors', ko: '파랑', en: 'Blue', emoji: '🔵' },
  { id: 'purple', category: 'colors', ko: '보라', en: 'Purple', emoji: '🟣' },
  { id: 'black', category: 'colors', ko: '검정', en: 'Black', emoji: '⚫' },
  { id: 'white', category: 'colors', ko: '하양', en: 'White', emoji: '⚪' },
  { id: 'pink', category: 'colors', ko: '분홍', en: 'Pink', emoji: '🌸' },
  { id: 'brown', category: 'colors', ko: '갈색', en: 'Brown', emoji: '🟤' },

  // 가족
  { id: 'mom', category: 'family', ko: '엄마', en: 'Mom', emoji: '👩' },
  { id: 'dad', category: 'family', ko: '아빠', en: 'Dad', emoji: '👨' },
  { id: 'baby', category: 'family', ko: '아기', en: 'Baby', emoji: '👶' },
  { id: 'grandma', category: 'family', ko: '할머니', en: 'Grandma', emoji: '👵' },
  { id: 'grandpa', category: 'family', ko: '할아버지', en: 'Grandpa', emoji: '👴' },
  { id: 'sister', category: 'family', ko: '누나', en: 'Sister', emoji: '👧' },
  { id: 'brother', category: 'family', ko: '형', en: 'Brother', emoji: '👦' },
  { id: 'family', category: 'family', ko: '가족', en: 'Family', emoji: '👨‍👩‍👧' },

  // 음식
  { id: 'rice', category: 'food', ko: '밥', en: 'Rice', emoji: '🍚' },
  { id: 'bread', category: 'food', ko: '빵', en: 'Bread', emoji: '🍞' },
  { id: 'milk', category: 'food', ko: '우유', en: 'Milk', emoji: '🥛' },
  { id: 'water', category: 'food', ko: '물', en: 'Water', emoji: '💧' },
  { id: 'egg', category: 'food', ko: '계란', en: 'Egg', emoji: '🥚' },
  { id: 'cheese', category: 'food', ko: '치즈', en: 'Cheese', emoji: '🧀' },
  { id: 'noodle', category: 'food', ko: '면', en: 'Noodle', emoji: '🍜' },
  { id: 'soup', category: 'food', ko: '국', en: 'Soup', emoji: '🍲' },
  { id: 'cookie', category: 'food', ko: '과자', en: 'Cookie', emoji: '🍪' },
  { id: 'icecream', category: 'food', ko: '아이스크림', en: 'Ice Cream', emoji: '🍦' },
];

export function getCardsByCategory(category: Category): Card[] {
  return CARDS.filter((c) => c.category === category);
}

export function getCardById(id: string): Card | undefined {
  return CARDS.find((c) => c.id === id);
}

/**
 * 이미지 require 매핑. 실제 PNG 에셋을 추가하면 이 스위치 문에 case 를 추가한다.
 * Metro 번들러는 동적 require 를 허용하지 않으므로 id → require 매핑을 정적으로 작성해야 한다.
 *
 * 예:
 *   case 'dog': return require('../assets/images/animals/dog.png');
 */
export function getImage(_id: string): number | null {
  // MVP: 이미지 에셋 없음 → null 반환, 렌더 시 emoji 로 폴백
  return null;
}

/**
 * 오디오 require 매핑. 번들 MP3 가 추가되면 아래 switch 에 case 추가.
 *
 * 예:
 *   case 'dog':
 *     return lang === 'ko'
 *       ? require('../assets/audio/ko/dog.mp3')
 *       : require('../assets/audio/en/dog.mp3');
 */
export function getAudio(_id: string, _lang: 'ko' | 'en'): number | null {
  // MVP: 오디오 파일 없음 → null, expo-speech TTS 폴백
  return null;
}
