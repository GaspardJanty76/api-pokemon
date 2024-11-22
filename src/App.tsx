import { FormEvent, useState } from "react";
import "./App.css";

interface Card {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
}

function App() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<Card[]>([]);

  async function search(e: FormEvent) {
    e.preventDefault();
    console.log("Recherche en cours... avec ", query);
    const data = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:${query}&pageSize=10`
    );
    const json = await data.json();
    setCards(json.data);

  }

  return (
    <>
      <form onSubmit={search}>
        <input onChange={(e) => setQuery(e.target.value)} type="text" />
        <button>Rechercher</button>
      </form>
      <div>
        {cards.map((card) => (
          <div key={card.id}>
            <img src={card.images.small} alt={card.name} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;