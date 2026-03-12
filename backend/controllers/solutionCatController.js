const db = require("../config/db");

// CREATE
exports.createSolutionCat = (req, res) => {
  const { title } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !image) {
    return res.status(400).json({ message: "Title and Image required" });
  }

  const sql = "INSERT INTO solution_cat (title, image) VALUES (?, ?)";

  db.query(sql, [title, image], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      id: result.insertId,
      title,
      image,
    });
  });
};

// GET ALL
exports.getAllSolutionCat = (req, res) => {
  const sql = `
    SELECT sc.id AS catId, sc.title AS catTitle, sc.image AS catImage,
           ssc.id AS subId, ssc.para1, ssc.para2, ssc.input1, ssc.input2, ssc.input3, ssc.input4, ssc.image2
    FROM solution_cat sc
    LEFT JOIN solution_sub_categories ssc
    ON sc.id = ssc.solutionCatId
    ORDER BY sc.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    const categories = [];
    results.forEach(row => {
      let cat = categories.find(c => c.id === row.catId);
      if (!cat) {
        cat = {
          id: row.catId,
          title: row.catTitle,
          image: row.catImage,
          subcategories: []
        };
        categories.push(cat);
      }

      if (row.subId) {
        cat.subcategories.push({
          id: row.subId,
          para1: row.para1,
          para2: row.para2,
          input1: row.input1,
          input2: row.input2,
          input3: row.input3,
          input4: row.input4,
          image2: row.image2
        });
      }
    });

    res.json(categories);
  });
};

// GET SINGLE
exports.getSingleSolutionCat = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM solution_cat WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// UPDATE
exports.updateSolutionCat = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const image = req.file ? req.file.filename : null;

  let sql;
  let values;

  if (image) {
    sql =
      "UPDATE solution_cat SET title = ?, image = ? WHERE id = ?";
    values = [title, image, id];
  } else {
    sql =
      "UPDATE solution_cat SET title = ? WHERE id = ?";
    values = [title, id];
  }

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated successfully" });
  });
};

// DELETE
exports.deleteSolutionCat = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM solution_cat WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted successfully" });
    }
  );
};
