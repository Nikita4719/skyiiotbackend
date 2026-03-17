// controllers/whatSectionController.js

const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* ======================= */
/* HELPER: Delete Image */
/* ======================= */
const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "..", imagePath);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error("Error deleting file:", err.message);
    }
  }
};

/* ======================= */
/* GET ALL */
/* ======================= */
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.what_section.findMany({
      orderBy: { id: "desc" },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ======================= */
/* GET ONE */
/* ======================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const data = await prisma.what_section.findUnique({
      where: { id },
    });

    if (!data)
      return res.status(404).json({ message: "Record not found" });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ======================= */
/* CREATE */
/* ======================= */
exports.create = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const imagePath = req.file
      ? `uploads/${req.file.filename}`
      : null;

    const created = await prisma.what_section.create({
      data: {
        title: req.body.title, // ✅ FIX
        description: req.body.description ?? null, // ✅ FIX
        image: imagePath,
      },
    });

    res.status(201).json({
      message: "Created Successfully",
      data: created,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ======================= */
/* UPDATE */
/* ======================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const oldData = await prisma.what_section.findUnique({
      where: { id },
    });

    if (!oldData)
      return res.status(404).json({ message: "Record not found" });

    let imagePath = oldData.image;

    // If new file uploaded
    if (req.file) {
      if (oldData.image) {
        deleteImage(oldData.image);
      }

      imagePath = `uploads/${req.file.filename}`;
    }

    const updated = await prisma.what_section.update({
      where: { id },
      data: {
        title:
          req.body.title !== undefined
            ? req.body.title // ✅ FIX
            : oldData.title,

        description:
          req.body.description !== undefined
            ? req.body.description // ✅ FIX
            : oldData.description,

        image: imagePath,
      },
    });

    res.json({
      message: "Updated Successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ======================= */
/* DELETE */
/* ======================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const oldData = await prisma.what_section.findUnique({
      where: { id },
    });

    if (!oldData)
      return res.status(404).json({ message: "Record not found" });

    if (oldData.image) {
      deleteImage(oldData.image);
    }

    await prisma.what_section.delete({
      where: { id },
    });

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};