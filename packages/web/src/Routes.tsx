import { Routes as Router, Route } from 'react-router-dom';

import { AuthRoutes } from './modules/auth/AuthRoutes';

export const Routes = () => (
  <Router>
    <Route path="/*" element={<AuthRoutes />} />
  </Router>
);
