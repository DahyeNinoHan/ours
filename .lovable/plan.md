

# /chat 챗봇 수정 계획

## 현재 상태 분석

코드를 분석한 결과, 아키텍처 자체는 대부분 올바르게 구성되어 있습니다:

- `personalities.json`에 216개의 페르소나가 species/realm/personality 조합별로 정의됨
- `ChatInterface.tsx`에서 character의 species/realm/personality로 매칭되는 페르소나를 찾고, `systemPrompt`를 `characterMeta`에 포함하여 전송
- `chatApi.ts`에서 Gradio `/predict` 엔드포인트로 `[messages, characterMeta]` 전송
- HuggingFace `app.py`에서 `characterMeta`의 `systemPrompt`를 추출하여 시스템 프롬프트로 사용

**핵심 문제: `VITE_HF_TOKEN` 환경변수(시크릿)가 설정되어 있지 않습니다.** 현재 프로젝트에 시크릿이 하나도 등록되어 있지 않아, API 호출 시 즉시 에러가 발생합니다.

또한 보안 관점에서, HF 토큰을 프론트엔드에서 직접 사용하는 것은 토큰 노출 위험이 있습니다.

---

## 수정 계획

### 1단계: Supabase Edge Function으로 API 호출 이전 (보안 강화)

HF 토큰을 클라이언트에 노출하지 않도록 Supabase Edge Function을 생성합니다.

**새 파일: `supabase/functions/chat/index.ts`**
- 클라이언트로부터 `messages`와 `characterMeta`를 받음
- 서버 측에서 `HF_TOKEN` 시크릿을 사용하여 HuggingFace Gradio API 호출
- 응답을 클라이언트에 반환

### 2단계: HF_TOKEN 시크릿 등록

- Supabase 시크릿으로 `HF_TOKEN`을 등록 (프론트엔드 환경변수 대신)

### 3단계: chatApi.ts 수정

- 직접 HuggingFace를 호출하는 대신 Supabase Edge Function을 호출하도록 변경
- `VITE_HF_TOKEN` 의존성 제거

### 4단계: personalities.json 활용 확인

현재 코드의 페르소나 매칭 로직(ChatInterface.tsx 347-357줄)은 이미 올바르게 구현되어 있습니다:
- `species`, `realm`, `personality` 3개 필드로 정확한 매칭
- 매칭된 페르소나의 `systemPrompt`를 `characterMeta`에 포함
- `app.py`의 `get_system_prompt(meta)`가 이를 읽어 시스템 프롬프트로 적용

이 부분은 변경 없이 유지합니다.

---

## 기술 상세

### Edge Function 구조

```text
Client (ChatInterface.tsx)
  |
  v
chatApi.ts --> Supabase Edge Function (/functions/v1/chat)
                  |
                  v
              HuggingFace Gradio API (ninohan-ours.hf.space/predict)
                  |-- HF_TOKEN (서버 시크릿)
                  |-- payload: { data: [messages, characterMeta] }
```

### chatApi.ts 변경 내용
- `fetch('https://ninohan-ours.hf.space/predict', ...)` 를 `supabase.functions.invoke('chat', ...)` 로 교체
- `VITE_HF_TOKEN` 참조 제거
- 에러 처리 유지

### supabase/config.toml 업데이트
- `chat` 함수 등록 및 `verify_jwt = false` 설정 (공개 접근 허용)

### 변경되지 않는 부분
- `personalities.json` 구조 (이미 올바름)
- `/main` -> `/chat` 페르소나 전달 방식 (location.state 통해 character 전달, 이미 올바름)
- CharacterCreator, Cosmic Age 비주얼 로직
- Entity Species SVG 렌더링

