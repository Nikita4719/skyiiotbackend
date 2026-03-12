const db = require("../config/db");

// Create
exports.createOffer = (data, callback) => {
  db.query("INSERT INTO offer SET ?", data, callback);
};

// Get all
exports.getAllOffers = (callback) => {
  db.query("SELECT * FROM offer ORDER BY id DESC", callback);
};

// Get by ID
exports.getOfferById = (id, callback) => {
  db.query("SELECT * FROM offer WHERE id = ?", [id], callback);
};

// Update
exports.updateOffer = (id, data, callback) => {
  db.query("UPDATE offer SET ? WHERE id = ?", [data, id], callback);
};

// Delete
exports.deleteOffer = (id, callback) => {
  db.query("DELETE FROM offer WHERE id = ?", [id], callback);
};