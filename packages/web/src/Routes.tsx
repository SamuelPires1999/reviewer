import { Routes as Router, Route } from 'react-router-dom';

import { AuthRoutes } from './modules/auth/AuthRoutes';
import { FeedPage } from './modules/products/FeedPage';
import { ProductPage } from './modules/products/ProductPage';

export const Routes = () => (
  <Router>
    <Route path="/*" element={<AuthRoutes />} />
    <Route path="/products/:id" element={<ProductPage />} />
    <Route index element={<FeedPage />} />
  </Router>
);
