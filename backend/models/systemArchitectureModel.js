const db = require("../config/db");

/* GET ALL */
exports.getAll = (callback) => {
  db.query(
    "SELECT * FROM system_architecture ORDER BY id DESC",
    callback
  );
};

/* GET BY ID */
exports.getById = (id, callback) => {
  db.query(
    "SELECT * FROM system_architecture WHERE id = ?",
    [id],
    callback
  );
};

/* CREATE */
exports.create = (data, callback) => {
  db.query(
    "INSERT INTO system_architecture (title, description) VALUES (?, ?)",
    [data.title, data.description],
    callback
  );
};

/* UPDATE */
exports.update = (id, data, callback) => {
  db.query(
    "UPDATE system_architecture SET title=?, description=? WHERE id=?",
    [data.title, data.description, id],
    callback
  );
};

/* DELETE */
exports.remove = (id, callback) => {
  db.query(
    "DELETE FROM system_architecture WHERE id=?",
    [id],
    callback
  );
};