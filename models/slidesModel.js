// models/slidesModel.js
const db = require("../config/db");

// Get All
exports.getAll = (callback) => {
  db.query("SELECT * FROM slides ORDER BY id DESC", callback);
};

// Get By ID
exports.getById = (id, callback) => {
  db.query("SELECT * FROM slides WHERE id=?", [id], callback);
};

// Create
exports.create = (title, media, callback) => {
  db.query(
    "INSERT INTO slides (title, media) VALUES (?, ?)",
    [title, media],
    callback
  );
};

// Update
exports.update = (id, title, media, callback) => {
  db.query(
    "UPDATE slides SET title=?, media=? WHERE id=?",
    [title, media, id],
    callback
  );
};

// Delete
exports.delete = (id, callback) => {
  db.query("DELETE FROM slides WHERE id=?", [id], callback);
};