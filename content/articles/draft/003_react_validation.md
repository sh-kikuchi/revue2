---
title: バリデーション（React側）
description: useRefを使う
category: react_express
createdAt: 2023-01-29
updatedAt: 2023-01-29
sortNumber: 003
path: "/articles/react_express/003_react_validation"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. useRef](#2-useref)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
まだ仮。ベース段階
<br>

# 2. useRef

```js
export default function TextFieldsValidation() {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);

  const handleChange = () => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }
  };

  return (
    <form className={classes.root}>
      <TextField
        error={inputError}
        inputProps={{ maxLength: 4, pattern: "^[a-zA-Z0-9_]+$" }}
        inputRef={inputRef}
        defaultValue=""
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        helperText={inputRef?.current?.validationMessage}
        onChange={handleChange}
      />
    </form>
  );
}


```

<br>

# 3. おわりに


<br>

参考(最終閲覧日 2023/01/29)：
- [MaterialUIのTextFieldにinputタグのvalidationを適用する](https://zenn.dev/enish/articles/5cc332d3eeb1a7)

<br>

</nuxt-content-wrapper>
