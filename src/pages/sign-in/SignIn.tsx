import { NavLink } from 'react-router-dom';
import s from './SignIn.module.scss';

const SignInPage = () => {
  return (
    <div>
      <p className={s.title}>Sign in</p>
      <p className={s.text}>
        Sign in to your account using email and password provided during registration.
      </p>
      <form>
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

        <button className={s.saveButton} type='submit'>
          Sign in
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p>Don't have an account?</p>
          <NavLink to='/register' className={s.link}>
            Sign up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
