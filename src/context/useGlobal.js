import { useContext } from 'react';
import { GlobalContext } from './GlobalContextObject';

export const useGlobal = () => useContext(GlobalContext);
