require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
require("./config/db");
const PORT = process.env.PORT || 3030;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/usersRt"));
app.use("/api/products", require("./routes/productsRt"))

app.listen(PORT, (err) => {
  !err
    ? console.log(`API listening on port ${PORT}`)
    : console.log(`Server down: ${err}`);
});

app.use((req, res, next) => {
  let error = new Error();
  error.message = "Resource Not Found";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.status)
    .json({ status: error.status, message: error.message });
});
