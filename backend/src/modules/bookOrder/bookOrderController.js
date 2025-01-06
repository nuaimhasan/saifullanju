const { calculatePagination } = require("../../utils/calculatePagination");
const { pick } = require("../../utils/pick");
const Model = require("./bookOrderModel");
const Book = require("../book/bookModel");

exports.addOrder = async (req, res) => {
  let invoiceNumber = "00001";
  let data = req?.body;

  try {
    const book = await Book.findById(data?.book);
    if (!book) {
      return res.json({
        success: false,
        message: "Book not found",
      });
    } else if (book?.quantity < data?.quantity) {
      return res.json({
        success: false,
        message: "Book quantity is not enough",
      });
    }

    const lastOrder = await Model.findOne().sort({ createdAt: -1 });
    if (lastOrder && lastOrder?.invoiceNumber) {
      const invoiceNb = lastOrder?.invoiceNumber;
      const newNumber = parseInt(invoiceNb) + 1;
      invoiceNumber = `${newNumber.toString().padStart(4, "0")}`;
    }

    const orderData = {
      ...data,
      invoiceNumber,
    };

    const result = await Model.create(orderData);

    // Update book quantity
    if (result?._id) {
      if (book?.quantity && orderData?.quantity) {
        const newQuantity = book?.quantity - orderData?.quantity;
        await Book.findByIdAndUpdate(orderData?.book, {
          quantity: newQuantity,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Book Order added successfully",
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
  const { user, book } = req.query;

  try {
    const query = {};
    if (user && user !== "null" && user !== "undefined")
      query["user.email"] = user;

    if (book && book !== "null" && book !== "undefined" && book !== "all") {
      query["book"] = book;
    }

    const data = await Model.find(query)
      .populate("book")
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
    const result = await Model.findById(id).populate("book");

    res.json({
      success: true,
      message: "Book Order get successfully",
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

exports.updateStatus = async (req, res) => {
  const id = req?.params?.id;
  const status = req?.body?.status;

  try {
    const result = await Model.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
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
