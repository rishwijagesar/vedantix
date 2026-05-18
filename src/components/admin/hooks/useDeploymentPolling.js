import { useEffect } from 'react';

const ACTIVE_STATUSES = ['QUEUED', 'PENDING', 'RUNNING', 'IN_PROGRESS'];

export default function useDeploymentPolling({ deployment, enabled = true, intervalMs = 5000, onPoll }) {
  useEffect(() => {
    if (!enabled) return undefined;

    const status = deployment?.status;
    if (!ACTIVE_STATUSES.includes(status)) {
      return undefined;
    }

    const timer = setInterval(() => {
      if (typeof onPoll === 'function') {
        onPoll(deployment);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [deployment, enabled, intervalMs, onPoll]);
}
