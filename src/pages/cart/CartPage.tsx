import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosApi from '../../../axiosApi';
import type { RootState } from '../../../store';
import type { CartItem } from '../../../store/reducers/usersSlice';
import Card from '../../card/Card';
import type { ProductType } from '../../types/Product-type';

const CartPage = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const [products, setProducts] = useState([]);
  const cart = useSelector((state: RootState) => state.users.user?.cart || []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user || user.cart.length === 0) return;

        // Собираем массив productId из user.cart
        const ids = user.cart.map((item: CartItem) => item.product);

        const response = await axiosApi.post('/products/by-ids', { ids });
        setProducts(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || error.message;
          console.error('Axios error:', errorMessage);
        } else {
          console.error('Unknown error:', error);
        }
      }
    };

    fetchCart();
  }, [cart, user]);

  return (
    <div style={{ maxWidth: '285px' }}>
      {cart.length > 0 ? (
        products.map((product: ProductType) => (
          <div key={product._id}>
            <Card
              _id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          </div>
        ))
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </div>
  );
};

export default CartPage;
