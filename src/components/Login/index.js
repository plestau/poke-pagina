import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import './login.css';

function Login() {
  const [emailRegistro, setEmailRegistro] = useState('');
  const [passwordRegistro, setPasswordRegistro] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const registrarse = () => {
    createUserWithEmailAndPassword(auth, emailRegistro, passwordRegistro)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Usuario registrado")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const iniciarSesion = () => {
    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Sesión iniciada")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const iniciarSesionFB = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(accessToken)

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const iniciarSesionGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        alert("Sesión iniciada con Google")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div id="loginDiv">
      <div id="registro">
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={emailRegistro}
          onChange={(event) => setEmailRegistro(event.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwordRegistro}
          onChange={(event) => setPasswordRegistro(event.target.value)}
        />
        <button id="registroBtn" onClick={registrarse}>Registrarse</button>
      </div>
      <div id="login">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={emailLogin}
          onChange={(event) => setEmailLogin(event.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwordLogin}
          onChange={(event) => setPasswordLogin(event.target.value)}
        />
        <button id="loginBtn" onClick={iniciarSesion}>Iniciar sesión</button>
      </div>
      <div id="loginGoogle">
      <h2>Login con Facebook/Google</h2>
        <button id="loginFacebookBtn" onClick={iniciarSesionGoogle}><i className="fa-brands fa-google"></i>Iniciar sesión con Google</button>
        <button id="loginFacebookBtn" onClick={iniciarSesionFB}><i className="fa-brands fa-facebook"></i>Iniciar sesión con Facebook</button>
      </div>
    </div>
  );
}

export default Login;
