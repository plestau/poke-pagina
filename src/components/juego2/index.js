import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { addDoc, getDocs, collection } from 'firebase/firestore';
import './juego2.css';

function Juego2() {
  const [pokemon, setPokemon] = useState(null);
  const [types, setTypes] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [vidas, setVidas] = useState(3);
  const [puntuacion, setPuntuacion] = useState(0);
  const [contador, setContador] = useState([]);

  useEffect(() => {
    fetchPokemon();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        // se muestra un div puntuaciones de que debe iniciar sesión para guardar la puntuación en el div puntuaciones
        const p = document.createElement('p');
        p.textContent = 'Debes iniciar sesión para guardar tu puntuación';
        const errorSesion = document.getElementById('errorSesion2');
        errorSesion.appendChild(p);
      }
    });
    verGanadores();
  }, []);

  const verGanadores = async () => {
    await getDocs(collection(db, "puntuaciones_tipos"))
      .then((querySnapshot) => {
        const listado = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        listado.sort((a, b) => b.puntuacion - a.puntuacion);
        listado.splice(5);
        setContador(listado);
      })
  }

  const escribePuntuacion = async () => {
    try {
      const docRef = await addDoc(collection(db, "puntuaciones_tipos"), {
        puntuacion: puntuacion,
        cuenta: auth.currentUser.email,
      });
      console.log("Document written with ID: ", docRef.id);
      verGanadores();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const fetchPokemon = () => {
    setAnswer(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898) + 1}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
        setTypes(data.types.map(type => type.type.name));
      })
      .catch(err => console.log(err));
  }

  const handleAnswer = (type) => {
    if (type === pokemon.types[0].type.name) {
      setAnswer('correct');
      setPuntuacion(puntuacion + 1);
    } else {
      setAnswer('incorrect');
      setVidas(vidas - 1);
      if (vidas === 0) {
        escribePuntuacion();
        const juegoTipos = document.getElementById('juego_tipos');
        juegoTipos.style.display = 'none';
      }
    }
    setTimeout(() => {
      fetchPokemon();
    }, 1000);
  }

  const renderAnswers = () => {
    const answerOptions = shuffleArray([...types, ...getWrongAnswers(pokemon.types[0].type.name)]);
    return answerOptions.map((type, index) => (
      <button key={type + index} onClick={() => handleAnswer(type)}>{type}</button>
    ));
  }

  const getWrongAnswers = (correctAnswer) => {
    const allTypes = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
    const wrongAnswers = allTypes.filter(type => type !== correctAnswer);
    return [wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)], wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)]];
  }

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  return (
    <div>
      <div id="juego2">
        <div id="juego_tipos">
        {pokemon ?
          <div>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="pokemon" style={{ filter: 'grayscale(100%)' }} />
            <div>
              {renderAnswers()}
            </div>
            {answer &&
              <div>
                {answer === 'correct' ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
              </div>
            }
            <div>
              Vidas: {vidas} / Puntuación: {puntuacion}
            </div>
          </div>
          :
          <div>Cargando...</div>
        }
        </div>
        <div id="resultados2">
          <div id="puntuaciones2">
            <ul>
              <h2 id="mejores">Mejores puntuaciones</h2>
              {contador.map((item) => (
                <li key={item.id}>
                  <p>{item.cuenta}: {item.puntuacion}</p>
                </li>
              ))}
            </ul>
          </div>
          <div id="errorSesion2"></div>
        </div>
      </div>

    </div>
  );
}

export default Juego2;
