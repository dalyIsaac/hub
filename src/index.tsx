import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./ServiceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { initializeIcons } from "@uifabric/icons";
import { HashRouter } from "react-router-dom";

import rootReducer from "./Reducer";

const store = createStore(rootReducer, composeWithDevTools());
initializeIcons();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
