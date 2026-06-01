const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

//DELETE MULTIPLE IMAGES
const deleteImages = (imageString) => {

  if (!imageString) return;

  let images = [];

  try {
    images = JSON.parse(imageString);
  } catch {
    images = [];
  }

  images.forEach((img) => {

    const fullPath = path.join(__dirname, "../", img);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

  });

};

//CREATE
exports.create = async (req, res) => {
  try {


    const image1 = req.files?.image1?.[0]
      ? "uploads/" + req.files.image1[0].filename
      : null;

    const imagechart = req.files?.imagechart?.[0]
      ? "uploads/" + req.files.imagechart[0].filename
      : null;

    let image2 = null;

    if (req.files?.image2) {

      let orderArray = [];

      if (req.body["image2_order[]"]) {
        orderArray = Array.isArray(req.body["image2_order[]"])
          ? req.body["image2_order[]"].map(Number)
          : [Number(req.body["image2_order[]"])];
      }

      let uploaded = req.files.image2.map((file, i) => ({
        path: "uploads/" + file.filename,
        order: orderArray[i] ?? i
      }));

      uploaded.sort((a, b) => a.order - b.order);

      image2 = JSON.stringify(uploaded.map(img => img.path));
    }

    const data = {
      solutionCatId: req.body.solutionCatId
        ? parseInt(req.body.solutionCatId)
        : null,

      heading: req.body.heading,
      description1: req.body.description1,
      description2: req.body.description2,

      image1,
      imagechart,

      para1: req.body.para1,
      para2: req.body.para2,
      para3: req.body.para3,
      para4: req.body.para4,

      image2,
      image1Size: req.body.image1Size,
      imageChartSize: req.body.imageChartSize,
      image2Size: req.body.image2Size
    };

    const created = await prisma.solution_sub_categories.create({ data });

    res.json({
      message: "Created Successfully",
      data: created
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Create Failed" });
  }
};



//READ
exports.getAll = async (req, res) => {

  try {

    const data = await prisma.solution_sub_categories.findMany({

      orderBy: { id: "desc" },

      include: {
        solution_cat: true
      }

    });

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Fetch Failed"
    });

  }

};


//EDIT
exports.getOne = async (req, res) => {

  const id = parseInt(req.params.id);

  try {

    const data = await prisma.solution_sub_categories.findUnique({

      where: { id },

      include: {
        solution_cat: true
      }

    });

    if (!data) {
      return res.status(404).json({
        message: "Not Found"
      });
    }

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Fetch Failed"
    });

  }

};

//UPDATE
exports.update = async (req, res) => {

  const id = parseInt(req.params.id);

  try {
    const existing = await prisma.solution_sub_categories.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ message: "Not Found" });
    }

    const deleteFlags = req.body.deleteFlags
      ? JSON.parse(req.body.deleteFlags)
      : {};

    // ===== IMAGE1 =====
    let image1 = existing.image1;

    if (deleteFlags.image1 && existing.image1) {
      const oldPath = path.join(__dirname, "../", existing.image1);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      image1 = null;
    }

    if (req.files?.image1?.[0]) {
      if (existing.image1) {
        const oldPath = path.join(__dirname, "../", existing.image1);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image1 = "uploads/" + req.files.image1[0].filename;
    }

    // ===== IMAGE CHART =====
    let imagechart = existing.imagechart;

    if (deleteFlags.imagechart && existing.imagechart) {
      const oldPath = path.join(__dirname, "../", existing.imagechart);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      imagechart = null;
    }

    if (req.files?.imagechart?.[0]) {
      if (existing.imagechart) {
        const oldPath = path.join(__dirname, "../", existing.imagechart);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      imagechart = "uploads/" + req.files.imagechart[0].filename;
    }

    // ===== MULTIPLE IMAGES =====
    let existingImages = [];

    try {
      existingImages = existing.image2 ? JSON.parse(existing.image2) : [];
    } catch {
      existingImages = [];
    }

    // 🔥 DELETE SELECTED
    if (deleteFlags.image2?.length) {
      existingImages.forEach((img, index) => {
        if (deleteFlags.image2.includes(index)) {
          const imgPath = path.join(__dirname, "../", img);
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }
      });

      existingImages = existingImages.filter(
        (_, index) => !deleteFlags.image2.includes(index)
      );
    }

    // 🔥 NEW IMAGES WITH CORRECT ORDER
    let newImages = [];

    if (req.files?.image2) {

      // ✅ SAFE ORDER PARSE
      let orderArray = [];

      if (req.body["image2_order[]"]) {
        orderArray = Array.isArray(req.body["image2_order[]"])
          ? req.body["image2_order[]"].map(Number)
          : [Number(req.body["image2_order[]"])];
      }

      let uploaded = req.files.image2.map((file, i) => ({
        path: "uploads/" + file.filename,
        order: orderArray[i] ?? i
      }));

      // ✅ SORT
      uploaded.sort((a, b) => a.order - b.order);

      newImages = uploaded.map(img => img.path);
    }

    // 🔥 FINAL MERGE
    const image2 = JSON.stringify([...existingImages, ...newImages]);

    const updated = await prisma.solution_sub_categories.update({
      where: { id },
      data: {
        heading: req.body.heading,
        description1: req.body.description1,
        description2: req.body.description2,
        para1: req.body.para1,
        para2: req.body.para2,
        para3: req.body.para3,
        para4: req.body.para4,
        image1,
        image1Size: req.body.image1Size,
        imageChartSize: req.body.imageChartSize,
        image2Size: req.body.image2Size,
        imagechart,
        image2
      }
    });

    res.json({
      message: "Updated Successfully",
      data: updated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update Failed" });
  }
};


//DELETE
exports.remove = async (req, res) => {

  const id = parseInt(req.params.id);

  try {

    const existing = await prisma.solution_sub_categories.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({
        message: "Not Found"
      });
    }

    deleteImages(existing.image2);

    if (existing.image1) {

      const imgPath = path.join(__dirname, "../", existing.image1);

      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }

    }

    if (existing.imagechart) {

      const chartPath = path.join(__dirname, "../", existing.imagechart);

      if (fs.existsSync(chartPath)) {
        fs.unlinkSync(chartPath);
      }

    }

    await prisma.solution_sub_categories.delete({
      where: { id }
    });

    res.json({
      message: "Deleted Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Delete Failed"
    });

  }
};