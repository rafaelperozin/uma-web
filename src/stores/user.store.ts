import { cast, flow, Instance, types } from 'mobx-state-tree';

import { CreateUserResponse, Photo } from '../models/user.model';
import { createUserAction } from './user/actions/create-user.action';
import { setUserAction } from './user/actions/set-user.action';

export const UserStore = types
  .model('UserStore', {
    email: types.maybe(types.string),
    isAuthenticated: types.optional(types.boolean, false),
    userToken: types.maybe(types.string),
    firstName: types.maybe(types.string),
    lastName: types.maybe(types.string),
    role: types.maybe(types.string),
    isActive: types.maybe(types.boolean),
    avatar: types.maybe(types.string),
    createdAt: types.maybe(types.Date),
    updatedAt: types.maybe(types.Date),
    id: types.maybe(types.number),
    photos: types.optional(types.array(types.frozen<Photo>()), [])
  })
  .actions(self => ({
    setEmail: (email: string) => (self.email = email),
    setIsAuthenticated: (value: boolean) => (self.isAuthenticated = value),
    setUserToken: (token: string) => (self.userToken = token),
    setFirstName: (firstName: string) => (self.firstName = firstName),
    setLastName: (lastName: string) => (self.lastName = lastName),
    setRole: (role: string) => (self.role = role),
    setIsActive: (isActive: boolean) => (self.isActive = isActive),
    setAvatar: (avatar: string) => (self.avatar = avatar),
    setCreatedAt: (createdAt: Date) => (self.createdAt = createdAt),
    setUpdatedAt: (updatedAt: Date) => (self.updatedAt = updatedAt),
    setId: (id: number) => (self.id = id),
    setPhotos: (photos: Photo[]) => (self.photos = cast(photos))
  }))
  .actions(self => ({
    setUser: (data: CreateUserResponse) => setUserAction(data),
    setUserAuthentication: (token: string) => {
      self.setIsAuthenticated(true);
      self.setUserToken(token);
    },
    unsetUserAuthentication: () => {
      self.setEmail('');
      self.setIsAuthenticated(false);
      self.setUserToken('');
    }
  }))
  .actions(self => ({
    createUser: flow(createUserAction(self))
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
