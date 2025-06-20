import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../store';
import { handleAddToCartAsync, toggleFavoriteAsync } from '../../../store/actions/usersActions';
import Rating from '../../rating/Rating';
import type { ProductType } from '../../types/Product-type';
import s from './Product.module.scss';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>({
    _id: '',
    title: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    rating: 0,
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isFavorite = useSelector((state: RootState) =>
    state.users.user?.favorites.includes(product._id)
  );
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

  useEffect(() => {
    getProductById();
  }, [id]);

  const handleToggleFavorite = async () => {
    dispatch(toggleFavoriteAsync(product._id, navigate));
  };

  const handleAddToCart = async () => {
    const qtyInput = document.querySelector('input[type="number"]') as HTMLInputElement | null;
    const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
    console.log(quantity);
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(handleAddToCartAsync(product._id, quantity, navigate));
    } else {
      alert('Введите корректное количество');
    }
  };

  return (
    <div className='container'>
      <p className={s.title}>{product.title}</p>
      <div className={s.card}>
        <div>
          <img src={product.image} alt='image'></img>
        </div>

        <div style={{ position: 'relative' }}>
          <p className={s.price}>$ {product.price}</p>
          <Rating rating={product.rating} />
          <p>
            <b>Описание:</b> {product.description}
          </p>
          <div className={s.btnWrap}>
            <input type='number' defaultValue={1} className={s.qty} min={1} />
            <button className={s.btnCard} onClick={handleAddToCart}>
              <img src='/white-cart-icon.png' style={{ width: '15px', marginRight: '10px' }} />
              add to card
            </button>
            <button
              className={`${s.btnFavorite} ${isFavorite ? s.active : ''}`}
              onClick={handleToggleFavorite}
            >
              {!isFavorite ? (
                <img src='/heart-icon.png' style={{ width: '15px', marginRight: '10px' }} />
              ) : (
                <img src='/Heart_filled.svg' style={{ width: '15px', marginRight: '10px' }} />
              )}
              favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
