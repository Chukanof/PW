import { API_EMAILMATCH } from "../constants/actions";
import caaGen from "../utils/reduxApiFeatures/callApiActionsGenerator";

const initialNewTransactionState = {
  recipientEmail: "",
  emailSuggestions: [],
  transactionSum: 0
};

export default function transactions(
  state = initialNewTransactionState,
  action
) {
  switch (action.type) {
    case new caaGen().getSuccessAction(API_EMAILMATCH):

    // return {
    //   ...state,
    //   emailSuggestions: action.payload
    // };
    default:
      return state;
  }
}
