import { LoginResponse } from '../../../models/user.model';

export const setUserAuthenticationAction = (self: any) =>
  function (token: LoginResponse) {
    console.log('setUserAuthenticationAction', token);
    self.setIsAuthenticated(true);
    self.setUserToken(token);
  };
