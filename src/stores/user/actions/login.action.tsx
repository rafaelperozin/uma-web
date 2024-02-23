import { AxiosError, AxiosResponse } from 'axios';

import apiConnect from '../../../api/connect.api';
import { LoginRequest } from '../../../models/user.model';

export const loginAction = (self: any) =>
  function* (user: LoginRequest) {
    try {
      const response: AxiosResponse = yield apiConnect.post('/login', user);
      self.setUserAuthentication(response.data.access_token);
      return {
        success: true,
        message: 'User logged in successfully.'
      };
    } catch (error: unknown) {
      return {
        success: false,
        message:
          (error as AxiosError).response?.status === 401
            ? 'Invalid email or password.'
            : (error as AxiosError).message
      };
    }
  };
