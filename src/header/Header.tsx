import { useState } from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
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
              to='/women'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Женщины
            </NavLink>
            <NavLink
              to='/men'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Мужчины
            </NavLink>
          </div>

          <div className={s.navLinks}>
            <NavLink to='/favorites'>
              <img src='/profile-icon.png' alt='profile icon' />
            </NavLink>
            <NavLink to='/profile'>
              <img src='/heart-icon.png' alt='heart icon' />
            </NavLink>
            <NavLink to='/cart'>
              <img src='/cart-icon.png' alt='cart icon' />
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
              to='/women'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Женщины
            </NavLink>
            <NavLink
              to='/men'
              // className={({ isActive }) => (isActive ? `${s.active} ${s.link}` : `${s.link}`)}
            >
              Мужчины
            </NavLink>
            <NavLink to='/favorites'>
              <img src='/profile-icon.png' alt='profile icon' />
            </NavLink>
            <NavLink to='/profile'>
              <img src='/heart-icon.png' alt='heart icon' />
            </NavLink>
            <NavLink to='/cart'>
              <img src='/cart-icon.png' alt='cart icon' />
            </NavLink>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Header;
