import { Link } from "react-router-dom";
import "./navegation.css";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebaseConfig";
import PokemonSearch from "./buscador";

function Navigation() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const login = document.getElementById("loginNav");
        login.style.display = "none";
        const cerrarSesion = document.createElement("a");
        cerrarSesion.className = "link";
        cerrarSesion.id = "cerrarSesion";
        cerrarSesion.href = "#";
        cerrarSesion.innerText = "Cerrar Sesión";
        cerrarSesion.addEventListener("click", () => {
          auth.signOut();
          alert("Sesión cerrada")
        });
        const navegation = document.querySelector(".navegation");
        navegation.appendChild(cerrarSesion);
        const bienvenida = document.createElement("p");
        bienvenida.id = "bienvenida";
        bienvenida.innerText = `Bienvenid@ ${user.email}`;
        navegation.appendChild(bienvenida);
      } else {
        const login = document.getElementById("loginNav");
        login.style.display = "block";
        const cerrarSesion = document.getElementById("cerrarSesion");
        if (cerrarSesion) {
          cerrarSesion.remove();
          const bienvenida = document.getElementById("bienvenida");
          bienvenida.remove();
        }
      }
    });
  }, []);
  
  function handlePokemonSelect(pokemonName) {
    console.log(`Selected pokemon: ${pokemonName}`);
  }

  return (
    <div className="navegation">
      <Link to="/" className="link">Inicio</Link>
      <Link to="/listaPokemon" className="link">Lista de Pokemon</Link>
      <Link to="/juego" className="link">Juego nombre</Link>
      <Link to="/juego2" className="link">Juego tipos</Link>
      <Link id="loginNav" to="/login" className="link">Login</Link>
      <div id="buscador">
      <PokemonSearch onSelect={handlePokemonSelect} />
      </div>
    </div>
  );
}

export default Navigation;
