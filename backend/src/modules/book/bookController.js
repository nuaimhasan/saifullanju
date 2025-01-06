const { calculatePagination } = require("../../utils/calculatePagination");
const makeSlug = require("../../utils/makeSlug");
const { pick } = require("../../utils/pick");
const Model = require("./bookModel");
const fs = require("fs");

exports.add = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const { title } = data;
  const image = req?.file?.filename;

  try {
    if (!image) {
      return res.json({
        success: false,
        message: "Please upload an image",
      });
    }

    const newData = {
      ...data,
      slug: makeSlug(title),
      image: `/book/${image}`,
    };

    const result = await Model.create(newData);

    res.json({
      success: true,
      message: "Book Add Success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });

    if (image) {
      fs.unlink(`${process.cwd()}/uploads/book/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};

exports.getAll = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const { status } = req.query;

  try {
    let query = {};

    if (status && status !== "undefined" && status !== "null") {
      query = {
        status: status,
      };
    }

    const result = await Model.find(query).skip(skip).limit(limit);

    const total = await Model.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.json({
      success: true,
      message: "All Book get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
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

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Model.findById(id);
    res.json({
      success: true,
      message: "Book get success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.getBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await Model.findOne({ slug });
    res.json({
      success: true,
      message: "Book get success",
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
  const body = JSON.parse(req.body.data);
  const image = req?.file?.filename;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      if (image && image !== "undefined") {
        fs.unlink(`${process.cwd()}/uploads/book/${image}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      return res.json({
        success: false,
        message: "Book not found",
      });
    }

    const newData = {
      ...body,
      slug: makeSlug(body?.title),
      image: image && image !== "undefined" ? `/book/${image}` : isExist?.image,
    };

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    res.json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });

    if (result && image && image !== "undefined") {
      fs.unlink(`${process.cwd()}/uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });

    if (image) {
      fs.unlink(`${process.cwd()}/uploads/book/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Book not found",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Book deleted successfully",
      data: result,
    });

    if (result) {
      fs.unlink(`${process.cwd()}/uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Book not found",
      });
    }

    const result = await Model.findByIdAndUpdate(
      id,
      { status: !isExist?.status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Book status updated successfully",
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
