---
title: FormRequest とバリデーション（Request / Validator）
description: requests/ 配下のクラスの作り方と、自動バリデーションの仕組み
category: php
createdAt: 2026-09-15
updatedAt: 2026-10-03
sortNumber: 306
path: "/documents/ghostphp/v4.0/306_request_validation"
---

<nuxt-content-wrapper>

> **v4.0で新設** された仕組み。旧 `form_classes/` は、単に `$_POST` を保持するだけの
> データ保持クラスだったが、v4.0の `requests/` は **入力の取得とバリデーションを1つのクラスに集約する
> FormRequestパターン** に置き換わっている。Routerが自動的にインスタンス化・検証を行う（[304_router_class.md](304_router_class.md)）。

## 1. 抽象クラス `Request`（`aura/https/Request.php`）

`requests/` 配下の各クラスは、この抽象クラスを継承して作る。

```php
<?php

namespace app\aura\https;

use app\aura\https\Validator;

abstract class Request {
    protected array $data = [];

    public function fill(array $data): void {
        $this->data = $data;

        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function all(): array {
        return $this->data;
    }

    public function input(string $key, mixed $default = null): mixed {
        $keys = explode('.', $key);
        $value = $this->data;

        foreach ($keys as $segment) {
            if (is_array($value) && array_key_exists($segment, $value)) {
                $value = $value[$segment];
            } else {
                return $default;
            }
        }

        return $value;
    }

    public function file(string $key): ?array {
        $file = $this->data['_files'][$key] ?? null;

        if (!$file) {
            return null;
        }

        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
            return null;
        }

        return $file;
    }

    public function files(): ?array {
        return $this->data['_files'] ?? [];
    }

    public function validate(): array {
        $validator = new Validator();
        $this->rules($validator);
        return $validator->getErrors();
    }

    abstract protected function rules(Validator $validator): void;
}
```

### コード説明

- `fill(array $data)`
  - リクエストデータ（`$_GET`/`$_POST`、またはJSONボディ。`_files` キーで `$_FILES` も同梱）を受け取り、
    **同名のpublicプロパティがあれば直接代入する**。`UserRequest::$email` のように定義しておけば、
    `fill()` 後は `$this->email` としてそのままアクセスできる。
- `all()` / `input(string $key, mixed $default = null)`
  - 生データへのアクセサ。`input()` はドット区切りで `_files.upfile` のようにネストした値も取得できる。
- `file(string $key)` / `files()`
  - アップロードファイル用のアクセサ。`file()` はアップロードが無い場合に `null` を返す。
- `validate(): array`
  - `Validator` を生成し、サブクラスで実装する `rules()` を呼び出して検証を実行、エラー配列を返す。
  - **`Router::resolve()` が自動的に呼び出す** ため、コントローラー側で明示的に呼ぶ必要はない。
- `abstract protected function rules(Validator $validator): void`
  - サブクラスは必ずこのメソッドを実装し、`$validator` の各メソッドを呼んでバリデーションルールを定義する。

## 2. バリデーター：`app\aura\https\Validator`

v4.0 のバリデーターは `app\aura\https\Validator` に一本化した。`Request::rules()`（FormRequest）からも、`Controller` が保持する `$this->validator` からも、このクラスを使う。
エラーは `$this->errors[] = [$field => $message]`（連番配列）の形式で保持する。

> **非推奨**: 旧来の `app\aura\utils\Validator` は `https\Validator` に移動したため `@deprecated` とした。次のメジャーバージョン（v5.0）で削除予定。
> エラー保持形式が `$this->errors[$field] = $message`（連想配列）から変わっている点に注意（[604_validator_class.md](604_validator_class.md) の移行メモ参照）。

`app\aura\https\Validator` が提供する主なメソッド：

