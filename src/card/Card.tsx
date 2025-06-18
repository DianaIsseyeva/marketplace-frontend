import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import { toggleFavoriteAsync } from '../../store/actions/usersActions';
import Rating from '../rating/Rating';
import type { ProductType } from '../types/Product-type';
import s from './Card.module.scss';
import heartFilled from '/Heart_filled.svg';
import bin from '/bin.svg';
import heartEmpty from '/heart-icon.png';

const Card: FC<Omit<ProductType, 'category'>> = ({ _id, rating, title, price, image }) => {
  let cardImage = '/clothes.png';
  const apiURL = 'http://localhost:8000';
  const location = useLocation();

  if (image) {
    cardImage = apiURL + '/uploads/' + image;
  }

  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = useSelector((state: RootState) => state.users.user?.favorites.includes(_id));

  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleFavoriteAsync(_id));
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
          <button className={s.binBtn}>
            <img src={bin} alt='bin' />
          </button>
        )}
      </div>
      <p className={s.price}>${price}</p>
    </NavLink>
  );
};

export default Card;
