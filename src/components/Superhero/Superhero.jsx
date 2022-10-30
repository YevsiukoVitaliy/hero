import PropTypes from 'prop-types';
import { useDeleteSuperheroMutation } from 'redux/slice';
import css from './Superhero.module.css';

export default function Superhero({ superhero }) {
  const [deleteSuperhero] = useDeleteSuperheroMutation();
  const deleteItem = async id => {
    await deleteSuperhero(id);
  };
  return (
    <li className={css.Superhero} id={superhero.id}>
      {superhero.name}: {superhero.number}
      <button
        onClick={() => {
          deleteItem(superhero.id);
        }}
        className={css.btnDelete}
        type="button"
      >
        Delete
      </button>
    </li>
  );
}

Superhero.propTypes = {
  superhero: PropTypes.object,
};
