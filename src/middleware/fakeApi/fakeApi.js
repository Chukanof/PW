import { RSAA } from "redux-api-middleware";
import fake from "./fakeApiName";

const fakeApi = store => next => action => {
  console.log("fake api start");
  const callAPI = action[RSAA];
  //   console.log(callAPI);
  if (typeof callAPI === "undefined") {
    return next(action);
  }
  if (typeof callAPI[fake] !== "object") {
    return next(action);
  }

  console.log("hello fake");
  console.log(action);
  next({ type: callAPI.types[1], payload: "new email" });
};

export default fakeApi;
