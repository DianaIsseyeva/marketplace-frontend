import s from './Rating.module.scss';
import starFilled from '../../public/Star_filled.svg';
import starEmpty from '../../public/Star_outline.svg';

interface RatingProps {
  rating: number;
  max?: number;
}

const Rating = ({ rating, max = 5 }: RatingProps) => {
  return (
    <div className={s.starWrap}>
      {Array.from({ length: max }, (_, i) => (
        <img key={i} src={i < rating ? starFilled : starEmpty} alt='star' />
      ))}
    </div>
  );
};

export default Rating;
