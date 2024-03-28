import { Vocabulary } from "../../api/models/Vocabulary.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VocabularyState {
  vocabulary: Vocabulary | null;
}

const initialState: VocabularyState = {
  vocabulary: null,
};

export const vocabularySlice = createSlice({
  initialState,
  name: "vocabularySlice",
  reducers: {
    setVocabulary: (state, action: PayloadAction<Vocabulary>) => {
      state.vocabulary = action.payload;
    },
    increaseWordStatus: (state, action: PayloadAction<number>) => {
      const word = state.vocabulary?.vocabularyWords.find(
        (word) => word.id === action.payload,
      );
      if (word) {
        word.status++;
      }
    },
    decreaseWordStatus: (state, action: PayloadAction<number>) => {
      const word = state.vocabulary?.vocabularyWords.find(
          (word) => word.id === action.payload,
      );
      if (word) {
        word.status--;
      }
    },
  },
});

export const { setVocabulary, increaseWordStatus, decreaseWordStatus } = vocabularySlice.actions;

export default vocabularySlice.reducer;
