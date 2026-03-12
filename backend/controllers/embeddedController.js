const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* =============================== */
/* HELPER: Strip HTML */
/* =============================== */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;

  const clean = value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length ? clean : null;
};

/* =============================== */
/* HELPER: Delete File */
/* =============================== */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  const fullPath = path.join(__dirname, "..", filePathFromDb);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error("Error deleting file:", err.message);
    }
  }
};

/* ================= GET ALL ================= */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.embedded.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET ONE ================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.embedded.findUnique({
      where: { id },
    });

    if (!record)
      return res.status(404).json({ message: "Not found" });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= CREATE ================= */
exports.create = async (req, res) => {
  try {
    const { heading, paragraph1, paragraph2 } = req.body;
    const files = req.files || {};

    const imagePath = (file) =>
      file ? `uploads/${file.filename}` : null;

    const created = await prisma.embedded.create({
      data: {
        heading: stripHtml(heading),
        paragraph1: stripHtml(paragraph1),
        paragraph2: stripHtml(paragraph2),

        image1: files.image1?.[0]
          ? imagePath(files.image1[0])
          : null,
        image2: files.image2?.[0]
          ? imagePath(files.image2[0])
          : null,
        image3: files.image3?.[0]
          ? imagePath(files.image3[0])
          : null,
        image4: files.image4?.[0]
          ? imagePath(files.image4[0])
          : null,
        video: files.video?.[0]
          ? imagePath(files.video[0])
          : null,
      },
    });

    res.status(201).json({
      message: "Created successfully",
      data: created,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.embedded.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Not found" });

    const files = req.files || {};

    const data = {
      heading:
        req.body.heading !== undefined
          ? stripHtml(req.body.heading)
          : existing.heading,

      paragraph1:
        req.body.paragraph1 !== undefined
          ? stripHtml(req.body.paragraph1)
          : existing.paragraph1,

      paragraph2:
        req.body.paragraph2 !== undefined
          ? stripHtml(req.body.paragraph2)
          : existing.paragraph2,
    };

    const handleFileUpdate = (fieldName) => {
      if (files[fieldName]?.[0]) {
        if (existing[fieldName]) {
          deleteFile(existing[fieldName]);
        }
        data[fieldName] = `uploads/${files[fieldName][0].filename}`;
      }
    };

    handleFileUpdate("image1");
    handleFileUpdate("image2");
    handleFileUpdate("image3");
    handleFileUpdate("image4");
    handleFileUpdate("video");

    const updated = await prisma.embedded.update({
      where: { id },
      data,
    });

    res.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE ================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.embedded.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Not found" });

    // Delete all associated files
    deleteFile(existing.image1);
    deleteFile(existing.image2);
    deleteFile(existing.image3);
    deleteFile(existing.image4);
    deleteFile(existing.video);

    await prisma.embedded.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};