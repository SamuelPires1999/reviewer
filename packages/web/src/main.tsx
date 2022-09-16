import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import relayEnvironment from './relay/relayEnvironment'
import {RelayEnvironmentProvider} from 'react-relay'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <App />
    </RelayEnvironmentProvider>
  </React.StrictMode>
)
