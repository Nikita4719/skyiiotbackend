const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

//HELPER DELETE FILE
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

//READ
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.image_button_section.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//EDIT
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.image_button_section.findUnique({
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

//CREATE
exports.create = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;

    if (!heading) {
      return res.status(400).json({ message: "Heading is required" });
    }

    const imagePath = req.files?.image
      ? `uploads/${req.files.image[0].filename}`
      : null;

    const bgImagePath = req.files?.bgimage
      ? `uploads/${req.files.bgimage[0].filename}`
      : null;

    const created = await prisma.image_button_section.create({
      data: {
        heading,
        paragraph,
        image: imagePath,
        bgimage: bgImagePath, // ✅ NEW
      },
    });

    res.status(201).json({ message: "Created", data: created });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.image_button_section.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Not found" });

    let imagePath = existing.image;
    let bgImagePath = existing.bgimage;

    // IMAGE
    if (req.files?.image) {
      if (existing.image) deleteFile(existing.image);
      imagePath = `uploads/${req.files.image[0].filename}`;
    }

    // BG IMAGE ✅
    if (req.files?.bgimage) {
      if (existing.bgimage) deleteFile(existing.bgimage);
      bgImagePath = `uploads/${req.files.bgimage[0].filename}`;
    }

    const updated = await prisma.image_button_section.update({
      where: { id },
      data: {
        heading: req.body.heading ?? existing.heading,
        paragraph: req.body.paragraph ?? existing.paragraph,
        image: imagePath,
        bgimage: bgImagePath, // ✅ NEW
      },
    });

    res.json({ message: "Updated", data: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.image_button_section.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Not found" });

    if (existing.image) {
      deleteFile(existing.image);
    }

    if (existing.bgimage) {
  deleteFile(existing.bgimage); 
    }

    await prisma.image_button_section.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};