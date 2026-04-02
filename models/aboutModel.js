const db = require("../config/db");

// Get all records
exports.getAll = (callback) => {
  db.query("SELECT * FROM about_us ORDER BY id DESC", callback);
};

// Get single record
exports.getOne = (id, callback) => {
  db.query("SELECT * FROM about_us WHERE id = ?", [id], callback);
};

// Create record
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO about_us 
    (title, heading, paragraph, image1, image2)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.title,
      data.heading,
      data.paragraph,
      data.image1,
      data.image2,
    ],
    callback
  );
};

// Update record
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE about_us SET
      title = ?,
      heading = ?,
      paragraph = ?,
      image1 = COALESCE(?, image1),
      image2 = COALESCE(?, image2)
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      data.title,
      data.heading,
      data.paragraph,
      data.image1,
      data.image2,
      id,
    ],
    callback
  );
};

// Delete record
exports.remove = (id, callback) => {
  db.query("DELETE FROM about_us WHERE id = ?", [id], callback);
};