const express = require("express");
const path = require("path");
const {
  getInsuranceBanks,
  frontlogin,
  checkStatatSecurity,
  deleteuser,
  updateProcessingFeeStatus,
  bankdetails,
  FetchPersonalUserdetailsecondPage,
  getSecurityFeeDataWithStatusOnebyid,
  editInsuramcetype,
  PackageDataController,
  frontloginform,
  BankDetailsadd,
  updateSecurityFeeStatus,
  FetchPersonalUserdetails,
  getProcessingFeeDataWithStatusZero,
  securityAmount,
  getProcessingFeeDataWithStatusOne,
  fetchCompanyProfiletwo,
  checkStatatcurity,
  CompanyProfileScn,
  getSecurityFeeDataWithStatusOneFront,
  // AddAdmin,
  // GetAdminUser,
  // UpdateAdmin,
  updateCompanyProfile,
  getSecurityFeeDataWithStatusZero,
  personalDetailsOfUser,
  updateloantypefile,
  getProcessingFeeDataWithStatus,
  step3Details,
  getSecurityFeeDataWithStatusOne,
  stepfourdetails,
  forgotpasswordfront,
  getAllInformation,
  // getSecurityFeeDataWithStatusTwo,
  step1Details,
  frontsubmitForm,
  deleteloan,
  deletebank,
  processFeeData,
  editlontype,
  LoanTypes,
  Statusendpoint,
  updatePackage,
  fetchCompanyProfile,
  processingFeeDataFetchStatus,
  changePassword,
  userDetailData,
  loginNumber,
  GetLoanTypes,
  FetchPackageDataController,

  DeletePackage,
  // ChangeAdminPassword,
  // UploadImgMulter,
  // DeleteAdminImg,
  EditName,
  step2Details,
  // getProcessingFeeDataWithStatusTwo,
  changePasswordfirst,
  login,
  ChangeAdminPassword,
  register
} = require("../controller/User/UserLofinController");
const { default: axios } = require("axios");
const multer = require("multer");
const authMiddleware = require("./authMiddleware");
const router = express.Router();

router.get("/home", authMiddleware, (req, res) => {
  res.render("index", { title: "Dashboard", currentRoute: req.url });
});

router.get("/admin_role", authMiddleware, (req, res) => {
  res.render("admin_role", { title: "Admin Role", currentRoute: req.url });
});
router.get("/player", authMiddleware, async (req, res) => {
  try {
    const profileResponse = await fetch(
      "https://qucikloan.in/back/userDetailData"
    );

    // Check if the response is JSON
    const contentType = profileResponse.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Received non-JSON response");
    }

    const profile = await profileResponse.json();

    // Sort the profile array by creationDate (or another timestamp field)
    profile.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

    res.render("player", {
      profile,
      title: "Player Master",
      currentRoute: req.url
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.render("errorPage"); // Handle error appropriately
  }
});

router.post("/login", login);

// Route to fetch user data and render the user page
router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId);
    const apiResponse = await fetch(
      `https://qucikloan.in/back/personalDetailsOfUser/${userId}`
    );

    if (!apiResponse.ok) {
      throw new Error(`Server responded with ${apiResponse}`);
    }

    const userData = await apiResponse.json();
    // console.log(userData, "userData");
    if (!userData || userData.error) {
      res.render("user", {
        title: "User Details",
        currentRoute: req.url,
        user: null,
        error: "User not found"
      });
    } else {
      res.render("user", {
        title: "User Details",
        currentRoute: req.url,
        user: userData,
        error: null
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.render("errorPage", {
      error: "An error occurred while fetching user data."
    });
  }
});

