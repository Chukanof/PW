import db from "../db";

const emailMatch = ({ substring }) => {
  console.log(substring);
  const result = db
    .get("newTrEmails")
    .filter(item => item.email.includes(substring))
    .map("email")
    .value();

  console.log(result);
  return result;
};

export { emailMatch };
