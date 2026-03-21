const db = require("../config/db");

// CREATE
exports.createContactSettings = (req, res) => {
    const { map_url } = req.body;
    const bg_image = req.file ? req.file.filename : null;

    if (!map_url || !bg_image) {
        return res.status(400).json({ message: "Map URL and BG Image required" });
    }

    // ✅ check existing
    db.query("SELECT * FROM contactsettings", (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ message: "Only one record allowed" });
        }

        const sql = "INSERT INTO contactsettings (map_url, bg_image) VALUES (?, ?)";

        db.query(sql, [map_url, bg_image], (err, result) => {
            if (err) return res.status(500).json(err);

            res.json({ message: "Created successfully" });
        });
    });
};

// GET ALL
exports.getContactSettings = (req, res) => {
    const sql = "SELECT * FROM contactsettings ORDER BY id DESC";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json(result);
    });
};

// ✅ GET SINGLE (FIXED FOR FRONTEND)
exports.getSingleContactSettings = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM contactsettings WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.json(result[0]); // ✅ IMPORTANT (frontend expects object)
    });
};

// UPDATE
exports.updateContactSettings = (req, res) => {
    const { id } = req.params;
    const { map_url } = req.body;
    const bg_image = req.file ? req.file.filename : null;

    let sql = "UPDATE contactsettings SET map_url=?";
    let values = [map_url];

    if (bg_image) {
        sql += ", bg_image=?";
        values.push(bg_image);
    }

    sql += " WHERE id=?";
    values.push(id);

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Contact settings updated successfully" });
    });
};

// DELETE
exports.deleteContactSettings = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM contactsettings WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Contact settings deleted successfully" });
    });
};