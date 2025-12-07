import { useState, useEffect } from "react";

function useFetch(url: string) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        // Handle paginated responses (Spring Data Page)
        if (json && typeof json === 'object' && 'content' in json) {
          setData(json.content);
        } else {
          setData(json);
        }
        
        setLoading(false);
      } catch (error) {
        setError(error as string);
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
