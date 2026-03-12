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

  const data = {};

  // headings 1–8
  for (let i = 1; i <= 8; i++) {
    data[`heading${i}`] = stripHtml(req.body[`heading${i}`]) ?? null;
  }

  // paragraphs 1–4
  for (let i = 1; i <= 4; i++) {
    data[`paragraph${i}`] = stripHtml(req.body[`paragraph${i}`]) ?? null;
  }

  data.image1 = buildImagePath(files.image1);
  data.image2 = buildImagePath(files.image2);

  prisma.aboutusbenefits.create({ data })
    .then((created) => {
      res.status(201).json({
        message: "About Us Benefits created successfully",
        data: created,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to create About Us Benefits",
      });
    });
};

/* =============================== */
/* GET ALL */
/* =============================== */
exports.getAll = (req, res) => {
  prisma.aboutusbenefits.findMany({
    orderBy: { id: "desc" },
  })
    .then((data) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to fetch About Us Benefits",
      });
    });
};

/* =============================== */
/* GET ONE */
/* =============================== */
exports.getOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  prisma.aboutusbenefits.findUnique({ where: { id } })
    .then((data) => {
      if (!data)
        return res.status(404).json({
          message: "About Us Benefits not found",
        });

      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to fetch About Us Benefits",
      });
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

  prisma.aboutusbenefits.findUnique({ where: { id } })
    .then((existing) => {
      if (!existing)
        return res.status(404).json({
          message: "About Us Benefits not found",
        });

      let image1 = existing.image1;
      let image2 = existing.image2;

      if (files.image1 && files.image1.length > 0) {
        deleteImage(existing.image1);
        image1 = buildImagePath(files.image1);
      }

      if (files.image2 && files.image2.length > 0) {
        deleteImage(existing.image2);
        image2 = buildImagePath(files.image2);
      }

      const updatedData = {};

      for (let i = 1; i <= 8; i++) {
        updatedData[`heading${i}`] =
          req.body[`heading${i}`] !== undefined
            ? stripHtml(req.body[`heading${i}`])
            : existing[`heading${i}`];
      }

      for (let i = 1; i <= 4; i++) {
        updatedData[`paragraph${i}`] =
          req.body[`paragraph${i}`] !== undefined
            ? stripHtml(req.body[`paragraph${i}`])
            : existing[`paragraph${i}`];
      }

      updatedData.image1 = image1;
      updatedData.image2 = image2;

      return prisma.aboutusbenefits.update({
        where: { id },
        data: updatedData,
      });
    })
    .then((updated) => {
      if (updated) {
        res.json({
          message: "About Us Benefits updated successfully",
          data: updated,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to update About Us Benefits",
      });
    });
};

/* =============================== */
/* DELETE */
/* =============================== */
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  prisma.aboutusbenefits.findUnique({ where: { id } })
    .then((existing) => {
      if (!existing)
        return res.status(404).json({
          message: "About Us Benefits not found",
        });

      deleteImage(existing.image1);
      deleteImage(existing.image2);

      return prisma.aboutusbenefits.delete({ where: { id } });
    })
    .then(() => {
      res.json({
        message: "About Us Benefits deleted successfully",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to delete About Us Benefits",
      });
    });
};