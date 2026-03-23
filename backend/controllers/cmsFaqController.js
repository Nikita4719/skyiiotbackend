const prisma = require("../config/prisma");

//READ
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

//EDIT
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

//CREATE
exports.create = async (req, res) => {
  try {
    const { faq_id, para } = req.body;

    if (!faq_id || !para) {
      return res
        .status(400)
        .json({ message: "faq_id and para are required" });
    }

    await prisma.cms_faqs.create({
      data: {
        faq_id: parseInt(faq_id),
        para: para,
      },
    });

    res.json({ message: "Created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create record" });
  }
};

//UPDATE
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { faq_id, para } = req.body;

    await prisma.cms_faqs.update({
      where: { id },
      data: {
        faq_id: parseInt(faq_id),
        para: para,
      },
    });

    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update record" });
  }
};

//DELETE
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