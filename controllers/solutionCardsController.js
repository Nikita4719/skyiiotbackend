const prisma = require("../config/prisma");

const getPath = (files, key, existing = null) => {
  return files[key] && files[key].length > 0
    ? `uploads/${files[key][0].filename}`
    : existing;
};

// ====================== GET ALL ======================
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.solution_cards.findMany({
      include: {
        solution_cat: true,
      },
      orderBy: { id: "desc" },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== GET ONE ======================
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await prisma.solution_cards.findUnique({
      where: { id },
    });

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== CREATE ======================
exports.create = async (req, res) => {
  try {
    const files = req.files || {};

    const solutionCatId = Number(req.body.solutionCatId);

    if (!solutionCatId) {
  const err = new Error("solutionCatId is required");
  err.statusCode = 400;
  throw err;
}

    const data = {
      solutionCatId,

      // SVG OPTIONAL 
      svg1: getPath(files, "svg1", null),
      svg2: getPath(files, "svg2", null),
      svg3: getPath(files, "svg3", null),
      svg4: getPath(files, "svg4", null),
      svg5: getPath(files, "svg5", null),
      svg6: getPath(files, "svg6", null),

      // ALL OPTIONAL 
      paragraph1: req.body.paragraph1 || "",
      paragraph2: req.body.paragraph2 || "",
      paragraph3: req.body.paragraph3 || "",
      paragraph4: req.body.paragraph4 || "",
      paragraph5: req.body.paragraph5 || "",
      paragraph6: req.body.paragraph6 || "",
    };

    const created = await prisma.solution_cards.create({
      data,
    });

    res.json({
      message: "Created successfully",
      data: created,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== UPDATE ======================
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const files = req.files || {};

    const existing = await prisma.solution_cards.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    const data = {
      solutionCatId:
        Number(req.body.solutionCatId) || existing.solutionCatId,

      // KEEP OLD IF NOT UPLOADED 
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

    const updated = await prisma.solution_cards.update({
      where: { id },
      data,
    });

    res.json({
      message: "Updated successfully",
      data: updated,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== DELETE ======================
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.solution_cards.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    await prisma.solution_cards.delete({
      where: { id },
    });

    res.json({
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
