import AppShell from './AppShell';
import Sidebar from '../navigation/Sidebar';

export default function Shell({ navigation = [], children }) {
  return (
    <AppShell sidebar={<Sidebar items={navigation} />}>
      {children}
    </AppShell>
  );
}
