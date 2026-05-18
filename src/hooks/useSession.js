import { useAuth } from '../context/AuthContext';

export default function useSession() {
  return useAuth();
}
