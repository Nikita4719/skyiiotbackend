const prisma = require("../config/prisma");

/* =============================== */
/* HELPER: STRIP HTML */
/* =============================== */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

/* =============================== */
/* HELPER: BUILD FULL IMAGE URL */
/* =============================== */
const buildImagePath = (req, fileArray, existingImage = null) => {
  if (fileArray && fileArray.length > 0) {
    return `uploads/${fileArray[0].filename}`;
  }
  return existingImage;
};

// ===============================
// CREATE OFFER
// ===============================
exports.create = async (req, res) => {
  try {
    const files = req.files || {};

    const data = {
      title: stripHtml(req.body.title) ?? null,
      heading1: stripHtml(req.body.heading1) ?? null,
      heading2: stripHtml(req.body.heading2) ?? null,
      heading3: stripHtml(req.body.heading3) ?? null,
      heading4: stripHtml(req.body.heading4) ?? null,
      heading5: stripHtml(req.body.heading5) ?? null,
      paragraph1: stripHtml(req.body.paragraph1) ?? null,
      paragraph2: stripHtml(req.body.paragraph2) ?? null,
      paragraph3: stripHtml(req.body.paragraph3) ?? null,
      paragraph4: stripHtml(req.body.paragraph4) ?? null,
      image1: buildImagePath(req, files.image1),
      image2: buildImagePath(req, files.image2),
    };

    await prisma.offer.create({ data });

    res.status(201).json({
      message: "Offer created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create offer" });
  }
};

// ===============================
// GET ALL OFFERS
// ===============================
exports.getAll = async (req, res) => {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { id: "desc" },
    });

    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch offers" });
  }
};

// ===============================
// GET OFFER BY ID
// ===============================
exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const offer = await prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch offer" });
  }
};

// ===============================
// UPDATE OFFER
// ===============================
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const files = req.files || {};

    const existing = await prisma.offer.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Offer not found" });
    }

    const updatedData = {
      title: req.body.title ? stripHtml(req.body.title) : existing.title,
      heading1: req.body.heading1
        ? stripHtml(req.body.heading1)
        : existing.heading1,
      heading2: req.body.heading2
        ? stripHtml(req.body.heading2)
        : existing.heading2,
      heading3: req.body.heading3
        ? stripHtml(req.body.heading3)
        : existing.heading3,
      heading4: req.body.heading4
        ? stripHtml(req.body.heading4)
        : existing.heading4,
      heading5: req.body.heading5
        ? stripHtml(req.body.heading5)
        : existing.heading5,
      paragraph1: req.body.paragraph1
        ? stripHtml(req.body.paragraph1)
        : existing.paragraph1,
      paragraph2: req.body.paragraph2
        ? stripHtml(req.body.paragraph2)
        : existing.paragraph2,
      paragraph3: req.body.paragraph3
        ? stripHtml(req.body.paragraph3)
        : existing.paragraph3,
      paragraph4: req.body.paragraph4
        ? stripHtml(req.body.paragraph4)
        : existing.paragraph4,
      image1: buildImagePath(req, files.image1, existing.image1),
      image2: buildImagePath(req, files.image2, existing.image2),
    };

    await prisma.offer.update({
      where: { id },
      data: updatedData,
    });

    res.json({
      message: "Offer updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update offer" });
  }
};

// ===============================
// DELETE OFFER
// ===============================
exports.delete = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existing = await prisma.offer.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Offer not found" });
    }

    await prisma.offer.delete({
      where: { id },
    });

    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete offer" });
  }
};