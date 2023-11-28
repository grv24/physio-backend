const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const multer = require("multer");
const Download = require("./models/Download/downloadModel");
const { errorHandler } = require("./middleware/errorMiddleware");
const dbConnect = require("./db/db");
const bodyParser = require('body-parser');
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

dbConnect();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./routes/User/userRoute"));
app.use("/api", require("./routes/ContactUs/contactusRoute"));
app.use("/api", require("./routes/Downloads/downloadRoutes"));
app.use("/api", require("./routes/Article/articleRoute"));
app.use("/api", require("./routes/Email/verifyEmailRoutes"));
app.use("/api", require("./routes/HomePage/homePageRoute"));
app.use("/api", require("./routes/Contest/contestRoutes"));
app.use("/api", require("./routes/MobileApp/mobileAppRoute"));
app.use("/api", require("./routes/Advertisement/advertisementRoute"));
app.use("/api", require("./routes/Testimonials/testimonialsRoute"));
app.use("/api", require("./routes/Team/teamMemberRoute"));
app.use("/api", require("./routes/footer/footerRoutes"));
app.use("/api", require("./routes/Networks/networksRoutes"));
app.use("/api", require("./routes/issue/issue"));
app.use("/api", require("./routes/AnnualSubscription/AnnualSubscription"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/adminControls"));
app.use("/api", require("./routes/author"));
app.use("/api", require("./routes/changePassword"));
app.use("/api", require("./routes/forgotPassword"));
app.use("/api", require("./routes/AdvisoryBoard/advisoryBoardRoute"));

app.use("/documents", express.static('documents'));
app.use(
  express.static("uploads")
);

app.get("/", (req, res) => res.send("Please set to production"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));