import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGender = createAsyncThunk(
  "gender/getGender",
  async (name) => (await axios(`https://api.genderize.io/?name=${name}`)).data
);

const genderSlice = createSlice({
  name: "gender",
  initialState: {
    gender: {},
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getGender.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getGender.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.gender = {};
    },
    [getGender.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.gender = payload;
    },
  },
});

export default genderSlice.reducer;
