const db = require("../config/db");

exports.getAll = (callback) => {
    db.query("SELECT * FROM contact_messages ORDER BY id DESC", callback);
};

exports.getById = (id, callback) => {
    db.query(
        "SELECT * FROM contact_messages WHERE id = ?",
        [id],
        callback
    );
};

exports.create = (data, callback) => {
    db.query(
        `INSERT INTO contact_messages 
         (first_name, last_name, email, phone, message) 
         VALUES (?, ?, ?, ?, ?)`,
        [
            data.first_name,
            data.last_name,
            data.email,
            data.phone,
            data.message
        ],
        callback
    );
};
exports.update = (id, data, callback) => {
    db.query(
        `UPDATE contact_messages 
        SET first_name=?, last_name=?, email=?, phone=?, message=? 
        WHERE id=?`,
        [
            data.first_name,
            data.last_name,
            data.email,
            data.phone,
            data.message,
            id
        ],
        callback
    );
};

exports.delete = (id, callback) => {
    db.query("DELETE FROM contact_messages WHERE id=?", [id], callback);
};