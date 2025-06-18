import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosApi from '../../../axiosApi';
import type { RootState } from '../../../store';
import Card from '../../card/Card';
import type { ProductType } from '../../types/Product-type';

const FavoritePage = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const [products, setProducts] = useState<ProductType[]>([]);
  const favorites = useSelector((state: RootState) => state.users.user?.favorites || []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user || favorites.length === 0) return;

        const response = await axiosApi.post('/products/by-ids', {
          ids: favorites,
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Ошибка при получении избранных:', error);
      }
    };

    fetchFavorites();
  }, [favorites, user]);

  return (
    <div style={{ maxWidth: '285px' }}>
      {favorites.length > 0 ? (
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
        <p>У вас пока нет избранных товаров</p>
      )}
    </div>
  );
};

export default FavoritePage;
