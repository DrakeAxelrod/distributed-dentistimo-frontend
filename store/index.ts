import { configureStore, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {
  _id: "",
  email: "",
  name: {
    first: "",
    last: "",
  },
  personalNumber: "",
  phone: "",
};
function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case "REGISTER":
      return {
        _id: action.payload._id,
        email: action.payload.email,
        name: action.payload.name,
        personalNumber: action.payload.personalNumber,
        phone: action.payload.phone,
      };
    case "LOGIN":
      return {
        _id: action.payload._id,
        email: action.payload.email,
        name: {
          first: action.payload.first,
          last: action.payload.first,
        },
        personalNumber: action.payload.personalNumber,
        phone: action.payload.phone,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

const persistedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({ reducer: persistedReducer });
const persistor = persistStore(store);

export default store;
