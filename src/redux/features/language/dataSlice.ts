import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

import LangDe from "../../Language/de.json" assert { type: "json" };
import LangEn from "../../Language/en.json" assert { type: "json" };
import LangRu from "../../Language/ru.json" assert { type: "json" };

interface LangIntf {
  name: string;
  shortName: string;
}

type LangType = "De" | "En" | "Ru";

interface dataState {
  language: LangType;
  mail: string;
  phone: number | null;
  LanguageActive: object;
}

interface GetForm {
  mail: string;
  phone: number;
}

const initialState: dataState = {
  language: "Ru",
  mail: "test",
  phone: 123312,
  LanguageActive: LangRu,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LangType>) => {
      switch (action.payload) {
        case "De":
          state.LanguageActive = LangDe;
          break;
        case "En":
          state.LanguageActive = LangEn;
          break;
        case "Ru":
          state.LanguageActive = LangRu;
          break;
      }

      state.language = action.payload;
    },
    setForm: (state, action: PayloadAction<GetForm>) => {
      state.mail = action.payload.mail;
      state.phone = action.payload.phone;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  },
});

export const { setLanguage, setForm } = dataSlice.actions;
export default dataSlice.reducer;

export const selectCount = (state: RootState) => state.data;
