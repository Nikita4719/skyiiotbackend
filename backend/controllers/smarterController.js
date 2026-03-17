const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "../");

/* ================= DELETE FILE ================= */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  const fullPath = path.join(ROOT_DIR, filePathFromDb);

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
    const records = await prisma.smarter_section.findMany({
      orderBy: { id: "desc" },
    });

    // ✅ NO HTML STRIP
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
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.smarter_section.findUnique({
      where: { id },
    });

    if (!record) return res.status(404).json({ message: "Record not found" });

    // ✅ NO HTML STRIP
    res.json(record);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* ================= CREATE ================= */
exports.create = async (req, res) => {
  try {
    const heading = req.body.heading;
    const para = req.body.para;

    if (!heading || !para) {
      return res
        .status(400)
        .json({ message: "Heading and Paragraph are required" });
    }

    let media = null;
    let media_type = null;

    if (req.file) {
      media = `uploads/${req.file.filename}`;
      media_type = req.file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    await prisma.smarter_section.create({
      data: {
        // ✅ HTML preserved
        heading,
        para,
        media,
        media_type,
      },
    });

    res.status(201).json({ message: "Created Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.smarter_section.findUnique({
      where: { id },
    });

    if (!existing) return res.status(404).json({ message: "Record not found" });

    let media = existing.media;
    let media_type = existing.media_type;

    if (req.file) {
      deleteFile(existing.media);

      media = `uploads/${req.file.filename}`;
      media_type = req.file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    const heading = req.body.heading ?? existing.heading;
    const para = req.body.para ?? existing.para;

    await prisma.smarter_section.update({
      where: { id },
      data: {
        // ✅ HTML preserved
        heading,
        para,
        media,
        media_type,
      },
    });

    res.json({ message: "Updated Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

/* ================= DELETE ================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.smarter_section.findUnique({
      where: { id },
    });

    if (!existing) return res.status(404).json({ message: "Record not found" });

    deleteFile(existing.media);

    await prisma.smarter_section.delete({
      where: { id },
    });

    res.json({ message: "Deleted Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};