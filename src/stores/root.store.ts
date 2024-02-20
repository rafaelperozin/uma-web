import { Instance, types } from "mobx-state-tree";
import { UserStore, userStore } from './user.store';

export type RootStoreType = Instance<typeof RootStore>;

export const RootStore = types.model("RootStore", {
  user: UserStore,
});

export const createStore = () =>
  RootStore.create({
    user: userStore,
  });

//TODO: Add a persist to save the store in local storage

export const rootStore = createStore();
