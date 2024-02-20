import {ReactNode, useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import { RootStoreType, rootStore } from '../stores/root.store';
import persist from 'mst-persist';

const StoreContext = createContext<RootStoreType | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  //Checks the availability of the local storage and persists the root store data if available.
  const checkLocalStorageAvailability = async () => {
    try {
      if (window.localStorage) {
        persist('all', rootStore, {
          storage: localStorage,
          jsonify: true,
        }).then(() => {
          rootStore.afterCreate();
          setIsLoaded(true);
        });
      }
    } catch (error) {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
		checkLocalStorageAvailability();
	}, []);

  return isLoaded ? <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider> : <></>;
};

export const useStore = () => useContext(StoreContext) as RootStoreType;
