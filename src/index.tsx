import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./ServiceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { initializeIcons } from "@uifabric/icons";
import { HashRouter } from "react-router-dom";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./Reducer";
import { PersistGate } from "redux-persist/integration/react";
import transformSubjects from "./subject/model/Transform";

const persistConfig = {
  key: "root",
  storage,
  transforms: [transformSubjects],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

initializeIcons();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
