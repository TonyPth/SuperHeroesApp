import React, { useEffect, useState } from 'react';
import { SuperHeros } from './SuperHeros'; // Importation de notre classe SuperHeros
import SuperHerosData from './SuperHeros.json'; // Importation du fichier JSON

export const App = () => {
  const [heroes, setHeroes] = useState<SuperHeros[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("name");
  const [selectedHero, setSelectedHero] = useState<SuperHeros | null>(null); // Nouvel état pour suivre le super-héros sélectionné
  
  useEffect(() => {
    const heroesFromData = SuperHerosData.map(
      (heroData: any) => new SuperHeros(heroData.id, heroData.name, heroData['id-api'], heroData.slug)
    );
    setHeroes(heroesFromData);
  }, []);

  const filteredHeroes = heroes.filter(hero => {
    if (sortKey === "name") {
      return hero.name.toLowerCase().includes(searchText.toLowerCase());
    } else {
      return hero.id.toString().includes(searchText);
    }
  });

    const sortedHeroes = filteredHeroes.sort((a: SuperHeros, b: SuperHeros) => {
      if (sortKey === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.id - b.id;
      }
    });

  return (
    <div>
      <h1>Super Heroes App</h1>
      <p>Nombre de super-héros chargés: {heroes.length}</p>
      <input 
        type="text" 
        placeholder="Rechercher un super-héros..." 
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value)} 
      />

      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
        <option value="name">Nom</option>
        <option value="id">ID</option>
      </select>

      {selectedHero ? (
        <div>
          <h2>{selectedHero.name}</h2>
          <p>Id: {selectedHero.id}</p>
          <p>Id API: {selectedHero.idApi}</p>
          <p>Slug: {selectedHero.slug}</p>
          <img 
            src={`https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/images/sm/${selectedHero.slug}.jpg`} 
            alt={selectedHero.name} 
          />
          <button onClick={() => setSelectedHero(null)}>Retour à la liste</button>
        </div>
      ) : (
        <div>
          {sortedHeroes.map((hero: SuperHeros) => (
            <div key={hero.id} onClick={() => setSelectedHero(hero)} style={{ cursor: 'pointer' }}>
              <h2>{hero.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;