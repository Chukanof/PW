import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import home from "./homeReducer";
import newTransaction from "./newTransactionReducer";

const rootReducer = combineReducers({
  home,
  newTransaction,
  router: routerReducer
  // form: formReducer
});

export default rootReducer;
