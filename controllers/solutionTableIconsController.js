const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const getPath = (files, key, existing = null) => {
    return files[key] && files[key].length > 0
        ? `uploads/${files[key][0].filename}`
        : existing;
};

// DELETE FILE FUNCTION
const deleteFile = (filePath) => {
    if (!filePath) return;

    const fullPath = path.join(__dirname, "..", filePath);

    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};


// GET ALL
exports.getAll = async (req, res) => {
    try {
        const data = await prisma.solution_table_icons.findMany({
            orderBy: { id: "desc" },
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ONE
exports.getOne = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const data = await prisma.solution_table_icons.findUnique({
            where: { id },
        });

        if (!data) return res.status(404).json({ message: "Not found" });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// CREATE
exports.create = async (req, res) => {
    try {
        const files = req.files || {};

        const data = {
            title: req.body.title || "",
        };

        for (let i = 1; i <= 10; i++) {
            data[`icon${i}`] = getPath(files, `icon${i}`);
        }

        const created = await prisma.solution_table_icons.create({ data });

        res.json({ message: "Created", data: created });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE  (DELETE OLD FILE)
exports.update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const files = req.files || {};

        const existing = await prisma.solution_table_icons.findUnique({
            where: { id },
        });

        if (!existing) return res.status(404).json({ message: "Not found" });

        const data = {
            title: req.body.title ?? existing.title,
        };

        for (let i = 1; i <= 10; i++) {
            const key = `icon${i}`;

            if (files[key] && files[key][0]) {
                // DELETE OLD FILE
                deleteFile(existing[key]);

                // SAVE NEW
                data[key] = `uploads/${files[key][0].filename}`;
            } else {
                data[key] = existing[key];
            }
        }

        const updated = await prisma.solution_table_icons.update({
            where: { id },
            data,
        });

        res.json({ message: "Updated", data: updated });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE  (DELETE ALL FILES)
exports.remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const existing = await prisma.solution_table_icons.findUnique({
            where: { id },
        });

        if (!existing) return res.status(404).json({ message: "Not found" });

        // DELETE ALL IMAGES
        for (let i = 1; i <= 10; i++) {
            deleteFile(existing[`icon${i}`]);
        }

        await prisma.solution_table_icons.delete({
            where: { id },
        });

        res.json({ message: "Deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};