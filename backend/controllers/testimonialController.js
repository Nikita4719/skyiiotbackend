const prisma = require("../config/prisma");
const fs = require("fs").promises;
const path = require("path");

const ROOT_DIR = path.join(__dirname, "../");

/* ======================= */
/* HELPERS */
/* ======================= */

const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;
  return value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
};

const normalizePath = (filePath) =>
  filePath ? filePath.replace(/\\/g, "/") : null;

const deleteFile = async (filePathFromDb) => {
  if (!filePathFromDb) return;

  try {
    const fullPath = path.join(ROOT_DIR, filePathFromDb);
    await fs.unlink(fullPath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error("File delete error:", err.message);
    }
  }
};

const extractImages = (files) => {
  const result = {};

  ["image1", "image2", "image3"].forEach((key) => {
    if (files?.[key]?.[0]) {
      result[key] = normalizePath(files[key][0].path);
    }
  });

  return result;
};

/* ================= CREATE ================= */
exports.createTestimonial = async (req, res) => {
  const files = req.files || {};
  const images = extractImages(files);

  if (!req.body.heading) {
    await Promise.all(Object.values(images).map(deleteFile));
    return res.status(400).json({ message: "Heading is required" });
  }

  try {
    const created = await prisma.testimonials.create({
      data: {
        heading: stripHtml(req.body.heading),
        para1: stripHtml(req.body.para1),
        para2: stripHtml(req.body.para2),
        image1: images.image1 || null,
        image2: images.image2 || null,
        image3: images.image3 || null,
      },
    });

    res.status(201).json({
      id: created.id,
      message: "Created Successfully",
    });
  } catch (error) {
    await Promise.all(Object.values(images).map(deleteFile));
    console.error(error);
    res.status(500).json({ error: "Failed to create testimonial" });
  }
};

/* ================= GET ALL ================= */
exports.getAllTestimonials = async (req, res) => {
  try {
    const records = await prisma.testimonials.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};

/* ================= GET SINGLE ================= */
exports.getSingleTestimonial = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const record = await prisma.testimonials.findUnique({
      where: { id },
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch testimonial" });
  }
};

/* ================= UPDATE ================= */
exports.updateTestimonial = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const files = req.files || {};
  const newImages = extractImages(files);

  try {
    const existing = await prisma.testimonials.findUnique({
      where: { id },
    });

    if (!existing) {
      await Promise.all(Object.values(newImages).map(deleteFile));
      return res.status(404).json({ message: "Record not found" });
    }

    const updated = await prisma.testimonials.update({
      where: { id },
      data: {
        heading: req.body.heading
          ? stripHtml(req.body.heading)
          : existing.heading,
        para1: req.body.para1
          ? stripHtml(req.body.para1)
          : existing.para1,
        para2: req.body.para2
          ? stripHtml(req.body.para2)
          : existing.para2,
        image1: newImages.image1 ?? existing.image1,
        image2: newImages.image2 ?? existing.image2,
        image3: newImages.image3 ?? existing.image3,
      },
    });

    // delete old images that were replaced
    await Promise.all(
      Object.keys(newImages).map((key) =>
        deleteFile(existing[key])
      )
    );

    res.json({
      message: "Updated Successfully",
      data: updated,
    });
  } catch (error) {
    await Promise.all(Object.values(newImages).map(deleteFile));
    console.error(error);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
};

/* ================= DELETE ================= */
exports.deleteTestimonial = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const existing = await prisma.testimonials.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    await prisma.testimonials.delete({
      where: { id },
    });

    // delete images from disk
    await Promise.all(
      ["image1", "image2", "image3"].map((key) =>
        deleteFile(existing[key])
      )
    );

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
};