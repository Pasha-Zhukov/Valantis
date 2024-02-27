import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import api from "./apiService.ts";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
