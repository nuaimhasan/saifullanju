const { calculatePagination } = require("../../utils/calculatePagination");
const { pick } = require("../../utils/pick");
const Model = require("./trainingOrderModel");
const Training = require("../training/trainingModel");
const { sendTrainingTicket } = require("../../utils/emailSend");

exports.createOrder = async (req, res) => {
  const data = req.body;
  try {
    const training = await Training.findById(data?.training);
    if (!training) {
      res.json({
        success: false,
        message: "Training not found",
      });
    }

    const lastOrder = await Model.findOne().sort({ createdAt: -1 });
    let ticketNumber = `570${training?.sl}-0001`;

    if (lastOrder) {
      const lastTicketNumber = lastOrder.ticketNumber;
      const lastNumber = parseInt(lastTicketNumber.split("-")[1]);
      const newNumber = lastNumber + 1;
      ticketNumber = `570${training?.sl}-${newNumber
        .toString()
        .padStart(4, "0")}`;
    } else {
      ticketNumber = `570${training?.sl}-0001`;
    }

    const newData = {
      ...data,
      training: training?._id,
      ticketNumber,
    };

    const result = await Model.create(newData);

    res.json({
      success: true,
      message: "Order created successfully",
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

exports.getAllOrders = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const { user, training, status } = req.query;

  try {
    const query = {};
    if (user && user !== "null" && user !== "undefined")
      query["user.email"] = user;

    if (
      training &&
      training !== "null" &&
      training !== "undefined" &&
      training !== "all"
    ) {
      query.training = training;
    }

    if (
      status &&
      status !== "null" &&
      status !== "undefined" &&
      status !== "all"
    ) {
      query.status = status;
    }

    const data = await Model.find(query)
      .populate("training")
      .limit(limit)
      .skip(skip);

    const total = await Model.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.json({
      success: true,
      message: "Orders fetched successfully",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Model.findById(id).populate("training");

    res.json({
      success: true,
      message: "Training Order get successfully",
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

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const isExist = await Model.findById(id).populate("training");
    if (!isExist) {
      return res.json({
        success: false,
        message: "Training Order not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, { status }, { new: true });

    const { email, name } = isExist?.user;
    const training = isExist?.training;
    const order = isExist;

    if (status === "approved" && result?._id && email) {
      sendTrainingTicket(email, name, training, order);
    }

    res.json({
      success: true,
      message: "Training Order status updated successfully",
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

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const isExist = await Model.findById(id).populate("training");
    if (!isExist) {
      return res.json({
        success: false,
        message: "Training Order not found",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Training Order deleted successfully",
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
