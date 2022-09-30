import { Routes as Router, Route } from 'react-router-dom';

import { AuthRoutes } from './modules/auth/AuthRoutes';
import { CreateEstablishmentPage } from './modules/establishments/CreateEstablishmentPage';
import { FeedPage } from './modules/establishments/FeedPage';
import { EstablishmentPage } from './modules/establishments/EstablishmentPage';

export const Routes = () => (
  <Router>
    <Route path="/*" element={<AuthRoutes />} />
    <Route path="/establishments/:id" element={<EstablishmentPage />} />
    <Route index element={<FeedPage />} />
    <Route
      path="/establishments/create"
      element={<CreateEstablishmentPage />}
    />
  </Router>
);
