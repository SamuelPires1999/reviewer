import Topbar from './components/Topbar';
import { Routes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './modules/auth/utils/AuthContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Topbar />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
