import { combineReducers } from "redux";
import common from "./reducers/common.reducer";
import user from "./reducers/user.reducer";

const appReducer = combineReducers({
  common,
  user,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
