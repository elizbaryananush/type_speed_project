import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypingState {
  wordsArray: string[];
  importedText: string[];
  time: number;
  wpm: number;
  mistakesCount: number;
}

const initialState: TypingState = {
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
    setWordsArray: (state, action: PayloadAction<string[]>) => {
      state.wordsArray = action.payload;
    },

    setImportedText: (state, action: PayloadAction<string[]>) => {
      state.importedText = action.payload;
    },

    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },

    // Calculate the number of words per minute using the formula 
    setWpm: (state, action: PayloadAction<{ importedText: string[]; time: number }>) => {
      const { importedText, time } = action.payload;
      const newTime = time / 60;

      if (importedText && time > 0) {
        state.wpm = Math.round(importedText.length / newTime);
      }
    },

    // Calculate the number of mistakes
    setMistakesCount: (state, action: PayloadAction<{ importedText: string[]; wordsArray: string[] }>) => {
      const { importedText, wordsArray } = action.payload;

      // Creating arrays of letters from arrays of words
      const importedLettersArray = importedText.flatMap(word => word.split(''));
      const lettersArray = wordsArray.flatMap(word => word.split('')).slice(0, importedLettersArray.length);

      state.mistakesCount = 0;

      // Comparing each letter of the arrays
      for (let i = 0; i < importedLettersArray.length; i++) {
        if (lettersArray[i] !== importedLettersArray[i]) {
          // If letters don't match, incrementing mistakesCount
          state.mistakesCount++;
        }
      }
    },
  },
});

// Export the actions and reducer
export const { setWordsArray, setImportedText, setTime, setWpm, setMistakesCount } = typingSlice.actions;
export default typingSlice.reducer;

