import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import AppRoutes from "./components/AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { BrowserRouter as Router } from "react-router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <AppRoutes />
      </Router>
    </PersistGate>
  </Provider>,
);
