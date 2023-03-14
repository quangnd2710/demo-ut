import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DogState {
  breeds: string[];
  selectedBreed: string;
  detailBreed: string[];
  loading: boolean;
  error: string;
}

const initialState: DogState = {
  breeds: [],
  detailBreed: [],
  selectedBreed: "",
  loading: false,
  error: "",
};

const dogSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    selectBreed(state, action: PayloadAction<string>) {
      state.selectedBreed = action.payload;
    },
    getAllBreeds(state) {
      state.loading = true;
    },
    getAllBreedSuccess(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.breeds = [...action.payload];
    },
    getAllBreedsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getDetailBreed(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    getDetailBreedSuccess(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.detailBreed = [...action.payload];
    },
    getDetailBreedError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Actions
export const {
  getAllBreeds,
  getDetailBreed,
  getDetailBreedError,
  getDetailBreedSuccess,
  getAllBreedSuccess,
  getAllBreedsError,
  selectBreed,
} = dogSlice.actions;

export const dogsActions = dogSlice.actions;
// Reducer
const dogsReducer = dogSlice.reducer;
export default dogsReducer;
