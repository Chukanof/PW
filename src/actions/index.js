//#region imports
// import { CALL_API, Schemas } from "../middleware/api";
import { RSAA } from "redux-api-middleware";
import fake from "../middleware/fakeApi/fakeApiName";
import EndpointBuilder from "../utils/reduxApiFeatures/endpointBuilder";
import CaaGen from "../utils/reduxApiFeatures/callApiActionsGenerator";

import { API_EMAILMATCH } from "../constants/actions";

//#endregion
const epb = new EndpointBuilder();
const caaGen = new CaaGen();

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchEmailsMatchedBySubstring = substring => ({
  [RSAA]: {
    endpoint: `${epb.getEndpoint("users")}`,
    method: "GET",
    types: caaGen.getFullArray(API_EMAILMATCH),

    // schema: Schemas.USER,
    [fake]: { substring }
  }
});

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const getEmailsMatchedBySubstring = substring => (
  dispatch,
  getState
) => {
  // const user = getState().entities.users[login];
  // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
  //   return null;
  // }

  return dispatch(fetchEmailsMatchedBySubstring(substring));
};

export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
});
