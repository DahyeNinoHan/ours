

# 챗봇 응답 길이 줄이기

## 문제
Global Tone Guide에 "Use short sentences"라고 되어 있지만, 모델이 여전히 긴 답변을 생성함. Qwen 0.5B 같은 소형 모델은 간접적인 톤 힌트만으로는 길이 제어가 잘 안 됨.

## 해결 방법

### 1. Global Tone Guide에 길이 제한 명시 추가 (Edge Function)

`supabase/functions/chat/index.ts`의 `TONE_PREFIX`에 명확한 길이 제한 지시문을 추가합니다:

```
[Global Tone Guide]
IMPORTANT: Keep every reply under 2-3 sentences max. Never write long paragraphs.
Always keep the conversation light, playful, and upbeat.
Use short sentences. Sprinkle emoji occasionally.
Talk like a fun friend, not a serious advisor.
Avoid heavy, formal, or preachy tone.
Be witty, spontaneous, and a little quirky.
If the user feels down, lift them up with humor and warmth, not lectures.
Do NOT over-explain. One idea per reply. Be snappy.
```

핵심 추가 내용:
- "Keep every reply under 2-3 sentences max" - 구체적인 숫자 제한
- "Never write long paragraphs" - 장문 금지
- "Do NOT over-explain. One idea per reply. Be snappy." - 간결함 강조

### 2. HuggingFace API에 max_tokens 파라미터 추가 (선택사항)

HuggingFace 백엔드(`app.py`)가 `max_tokens` 파라미터를 지원한다면, payload에 토큰 제한을 추가하여 물리적으로 응답 길이를 제한할 수 있습니다. 이 부분은 HuggingFace 쪽 코드 구조에 따라 다르므로, 우선 프롬프트 수정으로 시작합니다.

## 변경 파일
- `supabase/functions/chat/index.ts` - TONE_PREFIX 문구 수정 (25-32줄)

## 변경되지 않는 부분
- `personalities.json` - 개별 systemPrompt 수정 불필요
- 프론트엔드 코드 변경 없음

