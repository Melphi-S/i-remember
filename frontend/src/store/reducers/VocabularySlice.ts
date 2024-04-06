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
    decreaseWordStatus: (
      state,
      action: PayloadAction<{ id: number; status: VocabularyWordsStatuses }>,
    ) => {
      const word = state.vocabulary?.vocabularyWords.find(
        (word) => word.id === action.payload.id,
      );
      if (word) {
        word.status = action.payload.status;
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
    acceptWord: (state, action: PayloadAction<number>) => {
      const word = state.vocabulary?.vocabularyWords.find(
        (word) => word.id === action.payload,
      );
      if (word) {
        word.status = VocabularyWordsStatuses.TO_DAILY;
      }
    },
  },
});

export const {
  setVocabulary,
  increaseWordStatus,
  decreaseWordStatus,
  rejectWord,
  acceptWord,
} = vocabularySlice.actions;

export default vocabularySlice.reducer;
