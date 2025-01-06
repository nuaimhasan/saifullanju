const verifyAdmin = require("../middleware/verifyAdmin");
const {
  getContacts,
  addContact,
  updateContact,
} = require("../controllers/contactController");

const router = require("express").Router();

router.get("/", getContacts);
router.post("/add", addContact);
router.patch("/update/:id", updateContact);

module.exports = router;
