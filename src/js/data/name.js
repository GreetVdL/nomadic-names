import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNationalities = createAsyncThunk(
  "nationalities/getNationalities",
  async (name) => (await axios(`https://api.nationalize.io/?name=${name}`)).data
);

// export const getAgifyresponse = createAsyncThunk(
//   "age/getAgifyresponse",
//   async (naam) => (await axios(`https://api.agify.io/?name=${naam}`)).data
// );
// store.dispatch(getAgifyresponse("Jos"))

const nationalitiesSlice = createSlice({
  name: "nationalities",
  initialState: {
    nationalities: {},
    loading: false,
    error: false,
    counter: 5,
  },
  reducers: {
    increment: (state, action) => {
      state.counter++;
    },
    decrement: (state, action) => {
      state.counter--;
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
    },
    [getNationalities.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.joke = payload;
    },
  },
});

export default nationalitiesSlice.reducer;
