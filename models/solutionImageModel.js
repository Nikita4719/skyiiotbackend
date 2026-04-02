const db = require("../config/db");

const SolutionImage = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO solution_images 
      (title, image1, image2, image3, image4)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [data.title, data.image1, data.image2, data.image3, data.image4],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM solution_images ORDER BY id DESC", callback);
  },

  getOne: (id, callback) => {
    db.query("SELECT * FROM solution_images WHERE id = ?", [id], callback);
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE solution_images 
      SET title=?, image1=?, image2=?, image3=?, image4=? 
      WHERE id=?
    `;

    db.query(
      sql,
      [data.title, data.image1, data.image2, data.image3, data.image4, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM solution_images WHERE id = ?", [id], callback);
  },
};

module.exports = SolutionImage;