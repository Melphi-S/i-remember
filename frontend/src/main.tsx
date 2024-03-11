import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "./config/i18nConfig/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<div>Загрузка...</div>}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
);
