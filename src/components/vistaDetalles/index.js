import React from 'react'
import './vistaDetalles.css'

const VistaDetalles = ({pokemon}) => {
    const {nombre, tipo, altura, peso, sprite} = pokemon
    return(
        <section className='vista-detalles'>
            <img src={sprite} alt={sprite} className='sprite'/>
            <div className='poke-info'>
                <h4 className='poke-info__nombre'>Nombre: {nombre}</h4>
                <p className='poke-info__char'>Tipo: {tipo}</p>
                <p className='poke-info__char'>Altura: {altura} dm</p>
                <p className='poke-info__char'>Peso: {peso} dag</p>
            </div>
        </section>
    )
}

export default VistaDetalles