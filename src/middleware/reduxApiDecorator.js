import { RSAA } from "redux-api-middleware";
import fake from "./fakeApi/fakeApiName";

export default function(func) {
  return function(store) {
    return function(next) {
      return function(action) {
        // console.log(arguments);
        // console.log(store);
        // console.log(next);
        // console.log(action);

        const callAPI = action[RSAA];
        // console.log(action);
        console.log(callAPI);

        if (typeof callAPI !== "undefined") {
          console.log("undef");

          if (typeof callAPI[fake] === "object") {
            console.log("fake obj - next");
            return next(action);
          }
        }

        var prms = [store, next, action];
        // console.log(prms);

        return func.apply(this, prms);
      };
    };
  };
}
// }
// export const fake = "fake";
