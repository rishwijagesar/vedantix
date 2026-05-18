import { useEffect, useState } from 'react';
import analyticsSummaryApi from '../api/analyticsSummary';

export default function useAnalyticsSummary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    analyticsSummaryApi
      .get()
      .then((response) => {
        setData(response || null);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
    error,
  };
}
