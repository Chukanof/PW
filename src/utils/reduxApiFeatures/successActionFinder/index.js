import { SUCCESS } from "../../../constants/actions/prefixes";

export default class SuccessActionFinder {
  isExistSuccessElement = array => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (element.endsWith(SUCCESS)) {
        return true;
      }
    }
  };

  findSuccessElement = array => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (element.endsWith(SUCCESS)) {
        return element;
      }
    }
  };

  getIndexOfSuccessElement = array => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (element.endsWith(SUCCESS)) {
        return i;
      }
    }
  };
}
