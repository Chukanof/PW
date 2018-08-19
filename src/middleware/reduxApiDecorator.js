import { RSAA } from "redux-api-middleware";
import fake from "./fakeApi/fakeApiName";

export default function(func) {
  return store => next => action => {
    const callAPI = action[RSAA];

    if (typeof callAPI !== "undefined") {
      if (typeof callAPI[fake] === "object") {
        return next(action);
      }
    }

    var prms = [store, next, action];

    return func.apply(this, prms);
  };
}
