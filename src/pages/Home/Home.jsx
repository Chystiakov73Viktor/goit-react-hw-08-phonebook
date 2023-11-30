import { useSelector } from 'react-redux';
import phonebook from '../../images/addphone.jpg';
import css from './Home.module.css';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';

function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <h1 className={css.title}>Let's go phonebook!</h1>
      ) : (
        <h1 className={css.title}>Please log in to your contacts!</h1>
      )}
      <img className={css.img} src={phonebook} alt="phonebook" />
    </div>
  );
}

export default Home;
