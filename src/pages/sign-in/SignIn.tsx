import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../../store';
import { loginUserAsync } from '../../../store/actions/usersActions';
import s from './SignIn.module.scss';

const SignInPage = () => {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('password');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (fullname && password) {
        const user = {
          username: fullname,
          password,
        };

        dispatch(loginUserAsync(user));
        navigate('/');
      } else {
        alert('Please fill in all fields');
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error(error);
    }
  };

  const inputTypeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };

  return (
    <div>
      <p className={s.title}>Sign in</p>
      <p className={s.text}>
        Sign in to your account using email and password provided during registration.
      </p>
      <form onSubmit={submitFormHandler}>
        <div>
          <label className={s.label}>Full Name</label>
          <input
            className={s.input}
            type='text'
            value={fullname}
            onChange={e => setFullname(e.target.value)}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <button className={s.eye} onClick={inputTypeHandler}>
            {inputType === 'password' ? (
              <img src='/closedEye.svg' alt='closedEye' style={{ width: '16px', height: '16px' }} />
            ) : (
              <img src='/Eyes.svg' alt='openedEye' style={{ width: '16px', height: '16px' }} />
            )}
          </button>
          <label className={s.label}>Password</label>
          <input
            className={s.input}
            type={inputType}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className={s.saveButton} type='submit'>
          Sign in
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p>Don't have an account?</p>
          <NavLink to='/login' className={s.link}>
            Sign up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
