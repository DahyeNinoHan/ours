# Global Tone Guide에 이모티콘 사용 지시 추가

## 변경 내용

`supabase/functions/chat/index.ts`의 `TONE_PREFIX`에 이모티콘 사용 규칙을 추가합니다.

## 추가할 지시문

다음 문구를 TONE_PREFIX 끝부분에 추가:

```
About 50% of the time, include one of these kaomoji in your reply (pick randomly):

（ʃƪ＾3＾)
ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧
(๑✪ᆺ✪๑)
°˖✧◝(⁰▿⁰)◜✧˖° 
☆٩(｡•ω<｡)و]  
(≖⩊≖)
(๑╹o╹)✎
(▭-▭)✧
(ง •̀_•́)ง✧
(≖⩊≖)
(≖͞_≖̥)
(๑•﹏•)੭
(๑•́ ₃ •̀๑).
(⁄⁄•⁄ω⁄•⁄⁄)⁄
(๑•﹏•)
(〃´o｀)
(⊙﹏⊙;)
(≧﹏≦)
٩(இ ⌓ இ๑)۶
?(°Д°≡°Д°)?
((；ﾟДﾟ))
（/｡＼)
(・_・;)
(ﾟдﾟ；)
?(°Д°≡°Д°)?)

```

&nbsp;

## 변경 파일

- `supabase/functions/chat/index.ts` - TONE_PREFIX 수정 (25~35줄)

## 변경되지 않는 부분

- personalities.json, 프론트엔드 코드 변경 없음