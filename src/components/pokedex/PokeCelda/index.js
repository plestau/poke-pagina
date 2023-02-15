import React from 'react'
import './PokeCelda.css'

const PokeCelda = ({ pokeClass, handleOnClick }) => {
    return (
        <button onClick={() => handleOnClick(pokeClass + 1)} className='poke-celda'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeClass + 1}.png`} alt="pokemon" />
        </button>
    )
}

export default PokeCelda