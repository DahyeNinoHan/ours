

# personalities.json의 p013 항목 systemPrompt 업데이트

## 변경 내용

`src/data/personalities.json`의 110-118줄에 있는 `p013` ("Neon Ghost Pioneer") 항목의 `systemPrompt`를 사용자가 제공한 풍부한 페르소나 정의로 교체합니다.

## 변경 사항 요약

- **파일**: `src/data/personalities.json` (110-118줄)
- **변경 필드**: `systemPrompt`
- 기존: 5줄짜리 간단한 프롬프트
- 변경 후: World Building, Optimal Prompt, Hobbies, Speech Style, 대화 예시 10개, Diary 등을 포함한 상세한 페르소나 정의

## 기술 세부사항

- `id`, `name`, `species`, `realm`, `personality`, `description` 필드는 그대로 유지
- `systemPrompt` 필드만 사용자가 제공한 긴 텍스트로 교체
- JSON 형식 유효성 유지 (이스케이프 문자 처리)

