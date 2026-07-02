import { useContext } from 'react';
import { LanguageContext } from './LanguageContextObject';

export const useLanguage = () => useContext(LanguageContext);
