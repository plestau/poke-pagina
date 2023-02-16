import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import './juego.css';
import { auth, db } from '../../firebaseConfig';

const Juego = () => {
  const [pokemon, setPokemon] = useState({});
  const [nombreIngresado, setNombreIngresado] = useState('');
  const [resultado, setResultado] = useState('');
  const [vidas, setVidas] = useState(3);
  const [contador, setContador] = useState(0);
  const [puntuacion, setPuntuacion] = useState([]);

  useEffect(() => {
    empiezaJuego();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        // se muestra un div puntuaciones de que debe iniciar sesión para guardar la puntuación en el div puntuaciones
        const p = document.createElement('p');
        p.textContent = 'Debes iniciar sesión para guardar tu puntuación';
        const errorSesion = document.getElementById('errorSesion');
        errorSesion.appendChild(p);
      }
    });
    verGanadores();
  }, []);

  const handleChange = (event) => {
    setNombreIngresado(event.target.value);
  };

  const verGanadores = async () => {
    await getDocs(collection(db, "puntuaciones"))
    .then((querySnapshot) => {
      const listado = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
        listado.sort((a, b) => b.puntuacion - a.puntuacion);
        listado.splice(5);
      setPuntuacion(listado);
    })
  }

  const escribePuntuacion = async () => {
    try {
      const docRef = await addDoc(collection(db, "puntuaciones"), {
        puntuacion: contador,
        cuenta: auth.currentUser.email,
      });
      console.log("Document written with ID: ", docRef.id);
      verGanadores();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nombreIngresado.toLowerCase() === pokemon.nombre) {
      setResultado('¡Correcto!');
      document.getElementById('resultado').style.backgroundColor = 'green';
      setContador(contador + 1);
      setNombreIngresado('');
      empiezaJuego();
    } else {
      setResultado('Incorrecto');
      document.getElementById('resultado').style.backgroundColor = 'red';
      setVidas(vidas - 1);
      setNombreIngresado('');
      if (vidas === 0) {
        // oculta el div juego
        document.getElementById('juego').style.display = 'none';
        setResultado('Perdiste');
        escribePuntuacion();
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
    <img className='pokemon-img' src={pokemon.imagen} />
    <form id="respuesta" onSubmit={handleSubmit}>
      <input type="text" value={nombreIngresado} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
    <p id="resultado">{resultado}</p>
  </div>
  <div id="puntuaciones">
    <h1>Máximas puntuaciones</h1>
    <ul id="ganadores">
      {puntuacion.map((punt) => (
        <li key={punt.id}>
          <p>{punt.cuenta}: {punt.puntuacion} pts</p>
        </li>
      ))}
    </ul>
  </div>
  <div id="errorSesion"></div>
</div>

  );
};

export default Juego;
