import { Routes as Router, Route } from 'react-router-dom';

import { AuthRoutes } from './modules/auth/AuthRoutes';
import { FeedPage } from './modules/products/FeedPage';

export const Routes = () => (
  <Router>
    <Route path="/*" element={<AuthRoutes />} />
    <Route index element={<FeedPage />} />
  </Router>
);
