import { AxiosError, AxiosResponse } from 'axios';

import apiConnect, { headersMultipart } from '../../../api/connect.api';
import { CreateUserRequest } from '../../../models/user.model';

export const createUserAction = (self: any) =>
  function* (user: CreateUserRequest) {
    console.log('user', user);
    try {
      const formData = new FormData();

      Object.keys(user).forEach((key: string) => {
        const property = key as keyof CreateUserRequest;
        if (property === 'photos') {
          user[property]?.forEach(file => {
            formData.append(property, file);
          });
        } else {
          const value = user[property]?.toString() || '';
          formData.append(key, value);
        }
      });

      const response: AxiosResponse = yield apiConnect.post(
        '/user/register',
        formData,
        headersMultipart
      );

      self.setUser(response.data);
      return {
        success: true,
        message: 'Thank you for registering!\nThe user has been created successfully.'
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: (error as AxiosError).message
      };
    }
  };
