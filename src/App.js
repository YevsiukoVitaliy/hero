import SuperheroForm from 'components/SuperheroForm/SuperheroForm';
import { Filter } from 'components/Filter/Filter';
import { SuperheroList } from './components/SuperheroList/SuperheroList';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import {
  filterValue,
  useGetSuperheroQuery,
  useAddSuperheroMutation,
} from './redux/slice';
import css from './App.module.css';

export default function App() {
  const [addSuperhero] = useAddSuperheroMutation();
  const { data = [] } = useGetSuperheroQuery();
  const dispatch = useDispatch();

  const handleFilterTextChange = filterText => {
    dispatch(filterValue(filterText.target.value));
  };

  const handleSubmit = async (name, number) => {
    if (
      data.find(
        Superhero =>
          Superhero.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      return alert(`dssd`);
    }
    await addSuperhero({ id: nanoid(), name: name, number: number });
  };

  return (
    <>
      <div className={css.App}>
        <h1>Superhero Creation Lab</h1>
        <SuperheroForm onHandleSubmit={handleSubmit} />
        <h2>Superhero</h2>
        <Filter handleFilterTextChange={handleFilterTextChange} />
        <SuperheroList />
      </div>
    </>
  );
}
