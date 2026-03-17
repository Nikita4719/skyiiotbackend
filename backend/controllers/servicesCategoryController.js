const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  if (!filePath) return;

  const fullPath = path.join(__dirname, "..", filePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

exports.getAll = async (req, res) => {
  try {
    const records = await prisma.services_category.findMany({
      include: {
        service: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const record = await prisma.services_category.findUnique({
      where: { id },
    });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { service_id, link } = req.body;
    const files = req.files || {};

    const created = await prisma.services_category.create({
      data: {
        service_id: Number(service_id),

        // ✅ HTML preserved (agar CKEditor use ho raha hai)
        link: link ?? null,

        icon: files.icon?.[0]
          ? `uploads/${files.icon[0].filename}`
          : null,
      },
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.services_category.findUnique({
      where: { id },
    });

    const files = req.files || {};

    const data = {
      service_id: Number(req.body.service_id),

      // ✅ HTML preserved
      link:
        req.body.link !== undefined
          ? req.body.link
          : existing.link,
    };

    if (files.icon?.[0]) {
      if (existing.icon) {
        deleteFile(existing.icon);
      }

      data.icon = `uploads/${files.icon[0].filename}`;
    }

    const updated = await prisma.services_category.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.services_category.findUnique({
      where: { id },
    });

    if (existing.icon) {
      deleteFile(existing.icon);
    }

    await prisma.services_category.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};