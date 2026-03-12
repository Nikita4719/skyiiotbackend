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
/* BUILD IMAGE PATHS */
/* =============================== */
const buildImagePaths = (fileArray) => {
  if (!fileArray || fileArray.length === 0) return null;
  const paths = fileArray.map((file) => "uploads/" + file.filename);
  return JSON.stringify(paths);   // 🔥 IMPORTANT
};

/* =============================== */
/* DELETE MULTIPLE IMAGES */
/* =============================== */
const deleteImages = (imageString) => {
  if (!imageString) return;

  let imageArray = [];
  try {
    imageArray = JSON.parse(imageString);
  } catch {
    return;
  }

  imageArray.forEach((img) => {
    const fullPath = path.join(__dirname, "../", img);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  });
};

/* =============================== */
/* CREATE */
/* =============================== */
exports.create = (req, res) => {
  const files = req.files || [];

  const data = {
    solutionCatId: req.body.solutionCatId
      ? parseInt(req.body.solutionCatId)
      : null,

    para1: stripHtml(req.body.para1) ?? null,
    para2: stripHtml(req.body.para2) ?? null,

    input1: req.body.input1 ?? null,
    input2: req.body.input2 ?? null,
    input3: req.body.input3 ?? null,
    input4: req.body.input4 ?? null,

    image2: buildImagePaths(files),   // ✅ FIXED
  };

  prisma.solution_sub_categories.create({ data })
    .then((created) => {
      res.status(201).json({
        message: "Solution Sub Category created successfully",
        data: created,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to create" });
    });
};
/* =============================== */
/* GET ALL */
/* =============================== */
exports.getAll = (req, res) => {
  prisma.solution_sub_categories.findMany({
    orderBy: { id: "desc" },
    include: {
      solution_cat: true,   // 🔥 THIS IS IMPORTANT
    },
  })
    .then((data) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch" });
    });
};

/* =============================== */
/* GET ONE */
/* =============================== */
exports.getOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  prisma.solution_sub_categories.findUnique({
    where: { id },
    include: {
      solution_cat: true,   // 🔥 ADD THIS
    },
  })
    .then((data) => {
      if (!data)
        return res.status(404).json({ message: "Not found" });

      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch" });
    });
};
/* =============================== */
/* UPDATE */
/* =============================== */
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const files = req.files || [];

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  prisma.solution_sub_categories.findUnique({ where: { id } })
    .then((existing) => {
      if (!existing)
        return res.status(404).json({ message: "Not found" });

      let image2 = existing.image2;

      if (files.length > 0) {
        deleteImages(existing.image2);
        image2 = buildImagePaths(files);   // ✅ FIXED
      }

      return prisma.solution_sub_categories.update({
        where: { id },
        data: {
          solutionCatId: req.body.solutionCatId
            ? parseInt(req.body.solutionCatId)
            : existing.solutionCatId,

          para1: req.body.para1
            ? stripHtml(req.body.para1)
            : existing.para1,

          para2: req.body.para2
            ? stripHtml(req.body.para2)
            : existing.para2,

          input1: req.body.input1 || existing.input1,
          input2: req.body.input2 || existing.input2,
          input3: req.body.input3 || existing.input3,
          input4: req.body.input4 || existing.input4,

          image2,
        }
      });
    })
    .then((updated) => {
      res.json({
        message: "Updated successfully",
        data: updated,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to update" });
    });
};

/* =============================== */
/* DELETE */
/* =============================== */
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid ID" });

  prisma.solution_sub_categories.findUnique({ where: { id } })
    .then((existing) => {
      if (!existing)
        return res.status(404).json({ message: "Not found" });

      deleteImages(existing.image2);

      return prisma.solution_sub_categories.delete({ where: { id } });
    })
    .then(() => {
      res.json({ message: "Deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to delete" });
    });
};