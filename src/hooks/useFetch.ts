import { useEffect, useState } from "react";

export default function useFetch<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchFunction();
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, reload: loadData };
}