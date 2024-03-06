import React, { useState, useEffect } from 'react';
import '../main.css'; // Імпорт CSS файлу для стилів

const PokemonInfo = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPokemonList(data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1 className="pokemon-title">Pokemon List</h1> {/* Додали клас для центрування тексту */}
            <div className="pokemon-container">
                {pokemonList.map((pokemon, index) => (
                    <div key={index} className="pokemon-card">
                        <h2>{pokemon.name}</h2>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonInfo;
