import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/auth/authOperations';
import { selectIsLoggedIn, selectUser } from 'redux/auth/authSelectors';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      {isLoggedIn && (
        <div className={css.contaner}>
          <h2 className={css.title}>{name.name}</h2>
          <button className={css.button} type="button" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      )}
    </>
  );
};
