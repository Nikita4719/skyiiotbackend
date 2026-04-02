const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

//BUILD IMAGE PATH
const buildImagePath = (file, existing = null) => {
  if (file && file.filename) {
    return "uploads/" + file.filename;
  }
  return existing;
};

//DELETE IMAGE
const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "../", imagePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

//READ
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.slides.findMany({
      orderBy: { id: "desc" },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch slides" });
  }
};

//EDIT
exports.getOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const data = await prisma.slides.findUnique({
      where: { id },
    });

    if (!data) {
      return res.status(404).json({ message: "Slide not found" });
    }

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch slide" });
  }
};

//CREATE
exports.create = async (req, res) => {
  try {
    const { title } = req.body;

    const media = buildImagePath(req.file);

    const created = await prisma.slides.create({
      data: {
        title: title ?? null,
        media,
      },
    });

    res.status(201).json({
      message: "Slide created successfully",
      data: created,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create slide" });
  }
};

//UPDATE
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const existing = await prisma.slides.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Slide not found" });
    }

    let media = existing.media;

    if (req.file) {
      deleteImage(existing.media);
      media = buildImagePath(req.file);
    }

    const updated = await prisma.slides.update({
      where: { id },
      data: {
        title:
          req.body.title !== undefined
            ? req.body.title
            : existing.title,
        media,
      },
    });

    res.json({
      message: "Slide updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update slide" });
  }
};

//DELETE
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const existing = await prisma.slides.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Slide not found" });
    }

    deleteImage(existing.media);

    await prisma.slides.delete({
      where: { id },
    });

    res.json({
      message: "Slide deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete slide" });
  }
};