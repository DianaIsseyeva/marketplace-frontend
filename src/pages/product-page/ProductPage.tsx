import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from '../../types/Product-type';
import s from './Product.module.scss';

const ProductPage = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState<ProductType>({
    _id: 0,
    title: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    rating: 0,
  });

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${id}`);
        let cardImage = '/clothes.png';
        const apiURL = 'http://localhost:8000';
        if (response.data.image) {
          cardImage = apiURL + '/uploads/' + response.data.image;
          response.data.image = cardImage;
        }
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductById();
  }, [id]);

  return (
    <div className='container'>
      <p>{product.title}</p>
      <div className={s.card}>
        <div>
          <img src={product.image}></img>
        </div>

        <div>
          <p>{product.price}</p>
          <p>{product.rating}</p>

          <button>1</button>
          <button>add to card</button>
          <button>favorite</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
