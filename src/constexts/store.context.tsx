import {ReactNode, useContext} from 'react';
import {createContext} from 'react';
import { RootStoreType, rootStore } from '../stores/root.store';

const StoreContext = createContext<RootStoreType | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) =>
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;

export const useStore = () => useContext(StoreContext) as RootStoreType;
