const db = require("../config/db");

exports.create = (data, callback) => {
  db.query(
    "INSERT INTO supported_content SET ?",
    data,
    callback
  );
};

exports.getAll = (callback) => {
  db.query(
    "SELECT * FROM supported_content ORDER BY id DESC",
    callback
  );
};

exports.getById = (id, callback) => {
  db.query(
    "SELECT * FROM supported_content WHERE id=?",
    [id],
    callback
  );
};

exports.update = (id, data, callback) => {
  db.query(
    "UPDATE supported_content SET ? WHERE id=?",
    [data, id],
    callback
  );
};

exports.delete = (id, callback) => {
  db.query(
    "DELETE FROM supported_content WHERE id=?",
    [id],
    callback
  );
};
