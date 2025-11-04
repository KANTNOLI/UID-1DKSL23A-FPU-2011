'use client'
import { Provider } from 'react-redux'
import { RootState, store } from '../redux/store'

interface StoreProviderProps {
  children: React.ReactNode
}

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setForm, setLanguage } from '@/redux/features/language/dataSlice';

type LangType = "De" | "En" | "Ru";

interface dataState {
  language: LangType;
  mail: string;
  phone?: number | null;
  LanguageActive?: object;
}

interface GetForm {
  mail: string;
  phone: number;
}

// const initialState: dataState = {
//   language: "Ru",
//   mail: "test",
//   phone: 123312,
//   LanguageActive: LangRu,
// };

const KEY_LS_SETTINGS = "@2JH/s8oFa3[a.asd2@"

function LStore() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getData: dataState = JSON.parse(localStorage.getItem(KEY_LS_SETTINGS) + "")

    if (!getData) {
      localStorage.setItem(KEY_LS_SETTINGS, JSON.stringify({
        language: "En",
        mail: "",
        phone: null,
      }))
    } else {
      dispatch(setLanguage(getData.language))
      dispatch(setForm(getData as GetForm))
    }

  }, [dispatch])

  return null
}

export function StoreProvider({ children }: StoreProviderProps) {

  return (
    <Provider store={store}>
      <LStore />
      {children}
    </Provider>
  )
}