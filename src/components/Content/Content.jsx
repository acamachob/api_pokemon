import './content.css';

function Content({ pokemones }) {
  return (
    <ul className="pokemon-list">
      {pokemones.map((pokemon, index) => (
        <li key={index} className="pokemon-item">
          <strong>Nombre:</strong> {pokemon.name} <br />
          <strong>URL:</strong>{' '}
          <a href={pokemon.url} target="_blank" rel="noopener noreferrer">
            {pokemon.url}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Content;
