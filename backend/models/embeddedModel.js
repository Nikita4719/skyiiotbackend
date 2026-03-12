const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query("SELECT * FROM embedded ORDER BY id DESC", callback);
};

// Get one
exports.getOne = (id, callback) => {
  db.query("SELECT * FROM embedded WHERE id = ?", [id], callback);
};

// Create
exports.create = (data, callback) => {
  db.query("INSERT INTO embedded SET ?", data, callback);
};

// Update
exports.update = (id, data, callback) => {
  db.query("UPDATE embedded SET ? WHERE id = ?", [data, id], callback);
};

// Delete
exports.remove = (id, callback) => {
  db.query("DELETE FROM embedded WHERE id = ?", [id], callback);
};