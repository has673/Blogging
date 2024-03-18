import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userslice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers if any
  },
  // Add middleware, devtools configuration, etc. if needed
});

export default store;
