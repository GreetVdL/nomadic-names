import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import nationalities from "./nationality";
import age from "./age";

export default configureStore({
  reducer: {
    nationalities,
    age,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
