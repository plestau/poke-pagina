import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TarjetaPokemon from './Tarjetapokemon';
import './Tarjetapokemon/listaPokemon.css';

const ListaPokemon = () => {
  const [listaPokemons, setListaPokemons] = useState([]);
  const [urlPokeAPI, setUrlPokeAPI] = useState('https://pokeapi.co/api/v2/pokemon?limit=8');

  useEffect(() => { cargaTodos(); }, []);

  function cargaTodos() {
    fetch(urlPokeAPI)
      .then(response => response.json())
      .then((datosAPI) => {
        setListaPokemons(listaPokemons.concat(datosAPI.results))
        setUrlPokeAPI(datosAPI.next)
      });
  }

  function cargarMas() {
    cargaTodos();
  }

  return (
    <>
      <Link to="/pokedex" id="irPokedex" className="link">Vista Pokedex</Link>
      <div className="listaPokemon">
        {listaPokemons.map((pokemon, index) => (
          <TarjetaPokemon key={index} pokemon={pokemon} />
        ))}
      </div>
      <div className="cargarMas">
        <button id="cargar" onClick={cargarMas}>Cargar más</button>
      </div>
    </>
  );
};

export default ListaPokemon;
