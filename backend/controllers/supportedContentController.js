const prisma = require("../config/prisma");

/* ================= HELPER: STRIP HTML ================= */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

/* ================= HELPER: BUILD IMAGE PATH ================= */
const buildImagePath = (fileArray, existingImage = null) => {
  if (fileArray && fileArray.length > 0) {
    return `uploads/${fileArray[0].filename}`; // ✅ Correct Path
  }
  return existingImage;
};

// ================= GET ALL =================
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.supported_content.findMany({
      orderBy: { id: "desc" },
    });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// ================= GET ONE =================
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const record = await prisma.supported_content.findUnique({
      where: { id },
    });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// ================= CREATE =================
exports.create = async (req, res) => {
  try {
    const files = req.files || {};

    const data = {
      heading: stripHtml(req.body.heading) ?? null,
      paragraph1: stripHtml(req.body.paragraph1) ?? null,
      paragraph2: stripHtml(req.body.paragraph2) ?? null,
      image1: buildImagePath(files.image1),
      image2: buildImagePath(files.image2),
      image3: buildImagePath(files.image3),
      image4: buildImagePath(files.image4),
    };

    await prisma.supported_content.create({ data });

    res.json({ message: "Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

// ================= UPDATE =================
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const files = req.files || {};

    const existing = await prisma.supported_content.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Record not found" });

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
      image1: buildImagePath(files.image1, existing.image1),
      image2: buildImagePath(files.image2, existing.image2),
      image3: buildImagePath(files.image3, existing.image3),
      image4: buildImagePath(files.image4, existing.image4),
    };

    await prisma.supported_content.update({
      where: { id },
      data,
    });

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

// ================= DELETE =================
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.supported_content.findUnique({
      where: { id },
    });

    if (!existing)
      return res.status(404).json({ message: "Record not found" });

    await prisma.supported_content.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};