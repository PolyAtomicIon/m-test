var express = require("express");
var router = express.Router();
const controller = require("./controller");
const path = require("path");

router.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      title: "Bread",
      price: 23,
    },
    {
      id: 2,
      title: "Bread",
      price: 12,
    },
    {
      id: 3,
      title: "Bread",
      price: 323,
    },
    {
      id: 4,
      title: "Bread",
      price: 23,
    },
    {
      id: 5,
      title: "Bread",
      price: 3454,
    },
  ];
  res.status(200).json(products);
});

router.get("/profile", (req, res) => {
  res.status(200).json({ message: "Profile !" });
});

module.exports = router;
