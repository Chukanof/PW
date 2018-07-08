import { EMAILMATCH_SUCCESS } from "../constants/actions";

const initialNewTransactionState = {
  recipientEmail: "",
  transactionSum: 0
};

export default function transactions(
  state = initialNewTransactionState,
  action
) {
  switch (action.type) {
    case EMAILMATCH_SUCCESS:
      return {
        ...state,
        recipientEmail: action.payload
      };
    default:
      return state;
  }
}
