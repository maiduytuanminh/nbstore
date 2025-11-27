const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, ProductController.createProduct);
router.put("/update/:id", authMiddleware, ProductController.updateProduct);
router.get("/get-details/:id", ProductController.getDetailsProduct);
router.delete("/delete/:id", authMiddleware, ProductController.deleteProduct);
router.get("/get-all", ProductController.getAllProduct); // Chỉ có isAdmin mới được xem getAll
router.post("/delete-many", authMiddleware, ProductController.deleteMany);
router.get("/get-all-type", ProductController.getAllType);

// Product Type Management Routes
router.get("/get-all-types", ProductController.getAllProductType); // Get full ProductType data
router.post(
    "/create-type",
    authMiddleware,
    ProductController.createProductType
);
router.put(
    "/update-type/:id",
    authMiddleware,
    ProductController.updateProductType
);
router.delete(
    "/delete-type/:id",
    authMiddleware,
    ProductController.deleteProductType
);

// Best Seller Products
router.get("/get-best-sellers", ProductController.getBestSellerProducts);

module.exports = router;