- `required($value, $field)` : 空でないことを検証
- `mailFormat($email, $field)` : メール形式を検証
- `passwordFormat($password, $field)` : 英数字8〜100文字を検証
- `passwordConfirm($password, $password_conf)` : パスワード確認一致を検証
- `hasFile($value, $field)` : `_files.xxx` の配列にアップロードが存在するかを検証（v4.0で新設。複数ファイル対応の `$_FILES['x']['error'][0]` 形式を想定）
- `minLength($value, $field, $min)` / `maxLength($value, $field, $max)` : 文字数の下限・上限を検証（v4.0で新設。旧 `validateString()` の分割版）
- `numeric($value, $field)` / `integer($value, $field)` : 数値・整数であることを検証
- `min($value, $field, $min)` / `max($value, $field, $max)` / `between($value, $field, $min, $max)` : 数値の下限・上限・範囲を検証
- `greaterThanOrEqual($value, $field, $compareValue, $compareField)` : 値が別フィールドの値以上であることを検証
- `setCustomMessages(array $customMessages)` : フィールドごとのカスタムエラーメッセージを設定

詳細は [604_validator_class.md](604_validator_class.md) を参照。

## 3. FormRequestの実装例

### ■ UserRequest（サインイン／サインアップ共通）
```php
<?php
namespace app\requests;

use app\aura\https\Request;
use app\aura\https\Validator;
use app\aura\utils\Session;

class UserRequest extends Request {
    public int $id;
    public string $name;
    public string $email;
    public string $password;
    public string $password_conf;

    protected function rules(Validator $validator): void {
        $validator->required($this->email, 'email');
        $validator->mailFormat($this->email, 'email');
        $validator->passwordFormat($this->password, 'password');

        if (!empty($this->name)) {
            $validator->required($this->name, 'name');
        }

        if (!empty($this->password_conf)) {
            $validator->passwordConfirm($this->password, $this->password_conf);
        }

        if (!empty($_SESSION['ERROR_MESSAGES'])) {
            (new Session)->oldPostValue($this->all());
        }
    }
}
```

### ■ PostRequest
```php
class PostRequest extends Request {
    public int $id;
    public int $user_id;
    public string $title;
    public string $body;

    protected function rules(Validator $validator): void {
        $validator->required($this->title, 'title');
        $validator->maxLength($this->title, 'title', 100);

        if (!empty($_SESSION['ERROR_MESSAGES'])) {
            (new Session)->oldPostValue($this->all());
        }
    }
}
```

### ■ FileRequest（ファイルアップロード）
```php
class FileRequest extends Request {
    public ?array $upfile = null;

    protected function rules(Validator $validator): void {
        $files = $this->input('_files.upfile');
        $validator->hasFile($files, 'files');
    }
}
```

### ■ MailRequest
```php
class MailRequest extends Request {
    public string $mail;
    public string $username;
    public string $comment;

    protected function rules(Validator $validator): void {
        $address = $this->input('mail');
        $validator->mailFormat($address, 'mail');
    }
}
```

## 4. コントローラー・サービスからの使い方

コントローラーのメソッド引数に `FormRequest` のクラス型を書くだけでよい。生成・`fill()`・`validate()` はすべて `Router` が行う。

```php
class PostController extends Controller {
    public function create(PostRequest $post_request): void {
        if (!$this->checkToken('post_create')) {
            echo 'Invalid token.';
            return;
        }

        // ここに到達した時点で、$post_requestは検証済み
        if (!$this->post_service->create($post_request)) {
            Redirect::to('post/create');
            return;
        }

        Redirect::to('post');
    }
}
```

サービス側では、FormRequestからEntityを組み立てるのが典型的な使い方である。

```php
public function makePost(PostRequest $postRequest): Post {
    $post = new Post();

    if (!empty($postRequest->input('id'))) {
        $post->setId($postRequest->input('id'));
    }

    $post->setUserId($postRequest->input('user_id'));
    $post->setTitle($postRequest->input('title'));
    $post->setBody($postRequest->input('body'));

    return $post;
}
```

## 5. 新しいFormRequestを追加する手順

1. `requests/` に `XxxRequest.php` を作成し、`namespace app\requests;` を宣言する
2. `app\aura\https\Request` を継承する
3. フォームの入力名と同名の `public` プロパティを定義する（`fill()` が自動でセットしてくれる）
4. `protected function rules(Validator $validator): void` を実装し、必要な検証メソッドを呼ぶ
5. `index.php` のルートで、コントローラーメソッドの引数型として指定する
   ```php
   $app->router->post('post/create', [PostController::class, 'create']);
   // PostController::create(PostRequest $post_request) と定義しておけば自動的に解決される
   ```

</nuxt-content-wrapper>
