const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query(
    "SELECT * FROM aboutusenterprise ORDER BY id DESC",
    callback
  );
};

// Get one
exports.getOne = (id, callback) => {
  db.query(
    "SELECT * FROM aboutusenterprise WHERE id = ?",
    [id],
    callback
  );
};

// Create
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO aboutusenterprise 
    (heading, paragraph, image1, image2)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.heading,
      data.paragraph,
      data.image1,
      data.image2,
    ],
    callback
  );
};

// Update
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE aboutusenterprise 
    SET 
      heading = ?, 
      paragraph = ?, 
      image1 = COALESCE(?, image1), 
      image2 = COALESCE(?, image2)
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      data.heading,
      data.paragraph,
      data.image1,
      data.image2,
      id,
    ],
    callback
  );
};

// Delete
exports.remove = (id, callback) => {
  db.query(
    "DELETE FROM aboutusenterprise WHERE id = ?",
    [id],
    callback
  );
};