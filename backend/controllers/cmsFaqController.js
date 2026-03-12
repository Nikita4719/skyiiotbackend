const prisma = require("../config/prisma");

/* ============================= */
/* HELPER: STRIP HTML TAGS */
/* ============================= */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;

  const clean = value
    .replace(/<[^>]*>/g, "")   // Remove HTML tags
    .replace(/&nbsp;/g, " ")   // Replace &nbsp;
    .replace(/\s+/g, " ")      // Remove extra spaces
    .trim();

  return clean.length ? clean : null;
};

/* ===============================
   Get All (WITH JOIN)
================================ */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.cms_faqs.findMany({
      include: { faqs: true },
      orderBy: { id: "desc" },
    });

    const formatted = records.map((item) => ({
      id: item.id,
      para: item.para,
      faq_title: item.faqs?.title,
      faq_id: item.faqs?.id,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* ===============================
   Get One
================================ */
exports.getOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await prisma.cms_faqs.findUnique({
      where: { id },
    });

    if (!result) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* ===============================
   Create
================================ */
exports.create = async (req, res) => {
  try {
    const { faq_id } = req.body;
    const cleanPara = stripHtml(req.body.para);

    if (!faq_id || !cleanPara) {
      return res
        .status(400)
        .json({ message: "faq_id and para are required" });
    }

    await prisma.cms_faqs.create({
      data: {
        faq_id: parseInt(faq_id),
        para: cleanPara,
      },
    });

    res.json({ message: "Created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create record" });
  }
};

/* ===============================
   Update
================================ */
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { faq_id } = req.body;
    const cleanPara = stripHtml(req.body.para);

    await prisma.cms_faqs.update({
      where: { id },
      data: {
        faq_id: parseInt(faq_id),
        para: cleanPara,
      },
    });

    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update record" });
  }
};

/* ===============================
   Delete
================================ */
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.cms_faqs.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete record" });
  }
};