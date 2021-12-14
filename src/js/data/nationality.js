import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNationalities = createAsyncThunk(
  "nationalities/getNationalities",
  async (name) => (await axios(`https://api.nationalize.io/?name=${name}`)).data
);

const nationalitiesSlice = createSlice({
  name: "nationalities",
  initialState: {
    nationalities: {},
    loading: false,
    error: false,
    value: null,
  },
  reducers: {
    setValue(state, { payload }) {
      state.value = payload;
    },
  },
  extraReducers: {
    [getNationalities.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getNationalities.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.nationalities = {};
    },
    [getNationalities.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.nationalities = payload;
    },
  },
});

export const { setValue } = nationalitiesSlice.actions;
export default nationalitiesSlice.reducer;
