# BZ-20260725-002 JSON破損事件

## 分類

Contract / DTO

## 症状

LLMがJSONを壊す。

## Root Cause

LLM出力を、構造化データとして無条件に信用していた。

## 教訓

直すより先に、『なぜ壊れたか』を見る。
