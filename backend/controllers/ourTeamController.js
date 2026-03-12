const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* ======================= */
/* BASE DIRECTORY */
/* ======================= */
const ROOT_DIR = path.join(__dirname, "..");

/* ======================= */
/* NORMALIZE PATH */
/* ======================= */
const normalizePath = (filePath) => {
  if (!filePath) return null;
  return filePath.replace(/\\/g, "/"); // Fix Windows paths
};

/* ======================= */
/* STRIP HTML */
/* ======================= */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;

  const clean = value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length ? clean : null;
};

/* ======================= */
/* DELETE FILE */
/* ======================= */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  const fullPath = path.join(ROOT_DIR, filePathFromDb);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

/* ================= GET ALL ================= */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.our_team.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* ================= GET ONE ================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.our_team.findUnique({
      where: { id },
    });

    if (!record) return res.status(404).json({ message: "Not found" });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* ================= CREATE ================= */
exports.create = async (req, res) => {
  try {
    const file = req.files?.image?.[0];

    const data = {
      heading: stripHtml(req.body.heading),
      paragraph: stripHtml(req.body.paragraph),
      image: file ? normalizePath(file.path) : null, // ✅ FIXED
    };

    const created = await prisma.our_team.create({ data });

    res.status(201).json({
      message: "Created successfully",
      id: created.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Create failed" });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.our_team.findUnique({
      where: { id },
    });

    if (!existing) return res.status(404).json({ message: "Not found" });

    const file = req.files?.image?.[0];

    let updatedData = {
      heading: req.body.heading
        ? stripHtml(req.body.heading)
        : existing.heading,
      paragraph: req.body.paragraph
        ? stripHtml(req.body.paragraph)
        : existing.paragraph,
      image: existing.image,
    };

    if (file) {
      // delete old image
      deleteFile(existing.image);

      // save new image
      updatedData.image = normalizePath(file.path);
    }

    const updated = await prisma.our_team.update({
      where: { id },
      data: updatedData,
    });

    res.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
};

/* ================= DELETE ================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.our_team.findUnique({
      where: { id },
    });

    if (!existing) return res.status(404).json({ message: "Not found" });

    // delete image from disk
    deleteFile(existing.image);

    await prisma.our_team.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete failed" });
  }
};