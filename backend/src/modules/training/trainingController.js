const { calculatePagination } = require("../../utils/calculatePagination");
const makeSlug = require("../../utils/makeSlug");
const { pick } = require("../../utils/pick");
const Model = require("./trainingModel");
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
      image: `/training/${image}`,
    };

    const result = await Model.create(newData);

    res.json({
      success: true,
      message: "Training Add Success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
      error,
    });

    if (image) {
      fs.unlink(`${process.cwd()}/uploads/training/${image}`, (err) => {
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
  const { upcoming, active } = req.query;

  try {
    let query = {};

    if (active && active !== "undefined" && active !== "null") {
      query = {
        isActive: active,
      };
    }

    if (upcoming && upcoming == "true") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
      );

      const nextDate = new Date(localToday);
      nextDate.setDate(nextDate.getDate() + 1);

      query = {
        startDate: { $gte: nextDate },
      };
    }

    const result = await Model.find(query).populate().skip(skip).limit(limit);

    const total = await Model.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.json({
      success: true,
      message: "All training get success",
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
    const result = await Model.findById(id).populate();
    res.json({
      success: true,
      message: "training get success",
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
    const result = await Model.findOne({ slug }).populate();
    res.json({
      success: true,
      message: "training get success",
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
        fs.unlink(`${process.cwd()}/uploads/training/${image}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      return res.json({
        success: false,
        message: "Training not found",
      });
    }

    const newData = {
      ...body,
      slug: makeSlug(body?.title),
      image:
        image && image !== "undefined" ? `/training/${image}` : isExist?.image,
    };

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    res.json({
      success: true,
      message: "Training updated successfully",
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
      fs.unlink(`${process.cwd()}/uploads/training/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};

// soft delete update isActive to false
exports.softDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Training not found",
      });
    }

    const result = await Model.findByIdAndUpdate(
      id,
      { isActive: !isExist?.isActive },
      { new: true }
    );

    res.json({
      success: true,
      message: "Training Status Update success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};
