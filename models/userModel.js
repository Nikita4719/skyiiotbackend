const db = require("../config/db");

// Find user by email
exports.findByEmail = (email, callback) => {
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    callback
  );
};

// Create new user
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [data.name, data.email, data.password],
    callback
  );
};