const fs = require("fs");
const Favicon = require("../models/faviconModel");

exports.addFavicon = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    if (!icon) {
      return res.json({
        success: false,
        message: "Favicon is required",
      });
    }

    const data = {
      icon: `/favicon/${icon}`,
    };

    const isFavicon = await Favicon.findOne({});
    if (isFavicon && icon) {
      fs.unlink(`./uploads/favicon/${icon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.json({
        success: false,
        message: "Favicon already exists",
      });
    }

    const result = await Favicon.create(data);

    res.status(200).json({
      success: true,
      message: "Favicon added successfully",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/favicon/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.getFavicons = async (req, res) => {
  try {
    const favicons = await Favicon.findOne({});

    res.status(200).json({
      success: true,
      message: "Favicon found successfully",
      data: favicons,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateFavicon = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    if (!icon) {
      return res.json({
        success: false,
        message: "Favicon is required",
      });
    }

    const id = req?.params?.id;
    const isFavicon = await Favicon.findById(id);

    if (isFavicon) {
      const result = await Favicon.findByIdAndUpdate(
        id,
        { icon: `/favicon/${icon}` },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Favicon updated successfully",
      });

      if (result) {
        fs.unlink(`./uploads/${isFavicon?.icon}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  } catch (error) {
    fs.unlink(`./uploads/favicon/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.son({
      success: false,
      message: error.message,
    });
  }
};
