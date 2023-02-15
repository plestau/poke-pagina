import React, { useState, useEffect } from 'react';
import './juego.css';

const Juego = () => {
  const [pokemon, setPokemon] = useState({});
  const [nombreIngresado, setNombreIngresado] = useState('');
  const [resultado, setResultado] = useState('');
  const [vidas, setVidas] = useState(3);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    empiezaJuego();
  }, []);

  const handleChange = (event) => {
    setNombreIngresado(event.target.value);
  };

  function empiezaJuego() {
    const getRandomPokemon = async () => {
      const randomId = Math.floor(Math.random() * 150) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      setPokemon({
        nombre: data.name,
        imagen: data.sprites.front_default,
      });
    };
    getRandomPokemon();
  }

  function verGanadores() {
    // Llamar a la API
    // Mostrar los ganadores
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nombreIngresado.toLowerCase() === pokemon.nombre) {
      setResultado('¡Correcto!');
      setContador(contador + 1);
      setNombreIngresado('');
      empiezaJuego();
    } else {
      setResultado('Incorrecto');
      setVidas(vidas - 1);
      setNombreIngresado('');
      if (vidas === 0) {
        // Acaba la partida
        setResultado('Perdiste');
        // guarda la puntación en la firestore
        // muestra la puntuación y oculta el juego
      }
      empiezaJuego();
      verGanadores();
    }
  };

  return (
    <div id="adivina">
      <div id="juego">
        <h1>Adivina el Pokémon</h1>
        <p>Puntuación: {contador}</p>
        <p>Vidas: {vidas}</p>
        <img className='pokemon-img' src={pokemon.imagen} alt={pokemon.nombre} />
        <form id="respuesta" onSubmit={handleSubmit}>
          <input type="text" value={nombreIngresado} onChange={handleChange} />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <p id="resultado">{resultado}</p>
      <div id="puntuaciones">
        <h1>Puntuaciones</h1>
      </div>
    </div>

  );
};

export default Juego;
