import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './buscador.css';

function PokemonSearch() {
  const [searchText, setSearchText] = useState('');
  const [pokemonResults, setPokemonResults] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);

    if (inputValue.length >= 2) {
        // hace un fetch a la pokeapi cargando todos los pokemon y buscar si el valor del input se parece a alguno
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1118')
        .then(response => response.json())
        .then((datosAPI) => {
            const results = datosAPI.results.filter((pokemon) => pokemon.name.includes(inputValue));
            setPokemonResults(results);
        });
    } else {
      setPokemonResults([]);
    }
  };

  return (
    <div id="#buscador">
      <input type="text" value={searchText} onChange={handleInputChange} placeholder="Buscar Pokemon" />
      <ul>
        {pokemonResults.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`}>
                <li key={pokemon.name}>{pokemon.name}</li>
            </Link>
        ))}
      </ul>
    </div>
  );
}

export default PokemonSearch;
