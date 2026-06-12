import { useState, useEffect, useCallback } from 'react';
import { get } from '../services/api';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    get<T>(url)
      .then((response) => {
        if (!cancelled) setData(response.data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || 'An error occurred');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url, trigger]);

  return { data, loading, error, refetch };
}
