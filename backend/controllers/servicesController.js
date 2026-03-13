const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const stripHtml = (value) => {

  if (!value) return null;

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

};

const deleteFile = (filePathFromDb) => {

  if (!filePathFromDb) return;

  const fullPath = path.join(__dirname, "..", filePathFromDb);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }

};

exports.getAll = async (req, res) => {

  try {

    const records = await prisma.services.findMany({
      orderBy: { id: "desc" }
    });

    res.json(records);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.getOne = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const record = await prisma.services.findUnique({
      where: { id }
    });

    res.json(record);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.create = async (req, res) => {

  try {

    const { title, heading, paragraph } = req.body;
    const files = req.files || {};

    const created = await prisma.services.create({

      data: {

        title: stripHtml(title),
        heading: stripHtml(heading),
        paragraph: stripHtml(paragraph),

        image: files.image?.[0]
          ? `uploads/${files.image[0].filename}`
          : null

      }

    });

    res.status(201).json(created);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.update = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const existing = await prisma.services.findUnique({
      where: { id }
    });

    const files = req.files || {};

    const data = {

      title: req.body.title
        ? stripHtml(req.body.title)
        : existing.title,

      heading: req.body.heading
        ? stripHtml(req.body.heading)
        : existing.heading,

      paragraph: req.body.paragraph
        ? stripHtml(req.body.paragraph)
        : existing.paragraph,

    };

    if (files.image?.[0]) {

      if (existing.image) {
        deleteFile(existing.image);
      }

      data.image = `uploads/${files.image[0].filename}`;

    }

    const updated = await prisma.services.update({

      where: { id },
      data

    });

    res.json(updated);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.remove = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const existing = await prisma.services.findUnique({
      where: { id }
    });

    if (existing.image) {
      deleteFile(existing.image);
    }

    await prisma.services.delete({
      where: { id }
    });

    res.json({ message: "Deleted successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};