import { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { RootState } from '../../store';
import s from './Header.module.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.users.user);
  return (
    <div>
      <div className={s.headerLine}></div>
      <header className='container'>
        <nav className={s.nav}>
          <div className={s.navLinks}>
            <NavLink to='/'>
              <img src='/logo-icon.png' alt='logo' />
            </NavLink>
            <NavLink
              to='/catalog/women'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Женщины
            </NavLink>
            <NavLink
              to='/catalog/men'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Мужчины
            </NavLink>
            <NavLink
              to='/catalog/kids'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Дети
            </NavLink>
          </div>

          <div className={s.navLinks}>
            <NavLink to='/register'>
              <img src='/profile-icon.png' alt='profile icon' />
            </NavLink>
            <NavLink to='/favorites' className={s.link}>
              <img src='/heart-icon.png' alt='heart icon' />
              {user?.favorites.length}
            </NavLink>
            <NavLink to='/cart' className={s.link}>
              <img src='/cart-icon.png' alt='cart icon' />
              {user?.cart.length}
            </NavLink>
          </div>
        </nav>

        <div className={s['burger-menu']}>
          <NavLink to='/'>
            <img src='/logo-icon.png' alt='logo' />
          </NavLink>
          <button onClick={() => setIsModalOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} style={customStyles} contentLabel='Example Modal'>
          <button onClick={() => setIsModalOpen(false)} className={s.closeIcon}>
            X
          </button>
          <div className={s.modalLinks}>
            <NavLink
              to='/catalog/women'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Женщины
            </NavLink>
            <NavLink
              to='/catalog/men'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Мужчины
            </NavLink>
            <NavLink
              to='/catalog/kids'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Дети
            </NavLink>
            <NavLink to='/register'>
              <img src='/profile-icon.png' alt='profile icon' />
            </NavLink>
            <NavLink to='/favorites' className={s.link}>
              <img src='/heart-icon.png' alt='heart icon' />
              {user?.favorites.length}
            </NavLink>
            <NavLink to='/cart' className={s.link}>
              <img src='/cart-icon.png' alt='cart icon' />
              {user?.cart.length}
            </NavLink>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Header;
