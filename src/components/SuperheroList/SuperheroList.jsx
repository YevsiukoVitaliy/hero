import Superhero from 'components/Superhero/Superhero';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useGetSuperheroQuery } from 'redux/slice';
export const SuperheroList = () => {
  const { data = [], isLoading } = useGetSuperheroQuery();
  const filter = useSelector(state => state.filter);
  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      <ul>
        {data
          .filter(superhero =>
            superhero.name
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          )
          .map(superhero => (
            <Superhero superhero={superhero} key={superhero.id} />
          ))}
      </ul>
    </>
  );
};

SuperheroList.propTypes = {
  superhero: PropTypes.array,
  filter: PropTypes.string,
};
