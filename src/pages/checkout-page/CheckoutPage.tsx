import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../../axiosApi';
import type { RootState } from '../../../store';
import type { AppDispatch } from '../../../store/index';
import type { CartItem } from '../../../store/reducers/usersSlice';
import type { ProductType } from '../../types/Product-type';

const CheckoutPage = () => {
  const cart = useSelector((state: RootState) => state.users.user?.cart || []);
  const [shipping, setShipping] = useState(25);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    zip: '',
  });
  const [products, setProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user || user.cart.length === 0) return;

        // Собираем массив productId из user.cart
        const ids = cart.map((item: CartItem) => item.product);
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

  const subtotal = products.reduce((sum, product) => {
    const cartItem = cart.find(item => String(item.product) === String(product._id));
    const quantity = cartItem?.quantity || 1;
    return sum + product.price * quantity;
  }, 0);

  const tax = 6.35;
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrderSubmit = async () => {
    if (!formData.firstName || !formData.address) {
      alert('Please fill in all the required fields');
      return;
    }

    const orderData = {
      items: cart,
      total,
      shipping,
      paymentMethod,
      customer: formData,
    };

    try {
      const response = await axios.post('http://localhost:8000/orders', {
        headers: { Authorization: user?.token },
        body: JSON.stringify(orderData),
      });
      if (response.data) {
        alert('Заказ успешно оформлен');
        // if (response.data) {
        //   alert('Заказ успешно оформлен');
        //   dispatch(clearCartAsync());
        // }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка при оформлении заказа');
    }
  };

  return <div>checkout page</div>;
};

export default CheckoutPage;
