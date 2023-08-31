const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UsersController");
const orderController = require("../controllers/ordersController");
const adminController = require("../controllers/adminscontroller");
const partnerController = require("../controllers/partnersController");
const productController = require("../controllers/productsController");
const paymentController = require("../controllers/paymentsController");
const verifyJWT = require("../middlewares/verifyJWT");
const multer = require("multer");
const path = require("path");

///////////////////////////
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
///////////////////////////

/// Admin Router
router.post("/CreateAdmin", adminController.handleCreateNewUser);
router.post("/loginAdmin", adminController.checkAdmin);

/// User Router
router.get("/GetAllUsers", UserController.handleGetAllUsers);
router.post("/CreateUser", UserController.handleCreateNewUser);
router.post("/loginUser", UserController.checkUser);
router.get("/users_count", verifyJWT.verifyJWT, UserController.getUserCount);
router.get("/users/:id", UserController.getUserById);
router.put("/updateuserProfile/:id", UserController.updateUserInfo);
router.put("/usersPerPage", UserController.handleGetUserPerPage);
router.put("/delete_user/:id", UserController.deleteUser);

/// Partners Router
router.post(
  "/AddNewPartner",
  verifyJWT.verifyJWT,
  upload.single("images"),
  partnerController.AddNewPartner
);
router.get(
  "/GetAllPartners",
  verifyJWT.verifyJWT,
  partnerController.handleGetAllPartners
);
router.get(
  "/GetAllPartners",
  verifyJWT.verifyJWT,
  partnerController.handleGetAllPartners
);
router.get(
  "/partner/:id",
  verifyJWT.verifyJWT,
  partnerController.handleGetPartnerById
);
router.put(
  "/delete_partner/:id",
  verifyJWT.verifyJWT,
  partnerController.deletePartner
);
router.post(
  "/update_partner/:id",
  verifyJWT.verifyJWT,
  upload.single("images"),
  partnerController.UpdatePartner
);
router.get("/partners_count", verifyJWT.verifyJWT, UserController.getUserCount);

/// products Router
router.post(
  "/AddNewProduct",
  verifyJWT.verifyJWT,
  upload.single("images"),
  productController.AddNewProduct
);
router.get(
  "/ProductsCount",
  verifyJWT.verifyJWT,
  productController.getProductsCount
);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getMainCategories", productController.getMainCategories);
router.get("/brSub", productController.breadSubCat);
router.get("/caSub", productController.cakeSubCat);
router.get("/coSub", productController.cookiesSubCat);
router.get("/allSub", productController.allPurposeSubCat);
router.get("/product/:id", productController.handleGetProductById);
router.put("/getProductPerPage", productController.handleprdperpage);
router.get("/getbreadProducts", productController.getBreadProducts);
router.get("/getcakeProducts", productController.getCakeProducts);
router.get("/getcookiesProducts", productController.getCookiesProducts);
router.put(
  "/delete_Product/:id",
  verifyJWT.verifyJWT,
  productController.deleteProduct
);
router.put(
  "/Update_Product/:id",
  verifyJWT.verifyJWT,
  productController.updateProductInfoAdmin
);
router.put(
  "/Update_Stock",
  verifyJWT.verifyJWT,
  productController.updateOutOfStock
);

router.post(
  "/update_product/:id",
  verifyJWT.verifyJWT,
  upload.single("images"),
  productController.updateProduct
);

router.put("/updateprdByuser", productController.handlePodutUpdateByUser);
router.get("/getUserProducts/:id", productController.handleprodeuctByuserId);

/// Orders Router
router.post("/newOrder", orderController.handleNewOrder);
router.get("/orderByUserId", orderController.handleGetOrdersByUserId);
router.get("/allOrders", orderController.handleGetOrders);

// Payments Router
router.post("/newPay", paymentController.handleAddNewPay);
router.get("/AllPays", paymentController.handleGetAllPayments);
router.get("/PaysByUserId", paymentController.getPaysByUserId);

module.exports = router;
