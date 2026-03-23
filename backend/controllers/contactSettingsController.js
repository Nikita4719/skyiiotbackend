const prisma = require("../config/prisma");

//CREATE
exports.createContactSettings = async (req, res) => {
    try {
        const { map_url } = req.body;
        const bg_image = req.file ? req.file.filename : null;

        if (!map_url || !bg_image) {
            return res
                .status(400)
                .json({ message: "Map URL and BG Image required" });
        }


        const existing = await prisma.contactsettings.findFirst();

        if (existing) {
            return res
                .status(400)
                .json({ message: "Only one record allowed" });
        }

        const created = await prisma.contactsettings.create({
            data: {
                map_url,
                bg_image,
            },
        });

        res.status(201).json({
            message: "Created successfully",
            data: created,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create contact settings" });
    }
};


//READ
exports.getContactSettings = async (req, res) => {
    try {
        const data = await prisma.contactsettings.findMany({
            orderBy: { id: "desc" },
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch contact settings" });
    }
};


//EDIT
exports.getSingleContactSettings = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const data = await prisma.contactsettings.findUnique({
            where: { id },
        });

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch data" });
    }
};


//UPDATE
exports.updateContactSettings = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { map_url } = req.body;
        const bg_image = req.file ? req.file.filename : null;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existing = await prisma.contactsettings.findUnique({
            where: { id },
        });

        if (!existing) {
            return res.status(404).json({ message: "Data not found" });
        }

        const updated = await prisma.contactsettings.update({
            where: { id },
            data: {
                map_url:
                    map_url !== undefined ? map_url : existing.map_url,
                bg_image: bg_image ? bg_image : existing.bg_image,
            },
        });

        res.json({
            message: "Contact settings updated successfully",
            data: updated,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update contact settings" });
    }
};


//DELETE
exports.deleteContactSettings = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existing = await prisma.contactsettings.findUnique({
            where: { id },
        });

        if (!existing) {
            return res.status(404).json({ message: "Data not found" });
        }

        await prisma.contactsettings.delete({
            where: { id },
        });

        res.json({
            message: "Contact settings deleted successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete contact settings" });
    }
};