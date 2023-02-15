import { Link } from "react-router-dom";
import "./navegation.css";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebaseConfig";

function Navigation() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // esconde iniciar sesion
        const login = document.getElementById("loginNav");
        login.style.display = "none";
        // crea cerrar sesion
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
      } else {
        // muestra iniciar sesion
        const login = document.getElementById("loginNav");
        login.style.display = "block";
        // elimina cerrar sesion
        const cerrarSesion = document.getElementById("cerrarSesion");
        if (cerrarSesion) {
          cerrarSesion.remove();
        }
      }
    });
  }, []);
  return (
    <>
    <div className="navegation">
      <Link to="/" className="link">Inicio</Link>
      <Link to="/listaPokemon" className="link">Lista de Pokemon</Link>
      <Link to="/juego" className="link">Juego</Link>
      <Link id="loginNav" to="/login" className="link">Login</Link>
    </div>
    </>
  );
}

export default Navigation;
