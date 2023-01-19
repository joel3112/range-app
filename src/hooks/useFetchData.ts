import { useEffect, useState } from 'react';
import { fetchData } from '@/services';

export const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const response = await fetchData(url);
        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, [url]);

  return { data, loading };
};
