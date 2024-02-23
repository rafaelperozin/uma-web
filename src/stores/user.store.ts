import { cast, flow, Instance, types } from 'mobx-state-tree';

import { Photo } from '../models/user.model';
import { createUserAction } from './user/actions/create-user.action';
import { getUserAction } from './user/actions/get-user.action';
import { loginAction } from './user/actions/login.action';
import { setUserAction } from './user/actions/set-user.action';
import { setUserAuthenticationAction } from './user/actions/set-user-authentication.action';

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
    setCreatedAt: (createdAt: Date | undefined) => (self.createdAt = createdAt),
    setUpdatedAt: (updatedAt: Date | undefined) => (self.updatedAt = updatedAt),
    setId: (id: number | undefined) => (self.id = id),
    setPhotos: (photos: Photo[]) => (self.photos = cast(photos))
  }))
  .actions(self => ({
    setUser: setUserAction(self),
    setUserAuthentication: setUserAuthenticationAction(self),
    unsetUserAuthentication: () => {
      // TODO: abstract this to user/actions
      self.setEmail('');
      self.setIsAuthenticated(false);
      self.setUserToken('');
      self.setFirstName('');
      self.setLastName('');
      self.setRole('');
      self.setIsActive(false);
      self.setAvatar('');
      self.setCreatedAt(undefined);
      self.setUpdatedAt(undefined);
      self.setId(undefined);
      self.setPhotos([]);
    }
  }))
  .actions(self => ({
    createUser: flow(createUserAction(self)),
    login: flow(loginAction(self)),
    getUser: flow(getUserAction(self))
  }))
  .views(self => ({
    get fullName() {
      return `${self.firstName} ${self.lastName}`;
    }
  }));

export const userStore = UserStore.create({});

export type UserStoreType = Instance<typeof UserStore>;
