const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json({limit: '50mb'})); // default vì request entity too large
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json()); // sử dụng bodyParser để nhận được require.body mà từ phía client gửi lên
app.use(cookieParser());
routes(app);
mongoose
  .connect(`${process.env.MONGO_DB_APP}`)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Sever is running in port: ", +port);
});