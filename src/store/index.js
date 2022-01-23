import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root.reducer";
const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools());
};
export default configureStore;
