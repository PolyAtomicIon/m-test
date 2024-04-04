var express = require("express");
var router = express.Router();
const controller = require("./controller");
const path = require("path");

router.get("/", (req, res) => {
  //   res.status(200).json({ message: "Hello world !" });

  res.render("Home");
});

router.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      title: "Bread",
      price: 23,
    },
    {
      id: 2,
      title: "FDASF",
      price: 12,
    },
    {
      id: 3,
      title: "fDAFSF",
      price: 323,
    },
    {
      id: 4,
      title: "BreaFSDFd",
      price: 23,
    },
    {
      id: 5,
      title: "ADFSD",
      price: 3454,
    },
  ];

  res.render("Products", { products });
});

router.get("/profile", (req, res) => {
  //   res.status(200).json({ message: "Profile !" });

  res.sendFile(path.join(__dirname, "views/profile.html"));
});

module.exports = router;
