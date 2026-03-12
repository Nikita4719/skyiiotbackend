const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query(
    "SELECT * FROM ai_powered ORDER BY id DESC",
    callback
  );
};

// Get one
exports.getOne = (id, callback) => {
  db.query(
    "SELECT * FROM ai_powered WHERE id = ?",
    [id],
    callback
  );
};

// Create
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO ai_powered
    (heading1, heading2, heading3, paragraph1, paragraph2, media)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.heading1,
      data.heading2,
      data.heading3,
      data.paragraph1,
      data.paragraph2,
      data.media,
    ],
    callback
  );
};

// Update (No nested query needed)
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE ai_powered
    SET
      heading1 = ?,
      heading2 = ?,
      heading3 = ?,
      paragraph1 = ?,
      paragraph2 = ?,
      media = COALESCE(?, media)
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      data.heading1,
      data.heading2,
      data.heading3,
      data.paragraph1,
      data.paragraph2,
      data.media,
      id,
    ],
    callback
  );
};

// Delete
exports.remove = (id, callback) => {
  db.query(
    "DELETE FROM ai_powered WHERE id = ?",
    [id],
    callback
  );
};