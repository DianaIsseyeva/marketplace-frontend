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
        // const endpointForRegistered = category
        //   ? `http://localhost:8000/products?category=${category}`
        //   : 'http://localhost:8000/products';
        const endpointForAll = category
          ? `http://localhost:8000/products/catalog?category=${category}`
          : 'http://localhost:8000/products/catalog';

        const response = await axios.get<ProductType[]>(endpointForAll);
        if (!user) {
          setProducts(response.data);
        } else {
          const productsWithFavorites = response.data.map(product => ({
            ...product,
            isFavorite: user.favorites.includes(product._id.toString()),
          }));
          setProducts(productsWithFavorites);
        }

        setProducts(response.data);
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
          />
        </div>
      ))}
    </div>
  );
};

export default CatalogPage;
