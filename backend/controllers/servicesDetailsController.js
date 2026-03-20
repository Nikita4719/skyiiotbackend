const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  const fullPath = path.join(__dirname, "..", filePathFromDb);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

/* ===============================
GET ALL
=============================== */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.services_sub_cat.findMany({
      include: {
        category: true
      },
      orderBy: { id: "desc" }
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
GET ONE
=============================== */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const record = await prisma.services_sub_cat.findUnique({
      where: { id },
      include: {
        category: true
      }
    });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
CREATE
=============================== */
exports.create = async (req, res) => {
  try {
    const {
      services_category_id,
      title,
      description,
      subheading,
      subspan1,
      subspan2,
      subtitle_para1,
      subtitle_para2
    } = req.body;

    if (!services_category_id) {
      return res.status(400).json({
        error: "services_category_id is required"
      });
    }

    const files = req.files || {};

    const created = await prisma.services_sub_cat.create({
      data: {
        services_category_id: parseInt(services_category_id),

        // ✅ HTML preserved
        title: title ?? null,
        description: description ?? null,
        subheading: subheading ?? null,
        subspan1: subspan1 ?? null,
        subspan2: subspan2 ?? null,
        subtitle_para1: subtitle_para1 ?? null,
        subtitle_para2: subtitle_para2 ?? null,

        image: files.image?.[0]
          ? `uploads/${files.image[0].filename}`
          : null,

        imagebg: files.imagebg?.[0]
          ? `uploads/${files.imagebg[0].filename}`
          : null
      }
    });

    res.status(201).json(created);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
UPDATE
=============================== */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.services_sub_cat.findUnique({
      where: { id }
    });

    const files = req.files || {};

    const data = {
      services_category_id: req.body.services_category_id
        ? Number(req.body.services_category_id)
        : existing.services_category_id,

      // ✅ HTML preserved
      title: req.body.title ?? existing.title,
      description: req.body.description ?? existing.description,
      subheading: req.body.subheading ?? existing.subheading,
      subspan1: req.body.subspan1 ?? existing.subspan1,
      subspan2: req.body.subspan2 ?? existing.subspan2,
      subtitle_para1: req.body.subtitle_para1 ?? existing.subtitle_para1,
      subtitle_para2: req.body.subtitle_para2 ?? existing.subtitle_para2,
    };

    if (files.image?.[0]) {
      if (existing.image) {
        deleteFile(existing.image);
      }
      data.image = `uploads/${files.image[0].filename}`;
    }

    if (files.imagebg?.[0]) {
      if (existing.imagebg) {
        deleteFile(existing.imagebg);
      }
      data.imagebg = `uploads/${files.imagebg[0].filename}`;
    }

    const updated = await prisma.services_sub_cat.update({
      where: { id },
      data
    });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
DELETE
=============================== */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.services_sub_cat.findUnique({
      where: { id }
    });

    if (existing.image) {
      deleteFile(existing.image);
    }

    if (existing.imagebg) {
      deleteFile(existing.imagebg);
    }

    await prisma.services_sub_cat.delete({
      where: { id }
    });

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};