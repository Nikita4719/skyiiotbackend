const db = require("../config/db");

// Create
exports.create = (data, callback) => {
  db.query("INSERT INTO everywhere_slide SET ?", data, callback);
};

// Get all
exports.getAll = (callback) => {
  db.query("SELECT * FROM everywhere_slide ORDER BY id DESC", callback);
};

// Get one
exports.getById = (id, callback) => {
  db.query("SELECT * FROM everywhere_slide WHERE id = ?", [id], callback);
};

// Update
exports.update = (id, data, callback) => {
  db.query("UPDATE everywhere_slide SET ? WHERE id = ?", [data, id], callback);
};

// Delete
exports.remove = (id, callback) => {
  db.query("DELETE FROM everywhere_slide WHERE id = ?", [id], callback);
};