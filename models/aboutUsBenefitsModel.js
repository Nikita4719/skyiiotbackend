const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query(
    "SELECT * FROM aboutusbenefits ORDER BY id DESC",
    callback
  );
};

// Get one
exports.getOne = (id, callback) => {
  db.query(
    "SELECT * FROM aboutusbenefits WHERE id = ?",
    [id],
    callback
  );
};

// Create
exports.create = (data, callback) => {
  const query = `
    INSERT INTO aboutusbenefits 
    (${[...Array(8)].map((_, i) => `heading${i + 1}`).join(",")},
     ${[...Array(4)].map((_, i) => `paragraph${i + 1}`).join(",")},
     image1, image2)
    VALUES (${Array(14).fill("?").join(",")})
  `;

  const values = [
    ...[...Array(8)].map((_, i) => data[`heading${i + 1}`] || null),
    ...[...Array(4)].map((_, i) => data[`paragraph${i + 1}`] || null),
    data.image1,
    data.image2,
  ];

  db.query(query, values, callback);
};

// Update
exports.update = (id, data, callback) => {
  let fields = [];
  let values = [];

  for (let i = 1; i <= 8; i++) {
    fields.push(`heading${i}=?`);
    values.push(data[`heading${i}`] || null);
  }

  for (let i = 1; i <= 4; i++) {
    fields.push(`paragraph${i}=?`);
    values.push(data[`paragraph${i}`] || null);
  }

  fields.push(`image1=COALESCE(?, image1)`);
  fields.push(`image2=COALESCE(?, image2)`);

  values.push(data.image1 || null);
  values.push(data.image2 || null);
  values.push(id);

  db.query(
    `UPDATE aboutusbenefits SET ${fields.join(",")} WHERE id=?`,
    values,
    callback
  );
};

// Delete
exports.remove = (id, callback) => {
  db.query(
    "DELETE FROM aboutusbenefits WHERE id = ?",
    [id],
    callback
  );
};