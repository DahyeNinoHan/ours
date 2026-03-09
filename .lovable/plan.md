
## 분석

`CharacterCreator.tsx`의 초기 `character` state가 고정값으로 설정되어 있음:
- `species: "Neon Ghost"` ✅ 유지
- `age: 0` → 랜덤으로 변경 필요
- `realm: "Auroral Rainbow"` → 랜덤으로 변경 필요  
- `personality: "Pioneer"` → 랜덤으로 변경 필요

현재 `mapToOriginalRange` 함수가 컴포넌트 내부에 정의되어 있어서, `cosmicAge` 초기값도 같이 맞춰줘야 함.

## 변경 계획

**`src/components/CharacterCreator.tsx`** 하나만 수정:

1. **`mapToOriginalRange` 함수를 컴포넌트 외부로 추출** — state 초기화 시 사용할 수 있도록
2. **초기 랜덤값을 생성하는 함수 `getInitialRandomValues()` 추가** — 컴포넌트 외부에서 `DIGITAL_REALMS`, `PERSONALITY_TRAITS`의 키를 랜덤 선택
3. **`useState<Character>` 초기값 수정** — `species: "Neon Ghost"` 고정, 나머지 3개 랜덤값 사용
4. **`useState<number>(cosmicAge)` 초기값 수정** — 랜덤 age를 `mapToOriginalRange`로 매핑한 값으로 초기화

```text
컴포넌트 외부
├── mapToOriginalRange(age) — 기존 함수를 외부로 이동
└── getInitialRandomValues() — realm, personality, age 랜덤 생성

컴포넌트 내부
├── useState<Character>({ ...getInitialRandomValues(), species: "Neon Ghost" })
└── useState<number>(mapToOriginalRange(초기age))
```

기존 `mapToOriginalRange`가 컴포넌트 내부에도 남아있으면 중복이므로 내부 정의는 제거하고 외부 함수를 참조하도록 변경.
