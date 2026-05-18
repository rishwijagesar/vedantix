import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

export default function useInvoices() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/api/invoices')
      .then((response) => setItems(response?.items || response || []))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
