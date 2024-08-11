import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wordsArray: [],
  importedText: [],
  time: 0,
  wpm: 0,
  mistakesCount: 0,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setWordsArray: (state, action) => {
      state.wordsArray = action.payload;
    },

    setImportedText: (state, action) => {
      state.importedText = action.payload;
    },

    setTime: (state, action) => {
      state.time = action.payload;
    },

    //Calculate the number of words per minute using the formula 
    setWpm: (state, action) => {
      const { importedText, time } = action.payload
      const newTime = time / 60;

      if (importedText && time > 0) {
        state.wpm = Math.round(importedText.length / newTime)
      }
    },

    //Calculate the number of mistakes
    setMistakesCount: (state, action) => {
      const { importedText, wordsArray } = action.payload;

      //Creating arrays of letters from arrays of words
      const importedLettersArray = importedText.flatMap(word => word.split(''));
      const lettersArray = wordsArray.flatMap(word => word.split('')).slice(0 , importedLettersArray.length);

      state.mistakesCount = 0

      //Comparing each letter of the arrays
      for (let i = 0; i < importedLettersArray.length; i++) {
        if (lettersArray[i] !== importedLettersArray[i]) {
          //If letters don't match , incrementing mistakesCount
          state.mistakesCount ++ 
        }
      }
    }

  }
});

export const { setWordsArray, setImportedText, setTime, setWpm, setMistakesCount } = typingSlice.actions;
export default typingSlice.reducer;
