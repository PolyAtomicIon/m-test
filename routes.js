var express = require("express");
var router = express.Router();
const controller = require("./controller");
const path = require("path");
const data = require("./data.json");
const fs = require("fs");

router.get("/", (req, res) => {
  res.render("Home", { photos: data.photos });
});

// router.post("/add-photo", (req, res) => {
//   const id = +req.params.id;

//   const product = data.products.find((p) => p.id === id);

//   if (data.cart.find((p) => p.id === id)) {
//     res.redirect("/products");
//     return;
//   }

//   data.cart.push(product);

//   fs.writeFile(
//     "data.json",
//     JSON.stringify({
//       ...data,
//     }),
//     () => {
//       res.redirect("/products");
//     }
//   );
// });

// router.get("/delete-photo/:id", (req, res) => {
//   const id = +req.params.id;

//   const product = data.products.find((p) => p.id === id);

//   if (!product) {
//     res.redirect("/products");
//     return;
//   }

//   data.cart = data.cart.filter((p) => p.id !== id);

//   fs.writeFile(
//     "data.json",
//     JSON.stringify({
//       ...data,
//     }),
//     () => {
//       res.redirect("/products");
//     }
//   );
// });

module.exports = router;
