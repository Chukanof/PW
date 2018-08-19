import { RSAA } from "redux-api-middleware";
import fake from "./fakeApiName";
import fakeResponseProvider from "../../fake/responses";

const fakeApi = store => next => action => {
  const callAPI = action[RSAA];

  if (typeof callAPI === "undefined") {
    return next(action);
  }
  if (typeof callAPI[fake] !== "object") {
    return next(action);
  }

  var successAction = callAPI.types[1];

  const response = fakeResponseProvider(successAction, callAPI[fake]);

  next({ type: successAction, payload: response });
};

export default fakeApi;
