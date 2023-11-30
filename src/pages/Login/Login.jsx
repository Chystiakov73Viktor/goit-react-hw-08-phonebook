import * as React from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';
import { useForm } from 'react-hook-form';
import css from './Login.module.css';

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(logIn(data));
    reset();
  };

  return (
    <form className={css.formContact} onSubmit={handleSubmit(onSubmit)}>
      <label className={css.label}>Email</label>
      <input
        className={css.input}
        type="email"
        placeholder="Enter your email"
        autoComplete="off"
        {...register('email')}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <label className={css.label}>Password</label>
      <input
        className={css.input}
        type="password"
        placeholder="Enter your password"
        autoComplete="off"
        {...register('password')}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button
        className={css.buttonContact}
        type="submit"
        onClick={() => {
          const inputs = [
            {
              type: 'manual',
              name: 'email',
              message: 'Double Check This',
            },
            {
              type: 'manual',
              name: 'password',
              message: 'Triple Check This',
            },
          ];

          inputs.forEach(({ name, type, message }) =>
            setError(name, { type, message })
          );
        }}
      >
        Log in
      </button>
    </form>
  );
};

export default Login;
