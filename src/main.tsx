import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { setupStore } from "./store/store.ts";
import "./styles/App.css";
import "./styles/index.css";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
