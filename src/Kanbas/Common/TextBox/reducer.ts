import { createSlice } from "@reduxjs/toolkit";
interface TextState {
    instructions:String

}
const initialState = {
  texts: [] as TextState[],
  text: {
   instructions:"",
  },
};
const TextsSlice = createSlice({
  name: "texts",
  initialState,
  reducers: {
    updateText: (state, action) => {
      state.texts = state.texts.map((text) => {
        if (text.instructions === action.payload.instructions) {
          return action.payload;
        } else {
          return text;
        }
      });
    },


    setText: (state, action) => {
        state.text = { ...state.text, ...action.payload }
    },

    setTexts: (state, action) => {
      state.texts = action.payload;
    },
  },
});
export const {
  updateText,
  setText,
  setTexts,
} = TextsSlice.actions;
export default TextsSlice.reducer;
