const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query("SELECT * FROM faqs ORDER BY id DESC", callback);
};

// Get one
exports.getOne = (id, callback) => {
  db.query("SELECT * FROM faqs WHERE id = ?", [id], callback);
};

// Create
exports.create = (title, callback) => {
  db.query("INSERT INTO faqs (title) VALUES (?)", [title], callback);
};

// Update
exports.update = (id, title, callback) => {
  db.query("UPDATE faqs SET title = ? WHERE id = ?", [title, id], callback);
};

// Delete
exports.remove = (id, callback) => {
  db.query("DELETE FROM faqs WHERE id = ?", [id], callback);
};