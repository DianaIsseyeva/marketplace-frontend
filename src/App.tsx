import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './layout/Layout';
import CatalogPage from './pages/catalog-page/CatalogPage';
import HomePage from './pages/home-page/HomePage';
import ProductPage from './pages/product-page/ProductPage';
import RegisterPage from './pages/register/RegisterPage';
import SignInPage from './pages/sign-in/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/catalog' element={<CatalogPage />} />
          <Route path='/catalog/:category' element={<CatalogPage />} />
          <Route path='/catalog/product/:id' element={<ProductPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
