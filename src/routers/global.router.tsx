import { Route, Routes } from 'react-router-dom';

import { Layout } from '../layouts/default.layout';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login/login.page';
import { NotFoundPage } from '../pages/not-found.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { RegisterPage } from '../pages/register/register.page';
import { ProtectedRoute } from './protected.route';

export const GlobalRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/me" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
