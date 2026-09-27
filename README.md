# 5.2.2.React-Controlled-Components-Multiple-Forms

## 概要

React の **Controlled コンポーネント**を使って、複数のフォーム入力を1つの `useState` オブジェクトで管理する。

名前・メールアドレス・年齢を入力すると、入力された内容を JSON 形式でリアルタイムに表示する。

また、各 `input` の `name` 属性を利用して、1つの `handleChangeForm` で複数のフォームを動的に更新する。

---

## 課題

複数のフォームを持つ Controlled コンポーネントを作成してください。

ユーザーが名前・メールアドレス・年齢を入力すると、下部に JSON 形式でリアルタイム表示されるようにしてください。

### 条件

1. `useState` にオブジェクトを使って管理すること
2. `name` 属性を用いて動的に値を更新すること
3. TailwindCSS でフォーム全体を `space-y-2` にすること

---

## 完成イメージ

以下のようなフォームを作成する。

```text
名前
[ 山田太郎 ]

メールアドレス
[ example@example.com ]

年齢
[ 25 ]
```

入力すると、下部にリアルタイムで JSON を表示する。

```json
{
  "name": "山田太郎",
  "email": "example@example.com",
  "age": 25
}
```

---

## 学習内容

* Controlled コンポーネント
* `useState`
* オブジェクトによる State 管理
* `name` 属性
* `event.target.name`
* `event.target.value`
* Computed Property Names
* スプレッド構文
* JSON 形式でのデータ表示
* `JSON.stringify()`
* TailwindCSS の `space-y-2`
* カスタムフックによるロジック分離

---

## ディレクトリ構成

```text
src/
├── hooks/
│   └── useHandleForm.ts
├── pages/
│   └── FormPage.tsx
├── types/
│   └── FormType.ts
├── App.tsx
├── index.css
└── main.tsx
```

### ファイルの役割

#### `types/FormType.ts`

フォームデータの型を定義する。

```ts
type FormType = {
  name: string;
  email: string;
  age: number | null;
};

export type { FormType };
```

#### `hooks/useHandleForm.ts`

フォームの State と入力値の更新処理を管理する。

#### `pages/FormPage.tsx`

フォームと JSON データを表示する。

#### `App.tsx`

`FormPage` を表示する。

---

## 実装例

### `types/FormType.ts`

```ts
type FormType = {
  name: string;
  email: string;
  age: number | null;
};

export type { FormType };
```

---

### `hooks/useHandleForm.ts`

```ts
import { useState } from "react";
import type { FormType } from "../types/FormType";

const useHandleForm = () => {
  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    age: null,
  });

  const handleChangeForm = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  return {
    form,
    handleChangeForm,
  };
};

export default useHandleForm;
```

---

### `pages/FormPage.tsx`

```tsx
import useHandleForm from "../hooks/useHandleForm";

const FormPage = () => {
  const { form, handleChangeForm } = useHandleForm();

  return (
    <div>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChangeForm}
          placeholder="名前"
          className="block border p-2"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChangeForm}
          placeholder="メールアドレス"
          className="block border p-2"
        />

        <input
          type="number"
          name="age"
          value={form.age ?? ""}
          onChange={handleChangeForm}
          placeholder="年齢"
          className="block border p-2"
        />
      </div>

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
};

export default FormPage;
```

---

### `App.tsx`

```tsx
import FormPage from "./pages/FormPage";

const App = () => {
  return <FormPage />;
};

export default App;
```

---

## `name` 属性による動的更新

今回の重要なポイント。

```tsx
<input
  type="text"
  name="name"
  value={form.name}
  onChange={handleChangeForm}
/>
```

`onChange` が実行されると、

```ts
event.target.name
```

から `input` の `name` 属性を取得できる。

例えば、

```text
name="name"
```

なら、

```ts
event.target.name
// "name"
```

となる。

そのため、

```ts
setForm({
  ...form,
  [name]: value,
});
```

によって、動的に State のプロパティを更新できる。

---

## Computed Property Names

以下の記述がポイント。

```ts
[name]: value
```

例えば、

```ts
const name = "email";
const value = "test@example.com";
```

の場合、

```ts
{
  [name]: value
}
```

は、

```ts
{
  email: "test@example.com"
}
```

になる。

そのため、`name` 属性を利用すると1つの変更処理で複数の入力欄を扱える。

```text
name="name"
    ↓
form.name

name="email"
    ↓
form.email

name="age"
    ↓
form.age
```

---

## `age` の注意点

HTML の `input` から取得する

```ts
event.target.value
```

は文字列として取得される。

そのため、`age` を `number` として管理する場合は、

```ts
Number(value)
```

で数値に変換する。

```ts
[name]: name === "age" ? Number(value) : value
```

これによって、

```text
"25"
```

ではなく、

```text
25
```

として State に保存できる。

---

## JSON のリアルタイム表示

```tsx
<pre>{JSON.stringify(form, null, 2)}</pre>
```

`JSON.stringify()` を使うことで、State のオブジェクトを JSON 形式の文字列として表示できる。

```ts
JSON.stringify(form, null, 2)
```

の `2` は JSON のインデント幅を指定している。

---

## Controlled コンポーネントのデータフロー

今回の処理は以下の流れになる。

```text
ユーザーが入力
      ↓
onChange
      ↓
handleChangeForm
      ↓
event.target.name
event.target.value
      ↓
setForm()
      ↓
form State 更新
      ↓
再レンダリング
      ↓
input と JSON が更新
```

---

## TailwindCSS

フォーム全体に、

```tsx
className="space-y-2"
```

を適用する。

`space-y-2` によって、縦方向に並んだフォーム要素の間隔を設定できる。

各入力欄には、

```tsx
className="block border p-2"
```

を使用している。

* `block`：入力欄をブロック要素として表示
* `border`：枠線を追加
* `p-2`：内側に余白を追加

---

## 起動方法

```bash
npm run dev
```

ブラウザで表示されたURLにアクセスする。

---

## 確認項目

* [ ] `useState` でフォームをオブジェクトとして管理している
* [ ] `FormType` でフォームの型を定義している
* [ ] `name` 属性を設定している
* [ ] `event.target.name` を利用している
* [ ] Computed Property Names `[name]` を使用している
* [ ] `...form` で既存の値を保持している
* [ ] `age` を `number` に変換している
* [ ] `JSON.stringify()` で JSON を表示している
* [ ] 入力内容がリアルタイムで JSON に反映される
* [ ] フォーム全体に `space-y-2` を適用している
* [ ] Controlled コンポーネントとして実装している
