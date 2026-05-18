import { useEffect, useState } from 'react';
import systemApi from '../api/system';

export function useBackendHealth() {
  const [state, setState] = useState({ loading: true, ok: false, data: null, error: null });

  useEffect(() => {
    let active = true;

    systemApi
      .health()
      .then((data) => {
        if (active) {
          setState({ loading: false, ok: true, data, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setState({
            loading: false,
            ok: false,
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}

export default useBackendHealth;
