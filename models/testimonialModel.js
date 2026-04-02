const db = require("../config/db");

const Testimonial = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO testimonials
      (heading, para1, para2, image1, image2, image3)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        data.heading,
        data.para1,
        data.para2,
        data.image1,
        data.image2,
        data.image3,
      ],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM testimonials ORDER BY id DESC", callback);
  },

  getOne: (id, callback) => {
    db.query("SELECT * FROM testimonials WHERE id = ?", [id], callback);
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE testimonials
      SET heading=?, para1=?, para2=?, image1=?, image2=?, image3=?
      WHERE id=?
    `;

    db.query(
      sql,
      [
        data.heading,
        data.para1,
        data.para2,
        data.image1,
        data.image2,
        data.image3,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM testimonials WHERE id=?", [id], callback);
  },
};

module.exports = Testimonial;