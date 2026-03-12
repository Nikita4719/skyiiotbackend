const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query(
    "SELECT * FROM cloudsection ORDER BY id DESC",
    callback
  );
};

// Get one
exports.getOne = (id, callback) => {
  db.query(
    "SELECT * FROM cloudsection WHERE id = ?",
    [id],
    callback
  );
};

// Create
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO cloudsection
    (heading, paragraph1, paragraph2, image1, image2, image3, image4)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.heading,
      data.paragraph1,
      data.paragraph2,
      data.image1,
      data.image2,
      data.image3,
      data.image4,
    ],
    callback
  );
};

// Update (No nested query)
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE cloudsection
    SET
      heading = ?,
      paragraph1 = ?,
      paragraph2 = ?,
      image1 = COALESCE(?, image1),
      image2 = COALESCE(?, image2),
      image3 = COALESCE(?, image3),
      image4 = COALESCE(?, image4)
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      data.heading,
      data.paragraph1,
      data.paragraph2,
      data.image1,
      data.image2,
      data.image3,
      data.image4,
      id,
    ],
    callback
  );
};

// Delete
exports.remove = (id, callback) => {
  db.query(
    "DELETE FROM cloudsection WHERE id = ?",
    [id],
    callback
  );
};