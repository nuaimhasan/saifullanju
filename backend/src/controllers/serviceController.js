const Service = require("../models/serviceModel");
const fs = require("fs");

exports.add = async (req, res) => {
  const icon = req?.file?.filename;
  const data = req?.body;

  if (!icon) {
    return res.json({
      success: false,
      message: "Image or Icon is missing",
    });
  }

  try {
    const newData = {
      ...data,
      icon: `/services/${icon}`,
    };
    const result = await Service.create(newData);

    if (!result) {
      return res.json({
        success: false,
        message: "Service not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service created successfully",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/services/${icon}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Service.find({});

    if (!result) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service found",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Service.findById(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service found successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const icon = req?.file?.filename;
  const data = req?.body;

  try {
    const isServiceExists = await Service.findById(id);
    if (!isServiceExists) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    let newData = {
      ...data,
      icon: icon ? `/services/${icon}` : isServiceExists?.icon,
    };

    const result = await Service.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: result,
    });

    if (result && icon) {
      fs.unlink(`./uploads/${isServiceExists?.icon}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Service.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: result,
    });

    fs.unlink(`./uploads/${result?.icon}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
