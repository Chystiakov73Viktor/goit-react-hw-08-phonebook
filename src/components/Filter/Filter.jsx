import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredValue } from 'redux/filter/filterSelectors';
import { setFilteredContacts } from 'redux/filter/filterReducer';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterContacts = useSelector(selectFilteredValue);

  return (
    <div className={css.container}>
      <label>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={filterContacts}
          onChange={evt =>
            dispatch(setFilteredContacts(evt.currentTarget.value))
          }
        />
      </label>
    </div>
  );
};
