const db = require("../config/db");

/* GET ALL */
exports.getAll = (req, res) => {
  db.query(
    "SELECT * FROM system_architecture ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/* GET BY ID */
exports.getById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM system_architecture WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

/* CREATE */
exports.create = (req, res) => {
  const { component, description } = req.body;

  db.query(
    "INSERT INTO system_architecture (component, description) VALUES (?, ?)",
    [component, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "System Architecture created successfully" });
    }
  );
};

/* UPDATE */
exports.update = (req, res) => {
  const { id } = req.params;
  const { component, description } = req.body;

  db.query(
    "UPDATE system_architecture SET component=?, description=? WHERE id=?",
    [component, description, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "System Architecture updated successfully" });
    }
  );
};

/* DELETE */
exports.remove = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM system_architecture WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted successfully" });
    }
  );
};