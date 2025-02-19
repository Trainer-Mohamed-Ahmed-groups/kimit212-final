import { StarFilled } from '@ant-design/icons';
import Nav from "./layout/Nav";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import FeaturedProducts from './views/ProductDetails';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './views/SingleProduct';
import { useTranslation } from 'react-i18next';
import Home from './views/Home';
import Cart from './views/Cart';
import Error from './views/error';

function App() {
  const themeContext = useContext(ThemeContext);
  const { i18n } = useTranslation();

  return (
    <div
      className={`
        ${themeContext.themeColor === 'light' ? 'text-gray-800' : 'text-white bg-gray-800'}
        ${i18n.language === 'ar' ? 'rtl' : ''}
        font-(--main-font) min-h-dvh
      `}
    >
      <Nav />

      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/products' Component={FeaturedProducts} />
        <Route path='/products/:id' Component={ProductDetails} />
        <Route path='/cart' Component={Cart} />
        <Route path='/*' Component={Error} />
      </Routes>
    </div>
  );
}

export default App;
