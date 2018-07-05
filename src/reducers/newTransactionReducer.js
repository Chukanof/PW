const initialNewTransactionState = {
  recipientEmail: "",
  transactionSum: 0
};

export default function transactions(
  state = initialNewTransactionState,
  action
) {
  switch (action.type) {
    default:
      return state;
  }
}
