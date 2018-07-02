import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import { persistState } from "redux-devtools";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
import DevTools from "../containers/DevTools";
import { isReduxDevToolsBrowserExtensionExists } from "../helpers/devTools";

function getComposedMiddlewares(middlewares) {
  if (isReduxDevToolsBrowserExtensionExists()) {
    return composeWithDevTools(applyMiddleware(...middlewares));
  } else {
    return compose(
      applyMiddleware(...middlewares),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    );
  }
}

const configureStore = (history, preloadedState) => {
  const routingMiddleware = routerMiddleware(history);
  const loggerMiddleware = createLogger();

  const middlewares = [routingMiddleware, thunk, loggerMiddleware];

  const store = createStore(
    rootReducer,
    preloadedState,
    getComposedMiddlewares(middlewares)
  );

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept("../reducers", () => {
  //     store.replaceReducer(rootReducer);
  //   });
  // }

  return store;
};

export default configureStore;
