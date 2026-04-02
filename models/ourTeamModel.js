// models/ourTeamModel.js
const db = require("../config/db");

// Get All
exports.getAll = (callback) => {
  db.query("SELECT * FROM our_team ORDER BY id DESC", callback);
};

// Get By ID
exports.getById = (id, callback) => {
  db.query("SELECT * FROM our_team WHERE id=?", [id], callback);
};

// Create
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO our_team
    (heading1, heading2, heading3, heading4,
     paragraph1, paragraph2, paragraph3,
     image1, image2, image3)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.heading1,
      data.heading2,
      data.heading3,
      data.heading4,
      data.paragraph1,
      data.paragraph2,
      data.paragraph3,
      data.image1,
      data.image2,
      data.image3,
    ],
    callback
  );
};

// Update
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE our_team
    SET heading1=?, heading2=?, heading3=?, heading4=?,
        paragraph1=?, paragraph2=?, paragraph3=?,
        image1=?, image2=?, image3=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      data.heading1,
      data.heading2,
      data.heading3,
      data.heading4,
      data.paragraph1,
      data.paragraph2,
      data.paragraph3,
      data.image1,
      data.image2,
      data.image3,
      id,
    ],
    callback
  );
};

// Delete
exports.delete = (id, callback) => {
  db.query("DELETE FROM our_team WHERE id=?", [id], callback);
};