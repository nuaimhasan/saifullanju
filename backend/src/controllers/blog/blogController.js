const Model = require("../../models/blog/blogModel");
const fs = require("fs");
const makeSlug = require("../../utils/makeSlug");
const { pick } = require("../../utils/pick");
const { calculatePagination } = require("../../utils/calculatePagination");

exports.add = async (req, res) => {
  const body = req.body;
  const { title } = body;
  const image = req?.file?.filename;

  const slug = makeSlug(title);

  try {
    if (!image) {
      return res.json({
        success: false,
        message: "Please upload an image",
      });
    }

    const newData = {
      ...body,
      slug,
      image,
    };

    const result = await Model.create(newData);

    res.json({
      success: true,
      message: "Blog Add Success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });

    if (image) {
      fs.unlink(`./uploads/blogs/${image}`, (err) => {
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
  const { category } = req.query;

  try {
    let query = {};
    if (category) query.category = category;

    const result = await Model.find(query)
      .populate("category")
      .skip(skip)
      .limit(limit);

    const total = await Model.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.json({
      success: true,
      message: "All blogs get success",
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

exports.getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Model.findById(id).populate("category");
    res.json({
      success: true,
      message: "get single blog success",
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
    const result = await Model.findOne({ slug }).populate("category");
    res.json({
      success: true,
      message: "get single blog success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const image = req?.file?.filename;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      if (image) {
        fs.unlink(`./uploads/blogs/${image}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    const newData = {
      ...body,
      slug: makeSlug(body?.title),
      image: image || isExist?.image,
    };

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: result,
    });

    if (result && image) {
      fs.unlink(`./uploads/blogs/${isExist?.image}`, (err) => {
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
      fs.unlink(`./uploads/blogs/${image}`, (err) => {
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
    const result = await Model.findByIdAndDelete(id);

    if (result) {
      res.json({
        success: true,
        message: "Blog deleted successfully",
      });

      if (result?.image) {
        fs.unlink(`./uploads/blogs/${result?.image}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    } else {
      res.json({
        success: false,
        message: "Failed to delete blog",
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
