import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../../store';
import Card from '../../card/Card';
import type { ProductType } from '../../types/Product-type';
import s from './Catalog.module.scss';

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { category } = useParams<{ category?: string }>();
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpointForRegistered = category
          ? `http://localhost:8000/products?category=${category}`
          : 'http://localhost:8000/products';
        const endpointForAll = category
          ? `http://localhost:8000/products/catalog?category=${category}`
          : 'http://localhost:8000/products/catalog';

        if (!user) {
          const response = await axios.get<ProductType[]>(endpointForAll);
          setProducts(response.data);
        } else if (user?.token) {
          const response = await axios.get<ProductType[]>(endpointForRegistered, {
            headers: { Authorization: user?.token },
          });
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [category, user]);

  return (
    <div className={s.productWrap}>
      {products.map((product: ProductType) => (
        <div key={product._id}>
          <Card
            _id={product._id}
            description={product.description}
            title={product.title}
            price={product.price}
            image={product.image}
            rating={product.rating}
            isFavorite={product.isFavorite}
          />
        </div>
      ))}
    </div>
  );
};

export default CatalogPage;
