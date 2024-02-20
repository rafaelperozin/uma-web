import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { HomePage } from '../pages/home.page';
import { ProfilePage } from '../pages/profile.page';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/not-found.page';
import { ProtectedRoute } from './protected.route';

export const GlobalRouter = () => {
  return (
    <Routes>
      {/* PAGES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/me" element={<ProfilePage />} />
      </Route>
      {/* When don't find any route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
