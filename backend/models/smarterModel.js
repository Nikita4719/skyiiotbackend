const db = require("../config/db");

const Smarter = {
  getAll: (callback) => {
    db.query("SELECT * FROM smarter_section ORDER BY id DESC", callback);
  },

  getOne: (id, callback) => {
    db.query("SELECT * FROM smarter_section WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    const sql =
      "INSERT INTO smarter_section (heading, para, media, media_type) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [data.heading, data.para, data.media, data.media_type],
      callback
    );
  },

  update: (id, data, callback) => {
    const sql =
      "UPDATE smarter_section SET heading=?, para=?, media=?, media_type=? WHERE id=?";
    db.query(
      sql,
      [data.heading, data.para, data.media, data.media_type, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM smarter_section WHERE id=?", [id], callback);
  },
};

module.exports = Smarter;