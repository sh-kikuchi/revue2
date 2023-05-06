---
title: reduxで状態管理
description: CountUp/Down
category: React
createdAt: 2022-08-13
updatedAt: 2022-08-13
sortNumber: 103
---

# 1.はじめに
redux-toolキットを使って、状態管理をしてみよう。

<br>

```
プロジェクトディレクトリ
│
│── src ←新規作成して下さい。
│   │── components
│       │── count
│       │     │── countSlice.tsx
│       │     │── countView.tsx
│       │
│       │── store
│       │     │── index.tsx
│       │
``` 

<br>

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();

```




# 2. Viewのコンポーネント

```ts
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementCount, decrementCount } from './countSlice'
import { RootState } from '../../store/index'

function Count() {
  const count = useSelector((state: RootState) => state.count);
  const dispatch = useDispatch();
  const increase = () => {
    //dispatchでactionをstoreに渡す
    dispatch(incrementCount());
  };
  const decrease = () => {
    dispatch(decrementCount());
  };
  return (
    <>
      {/* <div className="count">Countコンポーネント:{count}</div> */}
      <p>{count.count}</p>
      <button onClick={increase}>Up</button>
      <button onClick={decrease}>Down</button>
    </>
  );
}
export default Count;
```

<br>

# 3. Actionsとreducer

```ts
import { createSlice } from "@reduxjs/toolkit";

interface CountState {
  count: number
}

export const initialState: CountState = {
  count: 50,
}

//createSlice:reducerとactionsをまとめる
const counterSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    //actions(){fn()}
    incrementCount(state) {
      state.count++
    },
    decrementCount(state) {
      state.count--
    }
  }
});

//export(actions/reducer)
export const { incrementCount, decrementCount } = counterSlice.actions
export const countReducer = counterSlice.reducer
```

<br>

# 4. Store

```ts
import { configureStore } from "@reduxjs/toolkit"
import { initialState as countInitialState, countReducer } from '../components/count/countSlice'

export class RootState {
  count = countInitialState
}

//reducer
const reducer = {
  count: countReducer
}

//store
const store = configureStore({
  reducer
})

export default store;

```

<br>

# 5. おわりに
