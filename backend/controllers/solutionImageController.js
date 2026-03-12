// controllers/solutionImageController.js

const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* ======================= */
/* ROOT DIRECTORY */
/* ======================= */
const ROOT_DIR = path.join(__dirname, "..");

/* ======================= */
/* NORMALIZE PATH */
/* ======================= */
const normalizePath = (filePath) => {
  if (!filePath) return null;
  return filePath.replace(/\\/g, "/"); // Windows fix
};

/* ======================= */
/* DELETE FILE */
/* ======================= */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  const fullPath = path.join(ROOT_DIR, filePathFromDb);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error("File delete error:", err.message);
    }
  }
};

/* ================= CREATE ================= */
exports.createSolutionImage = async (req, res) => {
  try {
    const { title } = req.body;
    const files = req.files || {};

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newRecord = await prisma.solution_images.create({
      data: {
        title,
        image1: files.image1?.[0]
          ? normalizePath(files.image1[0].path)
          : null,
        image2: files.image2?.[0]
          ? normalizePath(files.image2[0].path)
          : null,
        image3: files.image3?.[0]
          ? normalizePath(files.image3[0].path)
          : null,
        image4: files.image4?.[0]
          ? normalizePath(files.image4[0].path)
          : null,
      },
    });

    res.status(201).json({
      id: newRecord.id,
      message: "Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET ALL ================= */
exports.getAllSolutionImages = async (req, res) => {
  try {
    const records = await prisma.solution_images.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET SINGLE ================= */
exports.getSingleSolutionImage = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.solution_images.findUnique({
      where: { id },
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE ================= */
exports.updateSolutionImage = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const { title } = req.body;
    const files = req.files || {};

    const existing = await prisma.solution_images.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    let image1 = existing.image1;
    let image2 = existing.image2;
    let image3 = existing.image3;
    let image4 = existing.image4;

    if (files.image1?.[0]) {
      deleteFile(existing.image1);
      image1 = normalizePath(files.image1[0].path);
    }

    if (files.image2?.[0]) {
      deleteFile(existing.image2);
      image2 = normalizePath(files.image2[0].path);
    }

    if (files.image3?.[0]) {
      deleteFile(existing.image3);
      image3 = normalizePath(files.image3[0].path);
    }

    if (files.image4?.[0]) {
      deleteFile(existing.image4);
      image4 = normalizePath(files.image4[0].path);
    }

    await prisma.solution_images.update({
      where: { id },
      data: {
        title: title || existing.title,
        image1,
        image2,
        image3,
        image4,
      },
    });

    res.json({ message: "Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE ================= */
exports.deleteSolutionImage = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.solution_images.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Delete all images from disk
    [existing.image1, existing.image2, existing.image3, existing.image4]
      .filter(Boolean)
      .forEach((imgPath) => deleteFile(imgPath));

    await prisma.solution_images.delete({
      where: { id },
    });

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};