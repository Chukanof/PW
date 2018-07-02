export function isReduxDevToolsBrowserExtensionExists() {
  let result = false;

  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) result = true;

  return result;
}
