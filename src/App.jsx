import { Input } from "antd";
import Nav from "./layout/Nav";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
function App() {

  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div className={(themeContext.themeColor === 'light' ? 'text-gray-800' : 'text-white bg-gray-800') + ' h-dvh'}>
      <Nav />
      <h1 className="text-3xl font-bold underline ms-3">
        {t('hello')}
      </h1>
      <Input placeholder="Basic usage" className="!w-1/2" />
    </div>
  )
}

export default App
