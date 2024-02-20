import { Instance, types } from "mobx-state-tree";

export const UserStore = types
  .model("UserStore", {
    email: types.maybe(types.string),
    isAuthenticated: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setEmail: (email: string) => (self.email = email),
    setIsAuthenticated: (value: boolean) => (self.isAuthenticated = value),
  }))
  .actions((self) => ({
    setUser: ({email}: {email: string}) => {
      self.setEmail(email);
    },
  }))
  // .actions((self) => ({
    // createUser: flow(function* (user: unknown) {
    //   const response = yield apiConnect('POST', '/useraccount', user);
    //   self.setAccounts(response.data);
    // }),
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
  // }));

export const userStore = UserStore.create({});

export type UserStoreType = Instance<typeof UserStore>;
