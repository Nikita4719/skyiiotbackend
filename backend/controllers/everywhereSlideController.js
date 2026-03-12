const prisma = require("../config/prisma");

/* =============================== */
/* HELPER: STRIP HTML */
/* =============================== */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

/* =============================== */
/* HELPER: BUILD FULL IMAGE URL */
/* =============================== */
const buildImagePath = (req, file, existingImage = null) => {
  if (file) {
    return `uploads/${file.filename}`;
  }
  return existingImage;
};

/* =============================== */
/* CREATE */
/* =============================== */
exports.create = async (req, res) => {
  try {
    const file = req.file;

    const data = {
      heading: stripHtml(req.body.heading) ?? null,
      paragraph: stripHtml(req.body.paragraph) ?? null,
      image: buildImagePath(req, file),
    };

    const created = await prisma.everywhere_slide.create({ data });

    res.status(201).json({
      message: "Created successfully",
      data: created,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

/* =============================== */
/* GET ALL */
/* =============================== */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.everywhere_slide.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* =============================== */
/* GET BY ID */
/* =============================== */
exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.everywhere_slide.findUnique({
      where: { id },
    });

    if (!record)
      return res.status(404).json({ message: "Record not found" });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* =============================== */
/* UPDATE */
/* =============================== */
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const file = req.file;

    const existing = await prisma.everywhere_slide.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Record not found" });

    const updatedData = {
      heading: req.body.heading
        ? stripHtml(req.body.heading)
        : existing.heading,

      paragraph: req.body.paragraph
        ? stripHtml(req.body.paragraph)
        : existing.paragraph,

      image: buildImagePath(req, file, existing.image),
    };

    const updated = await prisma.everywhere_slide.update({
      where: { id },
      data: updatedData,
    });

    res.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

/* =============================== */
/* DELETE */
/* =============================== */
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.everywhere_slide.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Record not found" });

    await prisma.everywhere_slide.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};