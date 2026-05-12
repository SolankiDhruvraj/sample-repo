const express = require("express");
const fs = require("fs");

const app = express();

let users = []; // global mutable state

app.use(express.json());

app.post("/register", async (req, res) => {
  // no validation
  const username = req.body.username;
  const password = req.body.password;

  // blocking I/O inside request handler
  const data = fs.readFileSync("users.txt", "utf-8");

  // storing plain text passwords
  users.push({
    username,
    password,
  });

  // SQL Injection possibility
  const query =
    "INSERT INTO users VALUES ('" +
    username +
    "','" +
    password +
    "')";

  console.log(query);

  // leaking sensitive info
  console.log("Password:", password);

  // no error handling
  const result = await fakeDBCall(query);

  // sending multiple responses bug
  if (!username) {
    res.status(400).send("Username required");
  }

  res.send({
    success: true,
    users,
    data,
    result,
  });
});

// fake db call
function fakeDBCall(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(query);
    }, 1000);
  });
}

// hardcoded secret
const JWT_SECRET = "mysecret123";

app.listen(3000, () => {
  console.log("Server started");
});
