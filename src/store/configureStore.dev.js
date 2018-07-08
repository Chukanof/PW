//#region imports
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import { persistState } from "redux-devtools";
import { composeWithDevTools } from "redux-devtools-extension";
import { apiMiddleware } from "redux-api-middleware";
import reduxApiDecorator from "../middleware/reduxApiDecorator";
import fakeApi from "../middleware/fakeApi/fakeApi";
import rootReducer from "../reducers";
import DevTools from "../containers/DevTools";
import { isReduxDevToolsBrowserExtensionExists } from "../helpers/devTools";
//#endregion

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

  var apiMdlwr = reduxApiDecorator(apiMiddleware);
  const middlewares = [
    routingMiddleware,
    thunk,
    apiMdlwr,
    fakeApi,
    loggerMiddleware
  ];

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
