const fs = require("fs");
const Gallery = require("./galleryModel");
const { pick } = require("../../utils/pick");
const { calculatePagination } = require("../../utils/calculatePagination");

exports.add = async (req, res) => {
  const image = req?.file?.filename;

  try {
    if (!image) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    let result = await Gallery.create({ image: `gallery/${image}` });

    res.status(201).json({
      success: true,
      message: "Gallery image add successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });

    fs.unlink(`./uploads/gallery/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.getAll = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const result = await Gallery.find({}).skip(skip).limit(limit);

    const total = await Gallery.countDocuments();
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Gallery fetched successfully",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
      err,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    let { id } = req.params;
    const result = await Gallery.findById(id);

    res.status(200).json({
      success: true,
      message: "Gallery Fetch Successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
      err,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExist = await Gallery.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Gallery not found",
      });
    }

    const result = await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gallery delete successfully",
      data: result,
    });

    if (result && result?.image) {
      fs.unlink(`./uploads/${result?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};
