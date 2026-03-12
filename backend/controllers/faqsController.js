// controllers/faqsController.js
const prisma = require("../config/prisma");
/* ================= GET ALL ================= */
exports.getAll = async (req, res) => {
  try {
    const faqs = await prisma.faqs.findMany({
      orderBy: { id: "desc" },
    });

    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* ================= GET ONE ================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const faq = await prisma.faqs.findUnique({
      where: { id },
    });

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* ================= CREATE ================= */
exports.create = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const created = await prisma.faqs.create({
      data: {
        title: title.trim(),
      },
    });

    res.status(201).json({
      message: "Created successfully",
      id: created.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create FAQ" });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const existing = await prisma.faqs.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await prisma.faqs.update({
      where: { id },
      data: {
        title: title.trim(),
      },
    });

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update FAQ" });
  }
};

/* ================= DELETE ================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.faqs.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await prisma.faqs.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
};

