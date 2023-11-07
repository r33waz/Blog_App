
// Creating a redux store in which data removes when refreshed
// import { configureStore } from "@reduxjs/toolkit";
// import loginReducer from "../src/components/authentication/loginSlice";

// export const store = configureStore({
//   reducer: {
//     user: loginReducer,
//   },
// });


//creating the persisit store in which data doestnot change until there is a internal chaneg 
//een after refresh
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../src/components/authentication/loginSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-store",
  storage,
};

const persistedReducer = persistReducer(persistConfig, loginReducer);
const store = configureStore({
  reducer: {
    user:persistedReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
