# S2-01 Configurationはコードではない

### 📌 本記事
- **Season2 第01話：Configurationはコードではない**

### 関連記事はコチラ👇
- Season1（01〜09）：壊れないAI Workflowを設計する
- 07 すべて直した。それでも終わらなかった。（副題：Configuration Managementという最後の壁）

---

## 【目次】

1. Season2の始まり：あの「壁」の中身から
2. コードなら、これで終わる話だった
3. 一つのPromptが、5つの顔を持つ
4. 実例：`CFG-A002`、両方とも間違っていない
5. Configuration Itemという発想
6. まとめ

---

## 1. Season2の始まり：あの「壁」の中身から

Season1の07で、Configuration Managementのことを「最後の壁」と呼んだ。Contract、DTO、Normalize、Retryで、AIの出力はかなり手堅く縛れた。それでも終わらなかったのが、GUI、Draft、DSL、Git、Documentation、Runtimeという、人間側の運用だった。

Season2は、この壁の中身から始める。最初に立てる問いはシンプルだ。**Prompt、Graph、Node Parameter、Runtime設定は、なぜ普通のコードと同じように扱えないのか。**

## 2. コードなら、これで終わる話だった

コードなら、話は単純だ。ファイルがあり、中身がある。変更すれば`git diff`に出る。誰かが同じファイルを別の場所で勝手に書き換えることはない。ファイルの中身こそが、そのコードの唯一の実体だ。

でもLocal AI FoundryのConfigurationは、そうなっていない。Configuration Managementの適用範囲には、こう列挙されている。

- Dify DraftおよびPublished Workflow
- Workflow DSL
- Graph、Node、Edge、条件分岐
- Agent PromptとPrompt変数
- Codeノード
- DTO、Normalize、Contract Gate、Validator
- LLM Node Parameters
- Model Provider Settings
- Git管理状態
- Documentation
- Runtime Run graphと実行証跡

これは「対象の一覧」であると同時に、「一つのPromptが同時に存在しうる場所の一覧」でもある。

## 3. 一つのPromptが、5つの顔を持つ

例えば、Research Agentが使うPromptを考える。これは同時に、次の場所に存在しうる。

- **GUI**：人間がDifyの画面上で直接編集する見た目
- **Draft**：GUIでの編集がDify内部に保存された、まだ未確定の状態
- **DSL**：Draftをエクスポートして、Gitで管理しているYAMLファイルの中身
- **Published**：実際に公開されているWorkflowが使っているバージョン
- **Runtime**：実行時に、実際にモデルへ送信された中身

Runtimeは、その実行で実際にモデルへ送られた最終形だ。Prompt Templateやパラメータ設定が同じでも、実行時のContextによって送信内容は変わりうる。だからRuntimeは、GUIやDSLとは別に、独立して確認する必要がある。

コードなら「ファイルの中身」しか実体がない。でもこのPromptは、最大5つの場所に、それぞれ別のタイミングで更新される、別々の「姿」を持ちうる。GUIでいじった瞬間に変わるものもあれば、Gitにpushするまで反映されないものもある。しかも、この5つが常に一致している保証はどこにもない。

## 4. 実例：`CFG-A002`、両方とも間違っていない

Configuration Item Registry（全Configuration Itemを一覧管理する台帳）に、実際にこの状態のまま止まっているItemがある。`CFG-A002`、Research Promptだ。

Registry上の記載はこうなっている。

- Current Owner：`Unresolved`
- Current Status：`Blocked`
- 注記：**Draft本文とDSL短文化制約の双方に有効変更がある**

これがどういう状態か、想像してみてほしい。Draft側には、人間かAIかが加えた、意味のある変更がある。同時に、DSL側にも、別の目的で加えられた、意味のある変更がある。**どちらも、それ単体で見れば正しい変更だ。でも両方を同時に採用することはできない。**

少なくとも、Gitが見ている世界では、こうはならない。同じファイルの同じ行を、二人が別々に書き換えようとしたら、それはマージコンフリクトとして`git`が検出して教えてくれる。でも今回の場合、DraftとDSLは物理的に別の場所にある別のデータだ。`git diff`はDSLというファイルの中身しか見ていない。Draft側で何が起きているかは、`git`の視界に入ってすらいない。

だから、この矛盾は「バグ」でも「事故」でもない。**Configurationが、コードとは違う場所に、コードとは違うタイミングで、同時多発的に変更されうる**という、構造上避けられない状態だ。

## 5. Configuration Itemという発想

この状態を扱うために、Local AI FoundryはConfiguration Managementの中で、Configuration Itemという単位を定義している。Configuration Itemとは、簡単に言えば「管理対象を、これ以上分割できない最小単位まで切り分けたもの」だ。Workflow全体でもなく、Node一つでもなく、Prompt一つ、Parameter一つという粒度で扱う。

正式な定義はこうだ。

> Configuration Itemは、独立して差分、採用判断、検証、同期状態を管理する最小単位である。

ポイントは「独立して」という部分だ。Workflow全体を一つの塊として「これが正しい」と決めるのではなく、Prompt一つ、Code一つ、LLM Parameter一つ、それぞれに対して、個別にID、Owner、現在の状態を持たせる。`CFG-A002`もその一つだ。

そして、こう釘を刺されている。

> 実装されたことと、正式なConfigurationとして登録されたことは別である。

DifyのGUIで何かを直したという事実だけでは、それが正式な状態として扱われない。Registryに登録され、Owner（今どちらの変更を採用するか）が確定し、検証されて、初めて「同期済み」と呼べる状態になる。`CFG-A002`が`Unresolved`のままなのは、まだ誰も「Draft側とDSL側、どちらを採用するか」を決めていないからだ。

## 6. まとめ

コードは、ファイルの中身がすべてだ。だから`git diff`一つで、何が変わったかを完全に把握できる。

でもConfigurationは違う。GUI、Draft、DSL、Published、Runtime、最大5つの場所に、それぞれ別々のタイミングで、別々の変更が加えられうる。しかも、その変更はどれも「間違っている」わけではない。ただ、同時に存在すると矛盾する。

`CFG-A002`は、今もこの状態のまま止まっている。Draft側の変更もDSL側の変更も、消されず、無視もされず、「未確定」というステータスのまま、Registryに記録され続けている。これがConfigurationという概念を、単なるコード差分の一種として扱えない理由だ。

次は、この「実装されたこと」と「正式な管理対象になったこと」の境目、Configuration Registrationの話をする。

---

※本記事は「Local AI Foundry」開発ログ Season2の01本目。Season1（01〜09）も合わせてどうぞ。実例は`CFG-A002`（Configuration Item Registry）を参照。設計判断はADR-0009に基づく。
