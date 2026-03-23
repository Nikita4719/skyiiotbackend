const prisma = require("../config/prisma");


//READ
exports.getMessages = async (req, res) => {
    try {
        const data = await prisma.contact_messages.findMany({
            orderBy: { id: "desc" },
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch messages" });
    }
};

//EDIT
exports.getMessageById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const data = await prisma.contact_messages.findUnique({
            where: { id },
        });

        if (!data) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch message" });
    }
};

//CREATE
exports.createMessage = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, message } = req.body;


        if (!first_name || !last_name || !email || !message) {
            return res.status(400).json({
                message: "First Name, Last Name, Email and Message are required",
            });
        }

        const created = await prisma.contact_messages.create({
            data: {
                first_name,
                last_name,
                email,
                phone: phone ?? null,
                message,
            },
        });

        res.status(201).json({
            message: "Message created successfully",
            data: created,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create message",
        });
    }
};

//UPDATE
exports.updateMessage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existing = await prisma.contact_messages.findUnique({
            where: { id },
        });

        if (!existing) {
            return res.status(404).json({ message: "Message not found" });
        }

        const updated = await prisma.contact_messages.update({
            where: { id },
            data: {
                first_name:
                    req.body.first_name !== undefined
                        ? req.body.first_name
                        : existing.first_name,
                last_name:
                    req.body.last_name !== undefined
                        ? req.body.last_name
                        : existing.last_name,
                email:
                    req.body.email !== undefined
                        ? req.body.email
                        : existing.email,
                phone:
                    req.body.phone !== undefined
                        ? req.body.phone
                        : existing.phone,
                message:
                    req.body.message !== undefined
                        ? req.body.message
                        : existing.message,
            },
        });

        res.json({
            message: "Message updated successfully",
            data: updated,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update message",
        });
    }
};

//DELETE
exports.deleteMessage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existing = await prisma.contact_messages.findUnique({
            where: { id },
        });

        if (!existing) {
            return res.status(404).json({ message: "Message not found" });
        }

        await prisma.contact_messages.delete({
            where: { id },
        });

        res.json({ message: "Message deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete message",
        });
    }
};