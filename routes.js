var express = require("express");
var router = express.Router();
const controller = require("./controller");
const path = require("path");
const data = require("./data.json");
const fs = require("fs");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) => {
  const search = req.query.search || "";

  res.render("Home", {
    photos: data.photos.filter((p) => p.label.includes(search)),
  });
});

router.post("/add-photo", urlencodedParser, (req, res) => {
  // get data send from form
  const { label, url } = req.body;

  // console.log(label, url);

  let id = Math.floor(Math.random() * 1000) + 1;
  while (data.photos.find((p) => p.id === id)) {
    id = Math.floor(Math.random() * 1000) + 1;
  }

  data.photos.push({
    id,
    label,
    url,
  });

  fs.writeFile(
    "data.json",
    JSON.stringify({
      ...data,
    }),
    () => {
      res.redirect("/");
    }
  );
});

router.get("/delete-photo/:id", (req, res) => {
  const id = +req.params.id;

  const photo = data.photos.find((p) => p.id === id);

  if (!photo) {
    res.redirect("/");
    return;
  }

  data.photos = data.photos.filter((p) => p.id !== id);

  fs.writeFile(
    "data.json",
    JSON.stringify({
      ...data,
    }),
    () => {
      res.redirect("/");
    }
  );
});

module.exports = router;
