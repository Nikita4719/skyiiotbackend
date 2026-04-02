const db = require("../config/db");

// GET ALL
exports.getAll = (callback) => {
  db.query(
    "SELECT * FROM what_section ORDER BY id DESC",
    callback
  );
};

// GET ONE
exports.getById = (id, callback) => {
  db.query(
    "SELECT * FROM what_section WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result[0]);
    }
  );
};

// CREATE
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO what_section
    (
      heading1, heading2, heading3, heading4, heading5, heading6,
      paragraph1, paragraph2, paragraph3, paragraph4, paragraph5,
      image1, image2, image3, image4, image5
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.heading1 || null,
    data.heading2 || null,
    data.heading3 || null,
    data.heading4 || null,
    data.heading5 || null,
    data.heading6 || null,
    data.paragraph1 || null,
    data.paragraph2 || null,
    data.paragraph3 || null,
    data.paragraph4 || null,
    data.paragraph5 || null,
    data.image1 || null,
    data.image2 || null,
    data.image3 || null,
    data.image4 || null,
    data.image5 || null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
};

// UPDATE
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE what_section SET
      heading1=?, heading2=?, heading3=?, heading4=?, heading5=?, heading6=?,
      paragraph1=?, paragraph2=?, paragraph3=?, paragraph4=?, paragraph5=?,
      image1=?, image2=?, image3=?, image4=?, image5=?
    WHERE id=?
  `;

  const values = [
    data.heading1 || null,
    data.heading2 || null,
    data.heading3 || null,
    data.heading4 || null,
    data.heading5 || null,
    data.heading6 || null,
    data.paragraph1 || null,
    data.paragraph2 || null,
    data.paragraph3 || null,
    data.paragraph4 || null,
    data.paragraph5 || null,
    data.image1 || null,
    data.image2 || null,
    data.image3 || null,
    data.image4 || null,
    data.image5 || null,
    id,
  ];

  db.query(sql, values, callback);
};

// DELETE
exports.remove = (id, callback) => {
  db.query(
    "DELETE FROM what_section WHERE id = ?",
    [id],
    callback
  );
};