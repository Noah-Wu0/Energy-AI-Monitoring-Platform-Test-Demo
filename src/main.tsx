import React from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "./i18n/I18nContext";
import { AppRouter } from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <AppRouter />
    </I18nProvider>
  </React.StrictMode>,
);
