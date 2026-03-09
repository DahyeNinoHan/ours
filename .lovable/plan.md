

## 버튼 스타일 통일 계획

### 현재 상태

| 위치 | 버튼 | 현재 스타일 |
|------|------|------------|
| `/main` (CharacterCreator) | Chat, Meditation | 큰 흰색 배경, 검은 텍스트, `w-11/12 py-6 text-2xl` |
| `/chat` (ChatInterface) | Main, Meditation | `variant="outline" size="sm" text-xs min-w-[120px]` |
| `/meditation` (DigitalMeditation) | Main, Chat | `variant="outline" size="sm" text-xs min-w-[120px]` |

→ `/main`의 버튼만 크고 흰색이고, `/chat`과 `/meditation`은 작은 outline 스타일로 불일치

### 통일 방향

세 페이지 모두 동일한 네온 터미널 스타일로 통일:
- `variant="outline"`, `font-mono tracking-wider`
- `glow-effect` 클래스로 hover 시 네온 글로우
- 크기: `min-w-[140px] py-2 text-sm` (현재 `/chat`, `/meditation`보다 약간 크고, `/main`보다는 작은 중간 사이즈)
- 네온 보더 강조: `border-primary/50 hover:border-primary hover:shadow-[0_0_15px_hsl(120,100%,50%,0.3)]`

### 수정 파일 (3개)

1. **`src/components/CharacterCreator.tsx`** (lines 579-590): Chat/Meditation 버튼을 `w-11/12 py-6 bg-white text-2xl` → 통일 스타일로 변경
2. **`src/components/ChatInterface.tsx`** (lines 607-624): Main/Meditation 버튼 className 업데이트
3. **`src/components/DigitalMeditation.tsx`** (lines 313-328): Main/Chat 버튼 className 업데이트

공통 className: `"font-mono tracking-wider min-w-[140px] py-2 text-sm border-primary/50 hover:border-primary glow-effect"`

