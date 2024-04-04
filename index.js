const http = require("http");
const express = require("express");
const path = require("path");
const { PORT } = require("./config");
const router = require("./routes");
const api = require("./api");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);
app.use("/api", api);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
