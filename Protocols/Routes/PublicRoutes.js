const express = require("express");
const router = express.Router();

const HomePageController = require("../../Controllers/HomePageController");
const ProductsController = require("../../Controllers/ProductsController");
const ProductViewController = require("../../Controllers/ProductViewController");

const { HomePage, AboutUsPage, ContactUsPage, } = HomePageController;
const { ProductsPage } = ProductsController;
const { ProductViewPage } = ProductViewController;

router.get("/", HomePage);
router.get("/products", ProductsPage);
router.post("/products", ProductsPage);
router.get("/productview", ProductViewPage);

module.exports = router;