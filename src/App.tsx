import { AuthForm } from './components/auth/auth-form';

function App() {
  const isAuthenticated = false; // TODO: Implement authentication state

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  // Replace this with the actual dashboard or authenticated app content
  return <div>Dashboard</div>;
}

export default App; // Add this line to ensure the default export
