import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions/prefixes";

export default class CallApiActionsGenerator {
  getFullArray = prefix => {
    return [`${prefix}${REQUEST}`, `${prefix}${SUCCESS}`, `${prefix}${ERROR}`];
  };

  getRequestAction = prefix => {
    return `${prefix}${REQUEST}`;
  };

  getSuccessAction = prefix => {
    return `${prefix}${SUCCESS}`;
  };

  getErrorAction = prefix => {
    return `${prefix}${ERROR}`;
  };
}
