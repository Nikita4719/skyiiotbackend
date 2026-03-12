const db = require("../config/db");

// CREATE CONTACT SETTINGS
exports.createContactSettings = (req, res) => {

    const { map_url } = req.body;
    const bg_image = req.file ? req.file.filename : null;

    if (!map_url || !bg_image) {
        return res.status(400).json({ message: "Map URL and BG Image required" });
    }

    const sql = "INSERT INTO contact_settings (map_url, bg_image) VALUES (?, ?)";

    db.query(sql, [map_url, bg_image], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json({ message: "Contact settings created successfully" });

    });

};



// GET CONTACT SETTINGS
exports.getContactSettings = (req, res) => {

    const sql = "SELECT * FROM contact_settings LIMIT 1";

    db.query(sql, (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};



// UPDATE CONTACT SETTINGS
exports.updateContactSettings = (req, res) => {

    const { id } = req.params;
    const { map_url } = req.body;
    const bg_image = req.file ? req.file.filename : null;

    let sql = "UPDATE contact_settings SET map_url=?";
    let values = [map_url];

    if (bg_image) {
        sql += ", bg_image=?";
        values.push(bg_image);
    }

    sql += " WHERE id=?";
    values.push(id);

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json({ message: "Contact settings updated successfully" });

    });

};

// DELETE CONTACT SETTINGS
exports.deleteContactSettings = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM contact_settings WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({ message: "Contact settings deleted successfully" });

  });

};
// exports.getSingleContactSettings = (req, res) => {

// const id = req.params.id;

// const sql = "SELECT * FROM contact_settings WHERE id = ?";

// db.query(sql,[id],(err,result)=>{

// if(err){
// return res.status(500).json(err);
// }

// res.json(result[0]);

// });

// };