import { Instance, applySnapshot, getSnapshot, types } from "mobx-state-tree";
import { UserStore, userStore } from './user.store';

export type RootStoreType = Instance<typeof RootStore>;

export const RootStore = types
  .model("RootStore", {
    user: UserStore,
  })
  .actions((self) => {
    let initialState = {};
    return {
      afterCreate: () => {
        initialState = getSnapshot(self);
      },
      reset: () => {
        applySnapshot(self, initialState);
      },
    };
  });

export const createStore = () =>
  RootStore.create({
    user: userStore,
  });

export const rootStore = createStore();
