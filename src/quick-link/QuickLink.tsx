import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import s from './QuickLink.module.scss';

interface QuickLinkProps {
  link: string;
  imgSrc: string;
  title: string;
}

const QuickLink: FC<QuickLinkProps> = ({ link, imgSrc, title }) => {
  return (
    <NavLink to={link}>
      <img src={imgSrc} alt='image' />
      <p className={s.title}>{title}</p>
    </NavLink>
  );
};

export default QuickLink;
