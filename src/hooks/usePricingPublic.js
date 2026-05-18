import { useEffect, useState } from 'react';
import pricingApi from '../api/pricing';

export default function usePricingPublic() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    pricingApi.getSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  return { loading, summary };
}
