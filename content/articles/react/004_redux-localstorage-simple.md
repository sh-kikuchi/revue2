---
title: reduxで状態管理
description: CountUp/Down
category: React
createdAt: 2022-08-14
updatedAt: 2022-08-14
sortNumber: 104
---


# 1. Redux-localstorage-simple
```
npm install redux-localstorage-simple
```

<br>

# 2. store>index.tsxに加える
```js
import { configureStore } from "@reduxjs/toolkit"
import { initialState as countInitialState, countReducer } from '../components/count/countSlice'
import { initialState as expenseInitialState, expenseReducer } from '../components/expense/ExpenseSlice'
import { save, load } from 'redux-localstorage-simple'; //localStrage

export class RootState {
  count = countInitialState;
  expense = expenseInitialState;
}

//reducer
const reducer = {
  count: countReducer,
  expense: expenseReducer
}

//store
const store = configureStore({
  reducer,

  // ▼localstrage
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
})

export default store;

```

<br>

# 3. localstrageで確認
F12＞アプリケーション

<br>

### ■ キー
```
redux_localstorage_simple
```

<br>

### ■ 値（JSON）
```
{"count":{"count":50},"expense":[{"id":"0.21609348821582208","name":"fdg","price":null,"date":"dfgd"}]}
```
