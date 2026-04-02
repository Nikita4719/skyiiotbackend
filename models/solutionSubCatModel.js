const db = require("../config/db");

const SolutionSubCat = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO solution_sub_categories
      (solutionCatId, para1, para2, image2)
      VALUES (?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        data.solutionCatId,
        data.para1,
        data.para2,
        data.image2
      ],
      callback
    );
  },

  getAll: (callback) => {
    const sql = `
      SELECT 
        ssc.id,
        ssc.solutionCatId,
        ssc.para1,
        ssc.para2,
        ssc.image2,
        sc.title,
        sc.image
      FROM solution_sub_categories ssc
      JOIN solution_cat sc
        ON ssc.solutionCatId = sc.id
      ORDER BY ssc.id DESC
    `;
    db.query(sql, callback);
  },

  getOne: (id, callback) => {
    db.query(
      "SELECT * FROM solution_sub_categories WHERE id = ?",
      [id],
      callback
    );
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE solution_sub_categories 
      SET solutionCatId = ?, para1 = ?, para2 = ?, image2 = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        data.solutionCatId,
        data.para1,
        data.para2,
        data.image2,
        id
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query(
      "DELETE FROM solution_sub_categories WHERE id = ?",
      [id],
      callback
    );
  }
};

module.exports = SolutionSubCat;