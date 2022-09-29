import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { RecoverPasswordPage } from './RecoverPasswordPage';
import { RegisterPage } from './RegisterPage';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="recover" element={<RecoverPasswordPage />} />
    </Routes>
  );
};
