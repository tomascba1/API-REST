require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
require("./config/db");
const path = require("path");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3030;

//Handlebars Config
app.engine(".hbs", exphbs.engine({
    defaultLayout: "main",
    extname: "hbs",
    helpers: require("./utils/hbsFunctions"),
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

//API Config
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//API Routes
app.use("/api/users", require("./routes/usersRt"));
app.use("/api/products", require("./routes/productsRt"));

app.listen(PORT, (err) => {
  !err
    ? console.log(`API listening on port ${PORT}`)
    : console.log(`Server down: ${err}`);
});

//Error Handler
app.use((req, res, next) => {
  let error = new Error();
  error.message = "Resource Not Found";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (!error.status) error.status = 400;
  res
    .status(error.status)
    .json({ status: error.status, message: error.message });
});
