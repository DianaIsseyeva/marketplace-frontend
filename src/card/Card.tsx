import type { FC } from 'react';
import heartFilled from '../../public/Heart_filled.svg';
import heartEmpty from '../../public/heart-icon.png';
import Rating from '../rating/Rating';
import s from './Card.module.scss';

interface CardProps {
  rating: number;
  title: string;
  price: number;
  isFavorite: boolean;
}
const Card: FC<CardProps> = ({ rating, title, price, isFavorite }) => {
  return (
    <div className={s.cardWrap}>
      <Rating rating={rating} />
      <img src='/clothes.png' alt='clothes' />
      <button className={s.heart}>
        <img src={isFavorite ? heartFilled : heartEmpty} alt='heart' />
      </button>
      <p>{title}</p>
      <p>{price}</p>
    </div>
  );
};

export default Card;
