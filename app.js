const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fileUpload = require("express-fileupload");
const handlebarsHelpers = require("./helpers/handlebars");
app.use(
  fileUpload({
    limits: { filesize: 50 * 1024 * 1024 }
  })
);

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: handlebarsHelpers
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(
  session({
    secret: "sombrero",
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static(__dirname + "/public"));

//
// Routers
const main = require("./router/main");
const actions = require("./router/actions");
const singleAction = require("./router/singleActions");
const cart = require("./router/cart");
const contact = require("./router/contact");
const delivery = require("./router/delivery");
const general = require("./router/general");
const allOffers = require("./router/offers");
const category = require("./router/category");
const banner = require("./router/banner");
app.use(banner);
app.use(allOffers);
app.use(general);
app.use(singleAction);
app.use(delivery);
app.use(contact);
app.use(cart);
app.use(main);
app.use(actions);
app.use(category);

app.listen(PORT, () => {
  console.log("Server working");
});
