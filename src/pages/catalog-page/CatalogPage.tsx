import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../card/Card';
import type { ProductType } from '../../types/Product-type';
import s from './Catalog.module.scss';

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { category } = useParams<{ category?: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = category
          ? `http://localhost:8000/products?category=${category}`
          : 'http://localhost:8000/products';
        const response = await axios.get<ProductType[]>(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [category]);

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
