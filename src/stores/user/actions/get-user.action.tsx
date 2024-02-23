import { AxiosError, AxiosResponse } from 'axios';

import apiConnect from '../../../api/connect.api';
import { UserResponse } from '../../../models/user.model';

export const getUserAction = (self: any) =>
  function* () {
    try {
      console.log('START getUserAction');
      const response: AxiosResponse<UserResponse> = yield apiConnect.get('/user/me');
      console.log('getUserAction', response.data);
      self.setUser(response.data);
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
