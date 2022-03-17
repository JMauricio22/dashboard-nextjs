import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export default function useFetch<T>(endPoint) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const resp: AxiosResponse = await axios.get(endPoint);
      setData(resp.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetch();
    }
  }, [loading]);

  return { data, loading, setLoading };
}
