const prisma = require("../config/prisma");
const { update } = require("./aboutUsEnterpriseController");


const buildFilePath = (fileArray, existing = null) => {
    if (fileArray && fileArray.length > 0) {
        return `uploads/${fileArray[0].filename}`;
    }
    return existing;
};

const getPath = (files, key, existing = null) => {
    return files[key] && files[key].length > 0
        ? `uploads/${files[key][0].filename}`
        : existing;
};


// GET ALL
exports.getAll = async (req, res) => {
    const data = await prisma.solution_card.findMany({
        include: {
            solution_cat: true,
        },
        orderBy: { id: "desc" },
    });

    res.json(data);
};


// GET ONE
exports.getOne = async (req, res) => {
    const id = Number(req.params.id);
    const data = await prisma.solution_card.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
};

//CREATE
exports.create = async (req, res) => {
    try {
        const files = req.files || {};

        const data = {
            solutionCatId: Number(req.body.solutionCatId) || null,

            svg1: getPath(files, "svg1"),
            svg2: getPath(files, "svg2"),
            svg3: getPath(files, "svg3"),
            svg4: getPath(files, "svg4"),
            svg5: getPath(files, "svg5"),
            svg6: getPath(files, "svg6"),

            paragraph1: req.body.paragraph1 || "",
            paragraph2: req.body.paragraph2 || "",
            paragraph3: req.body.paragraph3 || "",
            paragraph4: req.body.paragraph4 || "",
            paragraph5: req.body.paragraph5 || "",
            paragraph6: req.body.paragraph6 || "",
        };

        const created = await prisma.solution_card.create({ data });

        res.json({ message: "Created", data: created });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// UPDATE

exports.update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const files = req.files || {};

        const existing = await prisma.solution_card.findUnique({ where: { id } });

        const data = {
            solutionCatId: Number(req.body.solutionCatId) || existing.solutionCatId,

            svg1: getPath(files, "svg1", existing.svg1),
            svg2: getPath(files, "svg2", existing.svg2),
            svg3: getPath(files, "svg3", existing.svg3),
            svg4: getPath(files, "svg4", existing.svg4),
            svg5: getPath(files, "svg5", existing.svg5),
            svg6: getPath(files, "svg6", existing.svg6),

            paragraph1: req.body.paragraph1 ?? existing.paragraph1,
            paragraph2: req.body.paragraph2 ?? existing.paragraph2,
            paragraph3: req.body.paragraph3 ?? existing.paragraph3,
            paragraph4: req.body.paragraph4 ?? existing.paragraph4,
            paragraph5: req.body.paragraph5 ?? existing.paragraph5,
            paragraph6: req.body.paragraph6 ?? existing.paragraph6,
        };

        const updated = await prisma.solution_card.update({
            where: { id },
            data,
        });

        res.json({ message: "Updated", data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// DELETE

exports.remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.solution_card.delete({ where: { id } });
    res.json({ message: "Deleted" });
};