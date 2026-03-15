const prisma = require("../config/prisma");

/* ================= HELPER: STRIP HTML ================= */

const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

/* ================= HELPER: IMAGE PATH ================= */

const buildImagePath = (fileArray, existingImage = null) => {
  if (fileArray && fileArray.length > 0) {
    return `uploads/${fileArray[0].filename}`;
  }

  return existingImage;
};

/* ================= GET ALL ================= */

exports.getAll = async (req, res) => {
  try {

    const records = await prisma.solution_cat.findMany({
      orderBy: { id: "desc" },
      include: {
        solution_sub_categories: true
      }
    });

    res.json(records);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch records"
    });
  }
};

/* ================= GET ONE ================= */

exports.getOne = async (req, res) => {
  try {

    const id = Number(req.params.id);

    const record = await prisma.solution_cat.findUnique({
      where: { id },
      include: {
        solution_sub_categories: true
      }
    });

    if (!record) {
      return res.status(404).json({
        message: "Record not found"
      });
    }

    res.json(record);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch record"
    });
  }
};

/* ================= CREATE ================= */

exports.create = async (req, res) => {
  try {

    const files = req.files || {};

    if (!files.image || files.image.length === 0) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    const data = {
      title: stripHtml(req.body.title),
      image: `uploads/${files.image[0].filename}`
    };

    const created = await prisma.solution_cat.create({
      data
    });

    res.json({
      message: "Created successfully",
      data: created
    });

  } catch (error) {
    console.error("CREATE ERROR:", error);

    res.status(500).json({
      error: error.message
    });
  }
};
/* ================= UPDATE ================= */

exports.update = async (req, res) => {
  try {

    const id = Number(req.params.id);
    const files = req.files || {};

    const existing = await prisma.solution_cat.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        message: "Record not found"
      });
    }

    const data = {
      title: req.body.title
        ? stripHtml(req.body.title)
        : existing.title,

      image: buildImagePath(files.image, existing.image)
    };

    const updated = await prisma.solution_cat.update({
      where: { id },
      data
    });

    res.json({
      message: "Updated successfully",
      data: updated
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update record"
    });
  }
};

/* ================= DELETE ================= */

exports.remove = async (req, res) => {
  try {

    const id = Number(req.params.id);

    const existing = await prisma.solution_cat.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        message: "Record not found"
      });
    }

    await prisma.solution_cat.delete({
      where: { id }
    });

    res.json({
      message: "Deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete record"
    });
  }
};