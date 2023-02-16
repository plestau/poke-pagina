import './App.css';
import Navigation from './components/navegation/navegation';
import Footer from './components/footer';
import Pokedex from './components/pokedex/pokedex';
import Juego from './components/juego/juego';
import Juego2 from './components/juego2';
import DetallesPokemon from './components/DetallesPokemon';
import ListaPokemon from './components/ListaPokemon';
import Home from './components/Home';
import Login from './components/Login';
import Buscador from './components/navegation/buscador';
import Error404 from './components/Error404';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


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
        <Route path="/juego2" element={<Juego2 />} />
        <Route path="/listaPokemon" element={<ListaPokemon />} />
        <Route path="/pokemon/:id" element={<DetallesPokemon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route component={Error404} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
