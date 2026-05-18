import ProtectedRoute from './ProtectedRoute';

export default function RequireCustomerRole({ children }) {
  return (
    <ProtectedRoute role="CUSTOMER">
      {children}
    </ProtectedRoute>
  );
}
