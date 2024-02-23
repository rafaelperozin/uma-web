import { LoginResponse } from '../../../models/user.model';

export const setUserAuthenticationAction = (self: any) =>
  function (token: LoginResponse) {
    self.setIsAuthenticated(true);
    self.setUserToken(token);
  };
