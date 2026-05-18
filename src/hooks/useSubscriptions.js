import { useEffect, useState } from 'react';
import subscriptionsApi from '../api/subscriptions';

export default function useSubscriptions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    subscriptionsApi
      .list()
      .then((response) => {
        setItems(response?.items || response || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    items,
    loading,
  };
}
