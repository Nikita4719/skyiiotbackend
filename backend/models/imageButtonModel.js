const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query("SELECT * FROM image_button_section ORDER BY id DESC", callback);
};

// Get one
exports.getOne = (id, callback) => {
  db.query("SELECT * FROM image_button_section WHERE id = ?", [id], callback);
};

// Create
exports.create = (data, callback) => {
  db.query(
    "INSERT INTO image_button_section (heading, paragraph, image) VALUES (?, ?, ?)",
    [data.heading, data.paragraph, data.image],
    callback
  );
};

// Update
exports.update = (id, data, callback) => {
  db.query(
    "UPDATE image_button_section SET heading = ?, paragraph = ?, image = ? WHERE id = ?",
    [data.heading, data.paragraph, data.image, id],
    callback
  );
};

// Delete
exports.remove = (id, callback) => {
  db.query("DELETE FROM image_button_section WHERE id = ?", [id], callback);
};