const db = require("../config/db");

const SolutionCat = {
  create: (data, callback) => {
    const sql = "INSERT INTO solution_cat (title, image) VALUES (?, ?)";
    db.query(sql, [data.title, data.image], callback);
  },

  getAll: (callback) => {
    db.query("SELECT * FROM solution_cat ORDER BY id DESC", callback);
  },

  getOne: (id, callback) => {
    db.query("SELECT * FROM solution_cat WHERE id = ?", [id], callback);
  },

  update: (id, data, callback) => {
    const sql = "UPDATE solution_cat SET title = ?, image = ? WHERE id = ?";
    db.query(sql, [data.title, data.image, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM solution_cat WHERE id = ?", [id], callback);
  },
};

module.exports = SolutionCat;