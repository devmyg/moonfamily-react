import ConfigProvider from "antd/es/config-provider";
import "./App.css";
import MainLayout from "./views/layouts/MainLayout";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "NEXON Lv2 Gothic Medium",
        },
      }}
    >
      <MainLayout />
    </ConfigProvider>
  );
}
