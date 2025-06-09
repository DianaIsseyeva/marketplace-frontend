import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import heartFilled from '../../public/Heart_filled.svg';
import heartEmpty from '../../public/heart-icon.png';
import Rating from '../rating/Rating';
import type { ProductType } from '../types/Product-type';
import s from './Card.module.scss';

const Card: FC<Omit<ProductType, 'category'>> = ({
  _id,
  rating,
  title,
  price,
  isFavorite,
  image,
}) => {
  let cardImage = '/clothes.png';
  const apiURL = 'http://localhost:8000';
  if (image) {
    cardImage = apiURL + '/uploads/' + image;
  }

  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <NavLink className={s.cardWrap} to={`/catalog/product/${_id}`}>
      <Rating rating={rating} />
      <img src={cardImage} alt='clothes' />
      <button className={s.heart} onClick={addToFavorite}>
        <img src={isFavorite ? heartFilled : heartEmpty} alt='heart' />
      </button>
      <p className={s.title}>{title}</p>
      <p className={s.price}>${price}</p>
    </NavLink>
  );
};

export default Card;
