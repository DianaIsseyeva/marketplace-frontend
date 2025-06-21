import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosApi from '../../../axiosApi';
import type { RootState } from '../../../store';
import { clearCartAsync, removeFromCartAsync } from '../../../store/actions/usersActions';
import type { AppDispatch } from '../../../store/index';
import type { CartItem } from '../../../store/reducers/usersSlice';
import type { ProductType } from '../../types/Product-type';
import s from './Checkout.module.scss';

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
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();

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
        if (response.data) {
          alert('Заказ успешно оформлен');
          dispatch(clearCartAsync());
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка при оформлении заказа');
    }
  };

  const handleRemoveFromCart = (productId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeFromCartAsync(productId, navigate));
  };

  return (
    <div className={s.checkout}>
      <h1>Checkout</h1>
      <NavLink to='/catalog'>Продолжить покупки</NavLink>\
      <section className={s.section}>
        <h2>1. Товары в корзине</h2>
        {cart.length > 0 && products.length > 0 ? (
          products.map((product: ProductType) => {
            const cartItem = cart.find(item => String(item.product) === String(product._id));
            const quantity = cartItem?.quantity || 1;
            return (
              <div key={product._id} className={s.itemRow}>
                <img src={`http://localhost:8000/uploads/${product.image}`} alt={product.title} />
                <div className={s.itemInfo}>
                  <p>{product.title}</p>
                  <span>${product.price}</span>
                  <p>Кол-во: {quantity}</p>
                </div>
                <button onClick={handleRemoveFromCart(product._id)}>Удалить</button>
              </div>
            );
          })
        ) : (
          <p>Корзина пуста</p>
        )}
        {cart.length > 0 && <p>Итого: ${subtotal}</p>}
      </section>
      <section className={s.section}>
        <h2>2. Shipping & Billing Address</h2>
        <form className={s.formGrid}>
          <input
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleChange}
          />
          <input name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
          <input name='phone' placeholder='Phone' value={formData.phone} onChange={handleChange} />
          <input
            name='country'
            placeholder='Country'
            value={formData.country}
            onChange={handleChange}
          />
          <input name='city' placeholder='City' value={formData.city} onChange={handleChange} />
          <input
            name='address'
            placeholder='Address'
            value={formData.address}
            onChange={handleChange}
          />
          <input name='zip' placeholder='ZIP Code' value={formData.zip} onChange={handleChange} />
        </form>
      </section>
      <section className={s.section}>
        <h2>3. Shipping Method</h2>
        <label>
          <input
            type='radio'
            name='shipping'
            value='25'
            checked={shipping === 25}
            onChange={() => setShipping(25)}
          />{' '}
          Courier — $25.00
        </label>
        <label>
          <input type='radio' name='shipping' value='0' onChange={() => setShipping(0)} /> Store
          Pickup — Free
        </label>
        <label>
          <input type='radio' name='shipping' value='10' onChange={() => setShipping(10)} /> UPS —
          $10.00
        </label>
      </section>
      <section className={s.section}>
        <h2>4. Payment Method</h2>
        <label>
          <input
            type='radio'
            name='payment'
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />{' '}
          Credit Card
        </label>
        <label>
          <input
            type='radio'
            name='payment'
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
          />{' '}
          PayPal
        </label>
        <label>
          <input
            type='radio'
            name='payment'
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
          />{' '}
          Cash on Delivery
        </label>
      </section>
      <aside className={s.sidebar}>
        <h3>Order Summary</h3>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping: ${shipping.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <hr />
        <strong>Total: ${total.toFixed(2)}</strong>
        <button onClick={handleOrderSubmit} className={s.completeBtn}>
          Complete order
        </button>
      </aside>
    </div>
  );
};

export default CheckoutPage;
