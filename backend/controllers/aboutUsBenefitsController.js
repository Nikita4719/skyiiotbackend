const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* DELETE IMAGE */
const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "../", imagePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = {};

    // ✅ FIX: stripHtml removed
    for (let i = 1; i <= 8; i++) {
      data[`heading${i}`] = req.body[`heading${i}`] ?? null;
    }

    for (let i = 1; i <= 4; i++) {
      data[`paragraph${i}`] = req.body[`paragraph${i}`] ?? null;
    }

    data.images = req.files
      ? req.files.map(file => "uploads/" + file.filename)
      : [];

    const created = await prisma.aboutusbenefits.create({ data });

    res.status(201).json({
      message: "About Us Benefits created successfully",
      data: created
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create About Us Benefits"
    });
  }
};

/* GET ALL */
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.aboutusbenefits.findMany({
      orderBy: { id: "desc" }
    });

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch About Us Benefits"
    });
  }
};

/* GET ONE */
exports.getOne = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  try {
    const data = await prisma.aboutusbenefits.findUnique({
      where: { id }
    });

    if (!data)
      return res.status(404).json({
        message: "About Us Benefits not found"
      });

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch About Us Benefits"
    });
  }
};

/* UPDATE */
exports.update = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  try {
    const existing = await prisma.aboutusbenefits.findUnique({
      where: { id }
    });

    if (!existing)
      return res.status(404).json({
        message: "About Us Benefits not found"
      });

    const updatedData = {};

    // ✅ FIX: stripHtml removed
    for (let i = 1; i <= 8; i++) {
      updatedData[`heading${i}`] =
        req.body[`heading${i}`] !== undefined
          ? req.body[`heading${i}`]
          : existing[`heading${i}`];
    }

    for (let i = 1; i <= 4; i++) {
      updatedData[`paragraph${i}`] =
        req.body[`paragraph${i}`] !== undefined
          ? req.body[`paragraph${i}`]
          : existing[`paragraph${i}`];
    }

    let images = existing.images || [];

    if (req.files && req.files.length > 0) {

      // delete old images
      if (images.length > 0) {
        images.forEach(deleteImage);
      }

      images = req.files.map(file => "uploads/" + file.filename);
    }

    updatedData.images = images;

    const updated = await prisma.aboutusbenefits.update({
      where: { id },
      data: updatedData
    });

    res.json({
      message: "About Us Benefits updated successfully",
      data: updated
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update About Us Benefits"
    });
  }
};

/* DELETE */
exports.remove = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  try {
    const existing = await prisma.aboutusbenefits.findUnique({
      where: { id }
    });

    if (!existing)
      return res.status(404).json({
        message: "About Us Benefits not found"
      });

    if (existing.images) {
      existing.images.forEach(deleteImage);
    }

    await prisma.aboutusbenefits.delete({
      where: { id }
    });

    res.json({
      message: "About Us Benefits deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete About Us Benefits"
    });
  }
};