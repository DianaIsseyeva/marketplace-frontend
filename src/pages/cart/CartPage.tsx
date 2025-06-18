import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { CartItem } from '../../../store/reducers/usersSlice';
import Card from '../../card/Card';

const CartPage = () => {
  const user = useSelector((state: RootState) => state.users.user);

  return (
    <div style={{ maxWidth: '285px' }}>
      {user?.cart.map((product: CartItem) => (
        <div key={product._id}>
          <Card
            _id={product.product._id}
            title={product.product.title}
            price={product.product.price}
            image={product.product.image}
            rating={product.product.rating}
          />
        </div>
      ))}
    </div>
  );
};

export default CartPage;
