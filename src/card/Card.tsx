import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import { removeFromCartAsync, toggleFavoriteAsync } from '../../store/actions/usersActions';
import Rating from '../rating/Rating';
import type { ProductType } from '../types/Product-type';
import s from './Card.module.scss';
import heartFilled from '/Heart_filled.svg';
import bin from '/bin.svg';
import heartEmpty from '/heart-icon.png';

type CardProps = Omit<ProductType, 'category'> & {
  quantity?: number;
};

const Card: FC<CardProps> = ({ _id, rating, title, price, image, quantity }) => {
  let cardImage = '/clothes.png';
  const apiURL = 'http://localhost:8000';
  const location = useLocation();

  if (image) {
    cardImage = apiURL + '/uploads/' + image;
  }

  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = useSelector((state: RootState) => state.users.user?.favorites.includes(_id));
  const navigate = useNavigate();

  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleFavoriteAsync(_id, navigate));
  };

  const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(_id);
    dispatch(removeFromCartAsync(_id, navigate));
  };
  return (
    <NavLink className={s.cardWrap} to={`/catalog/product/${_id}`}>
      <Rating rating={rating} />
      <img src={cardImage} alt='clothes' />
      <button className={s.heart} onClick={addToFavorite}>
        <img src={isFavorite ? heartFilled : heartEmpty} alt='heart' />
      </button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '16px 0 8px',
        }}
      >
        <p className={s.title}>{title}</p>
        {location.pathname.includes('cart') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 500 }}>x{quantity}</span>
            <button className={s.binBtn} onClick={handleRemoveFromCart}>
              <img src={bin} alt='bin' />
            </button>
          </div>
        )}
      </div>
      <p className={s.price}>${price}</p>
    </NavLink>
  );
};

export default Card;
