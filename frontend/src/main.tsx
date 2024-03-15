import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "./config/i18nConfig/index.ts";
import Spinner from "./components/ui/Spinner/Spinner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Spinner/>}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
);
