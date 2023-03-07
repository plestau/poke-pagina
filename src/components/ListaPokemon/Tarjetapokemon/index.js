import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './listaPokemon.css';

const TarjetaPokemon = (pokemon) => {
    const [listaPokemons, setListaPokemons] = useState([]);
    const [urlPokeAPI, setUrlPokeAPI] = useState('https://pokeapi.co/api/v2/pokemon/' + pokemon.id);
    const [tipoActual, setTipoActual] = useState(null);    

    useEffect(() => { cargaPokemon(); }, []);

    useEffect(() => {
        if (listaPokemons.length > 0) {
          setTipoActual(listaPokemons[0].types[0].type.name);
        }
      }, [listaPokemons]);

    function cargaPokemon() {
        fetch(pokemon.pokemon.url)
            .then(response => response.json())
            .then((datosAPI) => {
                setListaPokemons(listaPokemons.concat(datosAPI))
                setUrlPokeAPI(datosAPI.next)
            }
            );
    }

    return (
        <>
            {listaPokemons.map((pokemon, index) => (
                <div className={`pokemon ${tipoActual ? tipoActual : ''}`} key={index}>
                    <Link to={`/pokemon/${pokemon.id}`}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <h2 className='nombre'>{pokemon.name}</h2>
                        {pokemon.types.map((tipo, index) => (
                            <p className='tipo' key={index}>{tipo.type.name}</p>
                        ))}

                    </Link>
                </div>
            ))}
        </>

    );
};

export default TarjetaPokemon;
