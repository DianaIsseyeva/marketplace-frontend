import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { ProductType } from '../../types/Product-type';

interface Seller {
  _id: string;
  username: string;
  email: string;
  products: ProductType[];
}

const AdminPage = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    const fetchSellers = async () => {
      if (!user?.token) return;
      try {
        const response = await axios.get('/admin/sellers', {
          headers: { Authorization: user.token },
        });
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };
    fetchSellers();
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Продавцы и их товары</h2>
      {sellers.map(seller => (
        <div key={seller._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <h3>
            {seller.username} ({seller.email})
          </h3>
          <ul>
            {seller.products.map(product => (
              <li key={product._id}>
                {product.title} — ${product.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
