const mongoose = require("mongoose");

const formschema = new mongoose.Schema({
  usermail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Form = mongoose.model("Form", formschema);

module.exports = Form;
