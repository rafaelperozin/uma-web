import { flow, Instance, types } from 'mobx-state-tree';

import apiConnect, { MULTIPART_HEADER } from '../api/connect.api';

export const UserStore = types
  .model('UserStore', {
    email: types.maybe(types.string),
    isAuthenticated: types.optional(types.boolean, false),
    userToken: types.maybe(types.string)
  })
  .actions(self => ({
    setEmail: (email: string) => (self.email = email),
    setIsAuthenticated: (value: boolean) => (self.isAuthenticated = value),
    setUserToken: (token: string) => (self.userToken = token)
  }))
  .actions(self => ({
    setUser: ({ email }: { email: string }) => {
      self.setEmail(email);
    },
    unsetUser: () => {
      self.setEmail('');
      self.setIsAuthenticated(false);
      self.setUserToken('');
    }
  }))
  .actions(self => ({
    createUser: flow(function* (user: any) {
      console.log('1. USER STORE: user', user);
      delete user.photos;
      const response = yield apiConnect.post('/user', user, MULTIPART_HEADER);
      console.log('2. USER STOR: response', response);
      self.setUser(response.data);
    })
    // fetchUser: flow(function* () {
    //   return yield axios.get(
    //     `${process.env.REACT_APP_RANDOM_USERS_API}/?inc=name,picture`
    //   );
    // }),
    // login: flow(function* (email: string, password: string) {
    //   const response = yield axios.post(
    //     `${process.env.REACT_APP_API}/auth/login`,
    //     {
    //       email,
    //       password,
    //     }
    //   );
    //   return response.data;
    // }),
  }));

export const userStore = UserStore.create({});

export type UserStoreType = Instance<typeof UserStore>;
