import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import nationalities from "./name";

const reducer = {
  nationalities,
};

export default configureStore({
  reducer,
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
