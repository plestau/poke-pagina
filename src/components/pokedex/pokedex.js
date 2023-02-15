import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pokedex.css';
import PokeList from './PokeList';
import VistaDetalles from '../vistaDetalles';
import Pokemon from '../Pokemon';

class Pokedex extends Component {
    constructor() {
        super()
        this.state = {
            pokemon: {}
        }
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    handleOnClick(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            .then(data => {
                const pokemon = new Pokemon(data)
                this.setState({ pokemon })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <>
                <div id="vistaLista">
                    <Link to="/listaPokemon" id="irPokedex" className="link">Vista Lista</Link>
                </div>
                <div className="pokedex">
                    <PokeList handleOnClick={this.handleOnClick} />
                    <VistaDetalles pokemon={this.state.pokemon} />
                </div>
            </>
        )
    }
}


export default Pokedex;