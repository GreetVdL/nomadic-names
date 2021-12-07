import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import nationalities from "./nationality";
import age from "./age";
import gender from "./gender";

export default configureStore({
  reducer: {
    nationalities,
    age,
    gender,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
