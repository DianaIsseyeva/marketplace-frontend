import { NavLink } from 'react-router-dom';
import s from './Register.module.scss';

const RegisterPage = () => {
  return (
    <div>
      <p className={s.title}>Sign up</p>
      <p className={s.text}>
        Registration takes less than a minute but gives you full control over your orders.
      </p>
      <form>
        <div>
          <label className={s.label}>Full Name</label>
          <input
            className={s.input}
            type='text'
            // value={title}
            // onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className={s.label}>Email</label>
          <input
            className={s.input}
            type='text'
            // value={title}
            // onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className={s.label}>Password</label>
          <input
            className={s.input}
            type='text'
            // value={price}
            // onChange={e => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label className={s.label}>Confirm Password</label>
          <input className={s.input} type='text' />
        </div>

        <button className={s.saveButton} type='submit'>
          Sign up
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p>Already have an account?</p>
          <NavLink to='/login' className={s.link}>
            Sign in
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
