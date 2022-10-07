import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import relayEnvironment from './relay/relayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay';
import { ChakraProvider } from '@chakra-ui/react';
import { LoadScreen } from './components/LoadScreen';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadScreen />}>
      <ChakraProvider>
        <RelayEnvironmentProvider environment={relayEnvironment}>
          <App />
        </RelayEnvironmentProvider>
      </ChakraProvider>
    </React.Suspense>
  </React.StrictMode>,
);
