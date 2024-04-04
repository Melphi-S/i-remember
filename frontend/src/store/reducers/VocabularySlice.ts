import { Vocabulary } from "../../api/models/Vocabulary.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VocabularyWordsStatuses } from "../../api/types";

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
        word.isFailed = false;
      }
    },
    decreaseWordStatus: (state, action: PayloadAction<number>) => {
      const word = state.vocabulary?.vocabularyWords.find(
        (word) => word.id === action.payload,
      );
      if (word) {
        word.status--;
        word.isFailed = true;
        word.failedTasks++;
      }
    },
    rejectWord: (state, action: PayloadAction<number>) => {
      const word = state.vocabulary?.vocabularyWords.find(
        (word) => word.id === action.payload,
      );
      if (word) {
        word.status = VocabularyWordsStatuses.BANNED;
      }
    },
  },
});

export const { setVocabulary, increaseWordStatus, decreaseWordStatus, rejectWord } =
  vocabularySlice.actions;

export default vocabularySlice.reducer;
