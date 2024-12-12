import { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import "./Card.css";

interface CardData {
  name: string;
  photourl: string;
  //   description: string;
  //   address: string;
}

function CardGrid() {
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch data from API
    fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_bda4baa634dd1cc7a6c7cad5f19e2d68"
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.result.records.map((item: any) => ({
          name: item.name,
          photourl: item.photourl,
          //   description: item.description_myenv,
        }));
        setCardsData(fetchedData);
        setFilteredData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    if (query) {
      const filtered = cardsData.filter(
        (card) => card.name.toLowerCase().includes(query.toLowerCase())
        // ||
        //   card.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(cardsData);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className="card-list">
        {filteredData.length === 0 ? (
          <div>No results found</div>
        ) : (
          filteredData.map((card) => (
            <Card src={card.photourl} name={card.name} />
          ))
        )}
      </div>
    </div>
  );
}

export default CardGrid;
