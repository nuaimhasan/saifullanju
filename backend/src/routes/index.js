const express = require("express");
const router = express.Router();

//------------------------------------------------------------------------------
// import Routes
//------------------------------------------------------------------------------
const user = require("../modules/user/userRoutes");

const logoRouter = require("./logoRoutes");
const faviconRouter = require("./faviconRoutes");
const speech = require("./speechRoutes");

const contactRouter = require("./contactRoutes");
const aboutRouter = require("./aboutRoutes");

const blogCategory = require("./blog/categoryRoutes");
const blog = require("./blog/blogRoutes");
const service = require("./serviceRoute");
const involement = require("./involementRoutes");
const pm = require("./pmRoutes");

const training = require("../modules/training/trainingRoutes");
const trainingOrder = require("../modules/trainingOrder/trainingOrderRoutes");

const book = require("../modules/book/bookRoutes");
const bookOrder = require("../modules/bookOrder/bookOrderRoutes");

const shippingConfig = require("../modules/shippingConfig/shippingConfigRoutes");
const paymentInstruction = require("../modules/paymentInstruction/paymentInstructionRoutes");

const seo = require("./seoRoutes");

//------------------------------------------------------------------------------
// use Routes
//------------------------------------------------------------------------------

router.use("/user", user);

router.use("/logo", logoRouter);
router.use("/favicon", faviconRouter);
router.use("/speech", speech);

router.use("/contact", contactRouter);
router.use("/about", aboutRouter);

router.use("/blog/category", blogCategory);
router.use("/blog", blog);
router.use("/service", service);
router.use("/involement", involement);
router.use("/programs-methodology", pm);

router.use("/training", training);
router.use("/trainingOrder", trainingOrder);

router.use("/book", book);
router.use("/bookOrder", bookOrder);


router.use("/shipping-config", shippingConfig);
router.use("/payment-instruction", paymentInstruction);

router.use("/seo", seo);

module.exports = router;
