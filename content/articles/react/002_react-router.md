---
title: reduxで状態管理
description: CountUp/Down
category: React
createdAt: 2022-08-12
updatedAt: 2022-08-12
sortNumber: 102
---

# 1.はじめに
redux-toolキットを使って、状態管理をしてみよう。

<br>

# 2. index.tsx
### ■ Provider
```ts
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import { Provider } from "react-redux"
  import store from "./store/index";

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

  reportWebVitals();
```

<br>

# 3. App.tsx
### ■ BrowserRouter
```ts
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CountView from './components/count/countView'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>React Expo</h1>
        <nav>
          <ul>
            <li>
              <a href="/">カウンター</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CountView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```
