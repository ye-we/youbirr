const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
// const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const packageRoute = require("./routes/packages");
const creatorRoute = require("./routes/creators");
const balanceRoute = require("./routes/balance");
const TransactionDeposit = require("./models/TransactionDeposit");
const multer = require("multer");

const { checkObjectId } = require("./helpers");

dotenv.config();
mongoose.connect(
  process.env.HOST,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to database");
    }
  }
);
//middleware
app.use(express.json());
app.use(helmet());
if (process.env.NODE_ENV == "development") app.use(morgan("common"));
app.use(checkObjectId);
app.use(express.static(`${__dirname}/public`));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "file uploaded successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/package", packageRoute);
app.use("/api/users", userRoute);
app.use("/api/creators", creatorRoute);
app.use("/api/balance", balanceRoute);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  // const transaction = new TransactionDeposit({
  //   transactionNumber: "1239",
  //   amount: 10000,
  // });
  // await transaction.save();
  // const t = await TransactionDeposit.findOne({ transactionNumber: "1236" });
  // console.log(t);
  console.log("Backend server is running on port " + PORT);
  if (process.env.NODE_ENV == "production") console.log("production");
});
