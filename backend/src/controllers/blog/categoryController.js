const Model = require("../../models/blog/categoryModel");
const makeSlug = require("../../utils/makeSlug");

exports.add = async (req, res) => {
  const body = req.body;
  try {
    const newData = {
      ...body,
      slug: makeSlug(body?.title),
    };

    const result = await Model.create(newData);

    res.json({
      success: true,
      message: "Category added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Model.find();

    res.json({
      success: true,
      message: "All categories",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

exports.getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Model.findById(id);

    res.json({
      success: true,
      message: "get single category success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

exports.getBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await Model.findOne({ slug });

    res.json({
      success: true,
      message: "get single category success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const newData = {
      ...body,
      slug: makeSlug(body?.title),
    };

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    res.json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });
  }
};
