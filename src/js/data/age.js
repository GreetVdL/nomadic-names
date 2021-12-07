import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAge = createAsyncThunk(
  "age/getAge",
  async (name) => (await axios(`https://api.agify.io/?name=${name}`)).data
);

const ageSlice = createSlice({
  name: "age",
  initialState: {
    age: {},
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getAge.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getAge.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.age = {};
    },
    [getAge.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.age = payload;
    },
  },
});

export default ageSlice.reducer;
