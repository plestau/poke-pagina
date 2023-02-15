import './App.css';
import Navigation from './components/navegation/navegation';
import Pokedex from './components/pokedex/pokedex';
import Juego from './components/juego/juego';
import DetallesPokemon from './components/DetallesPokemon';
import ListaPokemon from './components/ListaPokemon';
import ListaDatos from './components/ListaDatos/index.js';
import Home from './components/Home';
import Login from './components/Login';
import Error404 from './components/Error404';

import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/listaDatos" element={<ListaDatos />} />
        <Route path="/listaPokemon" element={<ListaPokemon />} />
        <Route path="/pokemon/:id" element={<DetallesPokemon />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
