const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query("SELECT * FROM managementsection ORDER BY id DESC", callback);
};

// Get one
exports.getOne = (id, callback) => {
  db.query("SELECT * FROM managementsection WHERE id = ?", [id], callback);
};

// Create
exports.create = (data, callback) => {
  db.query("INSERT INTO managementsection SET ?", data, callback);
};

// Update
exports.update = (id, data, callback) => {
  db.query("UPDATE managementsection SET ? WHERE id = ?", [data, id], callback);
};

// Delete
exports.remove = (id, callback) => {
  db.query("DELETE FROM managementsection WHERE id = ?", [id], callback);
};