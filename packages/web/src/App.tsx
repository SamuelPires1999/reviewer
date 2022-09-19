import Topbar from './components/Topbar';
import { Routes } from './Routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <Topbar />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
