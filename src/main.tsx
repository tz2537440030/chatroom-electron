import "antd-mobile/es/global";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import "./index.css";

// React Router v6 用 HashRouter
import { RouterProvider } from "react-router-dom";
import router from "@/routes"; // 你的路由配置

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
