import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import { matchEmailArray } from "../data";

const adapter = new LocalStorage("db");
const db = low(adapter);

db.setState({
  posts: [{ id: 1, title: "test title" }],
  newTrEmails: matchEmailArray
}).write();

// var posts = db.get("posts");

// posts.push({ id: 2, title: "lowdb" }).write();

export default db;