router.get("/users-profile", authMiddleware, (req, res) => {
  res.render("users-profile", {
    title: "Users Profile",
    currentRoute: req.url
  });
});
router.get("/with_re", async (req, res) => {
  try {
    const profileResponse = await fetch(
      "https://qucikloan.in/back/getProcessingFeeDataWithStatusZero"
    );

    // Check if the response is JSON
    const contentType = profileResponse.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Received non-JSON response");
    }

    const profile = await profileResponse.json();

    res.render("with_re", {
      profile,
      currentRoute: "/back/with_re"
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.render("errorPage"); // Handle error appropriately
  }
});

router.get("/with_app", authMiddleware, async (req, res) => {
  try {
    const profileResponse = await fetch(
      "https://qucikloan.in/back/getProcessingFeeDataWithStatusOne"
    );
    const profile = await profileResponse.json();
    // console.log(profile, "profile  1");
    res.render("with_app", {
      profile,
      currentRoute: "/with_app"
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.render("errorPage"); // Handle error appropriately
  }
  // res.render("with_re", { title: "with_re", currentRoute: req.url });
});

// router.get("/with_rej", authMiddleware, async (req, res) => {
//   try {
//     const profileResponse = await fetch(
//       "https://qucikloan.in/back/getProcessingFeeDataWithStatusTwo"
//     );
//     const profile = await profileResponse.json();
//     // console.log(profile, "profile  2");
//     res.render("with_rej", {
//       profile,
//       currentRoute: "/back/with_rej"
//     });
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.render("errorPage"); // Handle error appropriately
//   }
//   // res.render("with_re", { title: "with_re", currentRoute: req.url });
// });
router.post("/updateProcessingFeeStatus", updateProcessingFeeStatus);
router.get("/chatbox", authMiddleware, (req, res) => {
  res.render("chatbox", { title: "chatbox", currentRoute: req.url });
});

router.get("/pages-login", authMiddleware, (req, res) => {
  res.render("pages-login", { title: "pages-login", currentRoute: req.url });
});

router.get("/pages-register", authMiddleware, (req, res) => {
  res.render("pages-register", {
    title: "pages-register",
    currentRoute: req.url
  });
});

router.get("/pages-contact", (req, res) => {
  res.render("pages-contact", { title: "Bonus", currentRoute: req.url });
});
router.get("/Bonus", async (req, res) => {
  try {
    // Fetch Loan Types data
    const loanResponse = await axios.get(
      "https://qucikloan.in/back/GetLoanTypes"
    );

    // Fetch Insurance Banks data
    const insuranceResponse = await axios.get(
      "https://qucikloan.in/back/getInsuranceBanks"
    );

    // Get data from both responses
    const loanData = loanResponse.data;
    const insuranceData = insuranceResponse.data;

    // Render the view with the fetched data
    res.render("bonus", {
      title: "Bonus",
      currentRoute: req.url,
      GetLoanTypes: loanData.length > 0 ? loanData : [], // Loan Types data
      getInsuranceBanks: insuranceData.length > 0 ? insuranceData : [] // Insurance Banks data
    });
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.render("bonus", {
      title: "Bonus",
      currentRoute: req.url,
      GetLoanTypes: [], // Pass empty array if there's an error
      getInsuranceBanks: [] // Pass empty array if there's an error
    });
  }
});

router.post("/LoanTypes", LoanTypes);
router.post("/editlontype/:id", editlontype);
router.delete("/deleteloan/:id", deleteloan);
router.delete("/deletebank/:id", deletebank);
router.get("/GetLoanTypes", GetLoanTypes);
router.get("/Refer", async (req, res) => {
  try {
    const response = await axios.get(
      "https://qucikloan.in/back/FetchPackageDataController"
    ); // Replace with your API endpoint
    const data = response.data;

    res.render("refer", {
      title: "Approval",
      currentRoute: req.url,
      packageData: data // Passing data to the view
    });
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.render("error", { error: "Failed to fetch data from API" });
  }
});

router.delete("/DeletePackage/:id", DeletePackage);

router.get("/rech_pe", async (req, res) => {
  try {
    const profileResponse = await fetch(
      "https://qucikloan.in/back/fetchCompanyProfile"
    );
    const profileData = await profileResponse.json();

    res.render("rech_pe", {
      profile: profileData.data,
      currentRoute: "/rech_pe"
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.render("errorPage"); // Handle error appropriately
  }
});

// router.post("/AddAdmin", AddAdmin);
// router.post("/users-profile", UploadImgMulter, UpdateAdmin);
// router.get("/AdminData", GetAdminUser);
// router.post("/ChangeAdminPassword", ChangeAdminPassword);
// router.post("/DeleteAdminImg", DeleteAdminImg);
// router.post("/sendotp", sendotp);
router.post("/step2Details", step2Details);
// router.post("/update-otp", updateotp);
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the authentication cookie
  res.json({ message: "Logged out successfully" });
});
router.post("/loginNumber", loginNumber);
router.post(
  "/getProcessingFeeDataWithStatus/:id",
  getProcessingFeeDataWithStatus
);
// Set up multer for file handling

router.get("/sec_re", async (req, res) => {
  try {
    const profileResponse = await fetch(
      "https://qucikloan.in/back/getSecurityFeeDataWithStatusZero"
    );
    const profile = await profileResponse.json();
    res.render("security_req", {
      profile,
      currentRoute: "/back/sec_re"
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.render("errorPage"); // Handle error appropriately
  }
  // res.render("with_re", { title: "with_re", currentRoute: req.url });
});

router.get("/sec_app", async (req, res) => {
  try {
    const profileResponse = await fetch(
      "https://qucikloan.in/back/getSecurityFeeDataWithStatusOne"
    );
    const profile = await profileResponse.json();
    // console.log(profile, "profile  1");
    res.render("security_app", {
      profile,
      currentRoute: "/back/sec_app"
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.render("errorPage"); // Handle error appropriately
  }
  // res.render("with_re", { title: "with_re", currentRoute: req.url });
});

// router.get("/sec_rej", async (req, res) => {
//   try {
//     const profileResponse = await fetch(
//       "https://qucikloan.in/back/getSecurityFeeDataWithStatusTwo"
//     );
//     const profile = await profileResponse.json();
//     // console.log(profile, "profile  2");
//     res.render("security_rej", {
//       profile,
//       currentRoute: "/back/sec_rej"
//     });
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.render("errorPage"); // Handle error appropriately
//   }
//   // res.render("with_re", { title: "with_re", currentRoute: req.url });
// });

router.get("/getAllInformation/:id", getAllInformation);
router.post("/step1Details", step1Details);
router.post("/editname", EditName);
router.post("/stepfourdetails", stepfourdetails);
router.put("/updatePackage/:id", updatePackage);
// ("");
router.get("/FetchPackageDataController", FetchPackageDataController);
router.post("/PackageDataController", PackageDataController);
router.get("/fetchCompanyProfile", fetchCompanyProfile);
router.get("/fetchCompanyProfiletwo/:userId", fetchCompanyProfiletwo);
router.post("/processingFeeDataFetchStatus", processingFeeDataFetchStatus);
// router.get(
//   "/getProcessingFeeDataWithStatusTwo",
//   getProcessingFeeDataWithStatusTwo
// );
router.post("/updateSecurityFeeStatus", updateSecurityFeeStatus);
router.post("/securityAmount", securityAmount);
router.get(
  "/getProcessingFeeDataWithStatusOne",
  getProcessingFeeDataWithStatusOne
);
router.get(
  "/getProcessingFeeDataWithStatusZero",
  getProcessingFeeDataWithStatusZero
);
router.get("/CompanyProfileScn", CompanyProfileScn);
router.get("/Statusendpoint/:userId", Statusendpoint);
router.get("/getSecurityFeeDataWithStatusOne", getSecurityFeeDataWithStatusOne);
router.get(
  "/getSecurityFeeDataWithStatusOneFront/:userId",
  getSecurityFeeDataWithStatusOneFront
);
// router.post("/securityAmount", securityAmount);
// router.get("/getSecurityFeeDataWithStatusTwo", getSecurityFeeDataWithStatusTwo);
router.get(
  "/getSecurityFeeDataWithStatusZero",
  getSecurityFeeDataWithStatusZero
);
router.post("/bankdetails", bankdetails);
router.get("/userDetailData", userDetailData);
router.post("/changePasswordfirst", changePasswordfirst);
router.post("/ChangeAdminPassword", ChangeAdminPassword);
// router.post("/UpdateCompanyProfile", UpdateCompanyProfile);
router.get("/personalDetailsOfUser/:userId", personalDetailsOfUser);
router.get("/FetchPersonalUserdetails/:userId", FetchPersonalUserdetails);
router.get(
  "/FetchPersonalUserdetailsecondPage/:userId",
  FetchPersonalUserdetailsecondPage
);

// Route to update company profile

router.get("/checkStatatcurity/:userId", checkStatatcurity);
router.post("/frontloginform", frontloginform);
router.delete("/deleteuser/:Id", deleteuser);
router.post("/register", register);
router.post("/frontlogin", frontlogin);
router.post("/forgot-password-front", forgotpasswordfront);
router.get("/getInsuranceBanks", getInsuranceBanks);

// Define the route for form submission

// Set storage engine to save files on disk

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});
router.post("/BankDetailsadd", upload.single("imageadd"), BankDetailsadd);

// Edit insurance type route (no file upload needed)
router.post(
  "/editInsuramcetype/:id",
  upload.single("image"),
  editInsuramcetype
);

router.post(
  "/frontsubmitForm",
  upload.fields([
    { name: "profilePhotoUpload", maxCount: 1 },
    { name: "adharcardFront", maxCount: 1 },
    { name: "adharcardBack", maxCount: 1 },
    { name: "pancardPhoto", maxCount: 1 },
    { name: "capturedPhoto", maxCount: 1 }
  ]),
  frontsubmitForm
);
router.get("/checkStatatSecurity/:userId", checkStatatSecurity);
router.post("/updateloantypefile", updateloantypefile);
// Apply the middleware to the route
const uploadMiddleware = upload.fields([
  { name: "paymentQRCharges1", maxCount: 1 },
  { name: "paymentQRCharges2", maxCount: 1 },
  { name: "Signature", maxCount: 1 },
  {
    name: "logo",
    maxCount: 1
  }
]);
router.post("/UpdateCompanyProfile", uploadMiddleware, updateCompanyProfile);

module.exports = router;
