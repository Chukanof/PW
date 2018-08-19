import { EMAILMATCH_SUCCESS } from "../../constants/actions";
import { emailMatch } from "./users";

const TIMEOUT = 200;

const matches = {
  EMAILMATCH_SUCCESS: emailMatch
};
// export default {
//   getEmail: (cb, timeout) => setTimeout(cb(emails), timeout || TIMEOUT)
// };
const f = function(action, fake) {
  var successAction = action;

  var res = matches[successAction](fake);

  return res;
};

export default f;
