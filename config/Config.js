const dotenv = require("dotenv");
dotenv.config();

// Configuration object with various settings
const config = {
  // MongoDB connection URI
  baseUrl: "https://qucikloan.in",
  mongoURI:
    "mongodb+srv://worldpay472:AqtSlTDgrYah1D5T@cluster0.rsun1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  // AqtSlTDgrYah1D5T

  port: 8000
};
module.exports = config;
