
import { FilterInput } from "components/Form/Form.styled";
import { setFilter } from 'redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelector } from 'redux/selectors/filterSelector';


const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);
  const changeFilter = event => {
    dispatch(setFilter(event.target.value))
  };
  return (
      <FilterInput type="text" value={filter} onChange={changeFilter} />
  );
};


export { Filter };
