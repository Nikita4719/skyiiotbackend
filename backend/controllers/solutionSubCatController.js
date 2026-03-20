const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");


/* DELETE MULTIPLE IMAGES */

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


/* CREATE */

exports.create = async (req, res) => {

  try {

    const image1 = req.files?.image1?.[0]
      ? "uploads/" + req.files.image1[0].filename
      : null;

    const image2 = req.files?.image2
      ? JSON.stringify(req.files.image2.map(f => "uploads/" + f.filename))
      : null;

    const imagechart = req.files?.imagechart?.[0]
      ? "uploads/" + req.files.imagechart[0].filename
      : null;

    const data = {

      solutionCatId: req.body.solutionCatId
        ? parseInt(req.body.solutionCatId)
        : null,

      heading: req.body.heading, // ✅ FIX

      description1: req.body.description1, // ✅ FIX
      description2: req.body.description2, // ✅ FIX

      image1,
      imagechart,

      para1: req.body.para1, // ✅ FIX
      para2: req.body.para2, // ✅ FIX
      para3: req.body.para3, // ✅ FIX
      para4: req.body.para4, // ✅ FIX

      image2
    };

    const created = await prisma.solution_sub_categories.create({ data });

    res.json({
      message: "Created Successfully",
      data: created
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Create Failed"
    });

  }

};


/* GET ALL */

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


/* GET ONE */

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


/* UPDATE */

exports.update = async (req, res) => {

  const id = parseInt(req.params.id);

  try {

    const existing = await prisma.solution_sub_categories.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ message: "Not Found" });
    }

    let image1 = existing.image1;

    if (req.files?.image1?.[0]) {

      if (existing.image1) {

        const oldPath = path.join(__dirname, "../", existing.image1);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }

      }

      image1 = "uploads/" + req.files.image1[0].filename;

    }

    let imagechart = existing.imagechart;

    if (req.files?.imagechart?.[0]) {

      if (existing.imagechart) {

        const oldPath = path.join(__dirname, "../", existing.imagechart);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }

      }

      imagechart = "uploads/" + req.files.imagechart[0].filename;

    }

    let image2 = existing.image2;

    if (req.files?.image2) {

      deleteImages(existing.image2);

      image2 = JSON.stringify(
        req.files.image2.map(f => "uploads/" + f.filename)
      );

    }

    const updated = await prisma.solution_sub_categories.update({

      where: { id },

      data: {

        heading: req.body.heading, // ✅ FIX

        description1: req.body.description1, // ✅ FIX
        description2: req.body.description2, // ✅ FIX

        para1: req.body.para1, // ✅ FIX
        para2: req.body.para2, // ✅ FIX
        para3: req.body.para3, // ✅ FIX
        para4: req.body.para4, // ✅ FIX

        image1,
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

    res.status(500).json({
      message: "Update Failed"
    });

  }

};


/* DELETE */

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