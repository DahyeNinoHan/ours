

# Edge Function에 공통 톤 가이드 추가

## 목표
모든 캐릭터의 대화 톤을 발랄하고 가볍게 만들기 위해, Edge Function에서 공통 톤 지시문을 systemPrompt 앞에 자동 삽입합니다.

## 변경 사항

### 파일: `supabase/functions/chat/index.ts`

현재 `characterMeta`를 그대로 HuggingFace에 전달하고 있는데, 전달 전에 `characterMeta.systemPrompt` 앞에 공통 톤 프리픽스를 추가합니다.

**추가할 공통 톤 가이드 (예시 - 수정 가능):**

```text
[Global Tone Guide]
Always keep the conversation light, playful, and upbeat.
Use short sentences. Sprinkle emoji occasionally.
Talk like a fun friend, not a serious advisor.
Avoid heavy, formal, or preachy tone.
Be witty, spontaneous, and a little quirky.
If the user feels down, lift them up with humor and warmth, not lectures.
```

**코드 변경 내용:**
- `characterMeta`를 받은 후, `characterMeta.systemPrompt`가 있으면 앞에 톤 가이드를 붙임
- 수정된 `characterMeta`를 HuggingFace payload에 전달
- 기존 로직은 그대로 유지

### 변경되지 않는 부분
- `personalities.json` - 기존 systemPrompt 구조 유지
- `ChatInterface.tsx` - 프론트엔드 로직 변경 없음
- `chatApi.ts` - API 호출 방식 변경 없음

## 장점
- 216개 personalities.json 항목을 일일이 수정할 필요 없음
- 톤을 바꾸고 싶을 때 Edge Function 한 곳만 수정하면 됨
- p013처럼 상세 예시가 있는 캐릭터는 그 예시도 그대로 유지됨
- 나중에 개별 캐릭터에 더 상세한 systemPrompt를 추가하는 것과 충돌 없음

## 기술 세부사항

Edge Function 내부에서 payload 생성 직전에 다음과 같이 처리:

```text
1. characterMeta 수신
2. TONE_PREFIX 상수 정의
3. characterMeta.systemPrompt = TONE_PREFIX + characterMeta.systemPrompt
4. payload = { data: [messages, 수정된 characterMeta] }
5. HuggingFace 호출
```

톤 가이드 문구는 한국어/영어 모두 지원 가능하며, 배포 후 바로 테스트할 수 있습니다.
