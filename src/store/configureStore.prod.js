import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers";

const configureStore = (history, preloadedState) => {
  const routingMiddleware = routerMiddleware(history);

  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(routingMiddleware, thunk)
  );
};

export default configureStore;
