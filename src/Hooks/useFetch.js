import { useEffect, useState } from "react";

// ved oprettelse af en hook i react er det et must at det pågældende hook staer med use
export const useFetch = (url, key) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ved dette hook henter vi data fra et api angivet i den url der passes som prop
    // vi laver en async function som henter data fra apiét
    const fetchData = async () => {
      try {
        // vi laver en en const som indeholder den hentede data fra det pågældende uirl
        const response = await fetch(url);

        // vi konvertere data til json
        const json = await response.json();
        // vi opdatere state med den hentede data
        !key ? setApiData(json) : setApiData(json[key]);
        // vi sætter loading til false så kaldet ved at vi er færdig med at loade
        setLoading(false);
      } catch (error) {
        // hvis der opstår fejl opdatere vi state med de pågældnde fejl
        setError(error);
        // sætter loading til false
        setLoading(false);
      }
    };
    fetchData();
  }, [url, key]);
  // vi returnerer de states som vi har opdateret for at de indsamlede data kan bruges i det script der har lavet kaldet
  return { apiData, loading, error };
};
