var express = require("express");
var router = express.Router();
const controller = require("./controller");
const path = require("path");
const data = require("./data.json");
const fs = require("fs");

router.get("/", (req, res) => {
  //   res.status(200).json({ message: "Hello world !" });

  res.render("Home");
});

router.get("/products", (req, res) => {
  res.render("Products", { products: data.products, cart: data.cart });
});

router.get("/add-to-cart/:id", (req, res) => {
  const id = +req.params.id;

  const product = data.products.find((p) => p.id === id);

  if (data.cart.find((p) => p.id === id)) {
    res.redirect("/products");
    return;
  }

  data.cart.push(product);

  fs.writeFile(
    "data.json",
    JSON.stringify({
      ...data,
    }),
    () => {
      res.redirect("/products");
    }
  );
});

router.get("/delete-from-cart/:id", (req, res) => {
  const id = +req.params.id;

  const product = data.products.find((p) => p.id === id);

  if (!product) {
    res.redirect("/products");
    return;
  }

  data.cart = data.cart.filter((p) => p.id !== id);

  fs.writeFile(
    "data.json",
    JSON.stringify({
      ...data,
    }),
    () => {
      res.redirect("/products");
    }
  );
});

router.get("/profile", (req, res) => {
  //   res.status(200).json({ message: "Profile !" });

  res.sendFile(path.join(__dirname, "views/profile.html"));
});

module.exports = router;
