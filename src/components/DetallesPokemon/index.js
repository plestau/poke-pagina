import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detallesPokemon.css";

function DetallesPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        }
        fetchData();
    }, [id]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div id="tarjeta__detalles">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>ID: {pokemon.order}</p>
            <div id="tipos">
                <p>Tipo:</p>
                <ul>
                    {pokemon.types.map((type, index) => (
                        <li key={index}>{type.type.name}</li>
                    ))}
                </ul>
            </div>
            <div id="movimientos">
            <p>Habilidades:</p>
                <ul>
                    {pokemon.abilities.map((ability, index) => (
                        <li key={index}>{ability.ability.name}</li>
                    ))}
                </ul>
            </div>
            <p>Experiencia base: {pokemon.base_experience} exp</p>
            <p>Peso: {pokemon.weight} dag</p>
            <p>Altura: {pokemon.height} dm</p>

        </div>
    );
}

export default DetallesPokemon;
