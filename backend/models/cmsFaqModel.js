const db = require("../config/db");

// Get all with JOIN
exports.getAll = (callback) => {
  const sql = `
    SELECT 
      c.id,
      c.para,
      f.title AS faq_title,
      f.id AS faq_id
    FROM cms_faqs c
    JOIN faqs f ON c.faq_id = f.id
    ORDER BY c.id DESC
  `;

  db.query(sql, callback);
};

// Get one
exports.getOne = (id, callback) => {
  db.query(
    "SELECT * FROM cms_faqs WHERE id = ?",
    [id],
    callback
  );
};

// Create
exports.create = (data, callback) => {
  db.query(
    "INSERT INTO cms_faqs (faq_id, para) VALUES (?, ?)",
    [data.faq_id, data.para],
    callback
  );
};

// Update
exports.update = (id, data, callback) => {
  db.query(
    "UPDATE cms_faqs SET faq_id = ?, para = ? WHERE id = ?",
    [data.faq_id, data.para, id],
    callback
  );
};

// Delete
exports.remove = (id, callback) => {
  db.query(
    "DELETE FROM cms_faqs WHERE id = ?",
    [id],
    callback
  );
};