const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* =======================================
   CONFIG
======================================= */
const uploadsDir = path.join(__dirname, "../uploads");

/* =======================================
   HELPER: Strip HTML
======================================= */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

/* =======================================
   HELPER: Delete File
======================================= */
const deleteFile = (filePath) => {
  if (!filePath) return;

  const fullPath = path.join(__dirname, "../", filePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

/* =======================================
   HELPER: Build Upload Path
======================================= */
const buildPath = (filename) => {
  return filename ? `uploads/${filename}` : null;
};

/* =======================================
   GET ALL
======================================= */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.cloudsection.findMany({
      orderBy: { id: "desc" },
    });

    res.status(200).json(records);
  } catch (error) {
    console.error("GET ALL ERROR:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* =======================================
   GET ONE
======================================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const record = await prisma.cloudsection.findUnique({
      where: { id },
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("GET ONE ERROR:", error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* =======================================
   CREATE
======================================= */
exports.create = async (req, res) => {
  try {
    const files = req.files || {};

    const data = {
      heading: stripHtml(req.body.heading) || null,
      paragraph1: stripHtml(req.body.paragraph1) || null,
      paragraph2: stripHtml(req.body.paragraph2) || null,

      image1: buildPath(files.image1?.[0]?.filename),
      image2: buildPath(files.image2?.[0]?.filename),
      image3: buildPath(files.image3?.[0]?.filename),
      image4: buildPath(files.image4?.[0]?.filename),
    };

    const created = await prisma.cloudsection.create({ data });

    res.status(201).json({
      message: "Created successfully",
      data: created,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

/* =======================================
   UPDATE
======================================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const files = req.files || {};

    const existing = await prisma.cloudsection.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    const data = {
      heading: req.body.heading
        ? stripHtml(req.body.heading)
        : existing.heading,

      paragraph1: req.body.paragraph1
        ? stripHtml(req.body.paragraph1)
        : existing.paragraph1,

      paragraph2: req.body.paragraph2
        ? stripHtml(req.body.paragraph2)
        : existing.paragraph2,

      image1: existing.image1,
      image2: existing.image2,
      image3: existing.image3,
      image4: existing.image4,
    };

    // Slides parity safe image replacement
    ["image1", "image2", "image3", "image4"].forEach((field) => {
      if (files[field]?.[0]?.filename) {
        if (existing[field]) {
          deleteFile(existing[field]); // delete old image
        }

        data[field] = buildPath(files[field][0].filename);
      }
    });

    const updated = await prisma.cloudsection.update({
      where: { id },
      data,
    });

    res.status(200).json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

/* =======================================
   DELETE
======================================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const existing = await prisma.cloudsection.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Delete associated images
    ["image1", "image2", "image3", "image4"].forEach((field) => {
      if (existing[field]) {
        deleteFile(existing[field]);
      }
    });

    await prisma.cloudsection.delete({
      where: { id },
    });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};