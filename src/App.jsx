import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === '') return;

    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${query}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_POKEMON_API_KEY}`,
        },
      });
      const data = await response.json();
      setCards(data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recherche de cartes Pokémon</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Recherchez un Pokémon..."
      />
      <button onClick={handleSearch}>Rechercher</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {cards.map((card) => (
          <div key={card.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={card.images.small} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
