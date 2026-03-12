const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* =============================== */
/* STRIP HTML */
/* =============================== */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;
  return value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
};

/* =============================== */
/* BUILD IMAGE PATH */
/* =============================== */
const buildImagePath = (fileArray, existingImage = null) => {
  if (fileArray && fileArray.length > 0 && fileArray[0].filename) {
    return "uploads/" + fileArray[0].filename;
  }
  return existingImage;
};

/* =============================== */
/* DELETE IMAGE */
/* =============================== */
const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "../", imagePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

/* =============================== */
/* CREATE */
/* =============================== */
exports.create = (req, res) => {
  const files = req.files || {};

  const data = {
    title: stripHtml(req.body.title) ?? null,
    heading: stripHtml(req.body.heading) ?? null,
    paragraph: stripHtml(req.body.paragraph) ?? null,
    image1: buildImagePath(files.image1),
    image2: buildImagePath(files.image2),
  };

  prisma.about_us.create({ data })
    .then((created) => {
      res.status(201).json({
        message: "About Us created successfully",
        data: created,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to create About Us" });
    });
};

/* =============================== */
/* GET ALL */
/* =============================== */
exports.getAll = (req, res) => {
  prisma.about_us.findMany({
    orderBy: { id: "desc" },
  })
    .then((data) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch About Us data" });
    });
};

/* =============================== */
/* GET ONE */
/* =============================== */
exports.getOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  prisma.about_us.findUnique({ where: { id } })
    .then((data) => {
      if (!data)
        return res.status(404).json({ message: "About Us not found" });

      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch About Us" });
    });
};

/* =============================== */
/* UPDATE */
/* =============================== */
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const files = req.files || {};

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  prisma.about_us.findUnique({ where: { id } })
    .then((existing) => {
      if (!existing)
        return res.status(404).json({ message: "About Us not found" });

      let image1 = existing.image1;
      let image2 = existing.image2;

      // If new image uploaded → delete old
      if (files.image1 && files.image1.length > 0) {
        deleteImage(existing.image1);
        image1 = buildImagePath(files.image1);
      }

      if (files.image2 && files.image2.length > 0) {
        deleteImage(existing.image2);
        image2 = buildImagePath(files.image2);
      }

      const updatedData = {
        title: req.body.title !== undefined ? stripHtml(req.body.title) : existing.title,
        heading: req.body.heading !== undefined ? stripHtml(req.body.heading) : existing.heading,
        paragraph: req.body.paragraph !== undefined ? stripHtml(req.body.paragraph) : existing.paragraph,
        image1,
        image2,
      };

      return prisma.about_us.update({
        where: { id },
        data: updatedData,
      });
    })
    .then((updated) => {
      if (updated) {
        res.json({
          message: "About Us updated successfully",
          data: updated,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to update About Us" });
    });
};

/* =============================== */
/* DELETE */
/* =============================== */
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  prisma.about_us.findUnique({ where: { id } })
    .then((existing) => {
      if (!existing)
        return res.status(404).json({ message: "About Us not found" });

      deleteImage(existing.image1);
      deleteImage(existing.image2);

      return prisma.about_us.delete({ where: { id } });
    })
    .then(() => {
      res.json({ message: "About Us deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to delete About Us" });
    });
};