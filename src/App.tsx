import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '../store';
import './App.scss';
import Layout from './layout/Layout';
import CartPage from './pages/cart/CartPage';
import CatalogPage from './pages/catalog-page/CatalogPage';
import CheckoutPage from './pages/checkout-page/CheckoutPage';
import FavoritePage from './pages/favorite-page/FavoritePage';
import HomePage from './pages/home-page/HomePage';
import ProductPage from './pages/product-page/ProductPage';
import RegisterPage from './pages/register/RegisterPage';
import SignInPage from './pages/sign-in/SignIn';
import PrivateRoute from './private-route/PrivateRoute';
import AdminPage from './pages/admin-page/AdminPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/catalog' element={<CatalogPage />} />
            <Route path='/catalog/:category' element={<CatalogPage />} />
            <Route path='/catalog/product/:id' element={<ProductPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<SignInPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/favorites' element={<FavoritePage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route
              path='/admin'
              element={
                <PrivateRoute role='admin'>
                  <AdminPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
