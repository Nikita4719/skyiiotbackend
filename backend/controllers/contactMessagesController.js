const ContactMessage = require("../models/contactMessagesModel");
// const ContactMessage = require("../models/ContactMessage");

exports.getMessages = (req, res) => {
    ContactMessage.getAll((err, results) => {
        if (err) {
            console.error("GET ERROR:", err);
            return res.status(500).json({ error: "Failed to fetch messages" });
        }
        res.json(results);
    });
};

exports.getMessageById = (req, res) => {
    const id = req.params.id;

    ContactMessage.getById(id, (err, results) => {
        if (err) {
            console.error("GET BY ID ERROR:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json(results[0]);
    });
};


exports.createMessage = (req, res) => {
    console.log("Incoming Data:", req.body);

    const { first_name, last_name, email, phone, message } = req.body;

    // 🔎 Basic Validation
    if (!first_name || !last_name || !email || !message) {
        return res.status(400).json({
            error: "First Name, Last Name, Email and Message are required",
        });
    }
    ContactMessage.create(
        { first_name, last_name, email, phone, message },
        (err, result) => {
            if (err) {
                // console.error("CREATE ERROR:", err);
                console.error("CREATE ERROR:", err.sqlMessage || err);
                return res.status(500).json({
                    error: "Database error while creating message",
                });
            }

            res.status(201).json({
                message: " The Messages are added successfully",
            });
        }
    );
};

exports.updateMessage = (req, res) => {
    const { id } = req.params;

    ContactMessage.update(id, req.body, (err, result) => {
        if (err) {
            console.error("UPDATE ERROR:", err);
            return res.status(500).json({
                error: "Database error while updating message",
            });
        }

        res.json({ message: "The Messages are updated successfully" });
    });
};

exports.deleteMessage = (req, res) => {
    const { id } = req.params;

    ContactMessage.delete(id, (err, result) => {
        if (err) {
            console.error("DELETE ERROR:", err);
            return res.status(500).json({
                error: "Database error while deleting message",
            });
        }

        res.json({ message: "The Messages are deleted successfully" });
    });
};