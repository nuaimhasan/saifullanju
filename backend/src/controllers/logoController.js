const fs = require("fs");
const Logo = require("../models/logoModel");

exports.addLogo = async (req, res) => {
  const logo = req?.file?.filename;

  try {
    if (!logo) {
      return res.json({
        success: false,
        message: "Logo is requred",
      });
    }

    const isLogo = await Logo.findOne();
    if (isLogo && logo) {
      fs.unlink(`./uploads/logo/${logo}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      return res.json({
        success: false,
        message: "Logo already exists",
      });
    }

    const result = await Logo.create({ logo: logo });

    if (!result) {
      return res.json({
        success: false,
        message: "Logo not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo added successfully",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/logo/${logo}`, (err) => {
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

exports.getLogos = async (req, res) => {
  try {
    const logo = await Logo.findOne({});

    if (!logo) {
      return res.json({
        success: false,
        message: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo found successfully",
      data: logo,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLogo = async (req, res) => {
  const logo = req?.file?.filename;

  try {
    if (!logo) {
      return res.json({
        success: false,
        message: "Logo is required",
      });
    }

    const id = req?.params?.id;
    const isLogo = await Logo.findOne({ _id: id });

    if (isLogo) {
      await Logo.findByIdAndUpdate(id, { logo: logo }, { new: true });

      fs.unlink(`./uploads/logo/${isLogo?.logo}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      res.status(200).json({
        success: true,
        message: "Logo updated successfully",
      });
    }
  } catch (error) {
    fs.unlink(`./uploads/logo/${logo}`, (err) => {
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
