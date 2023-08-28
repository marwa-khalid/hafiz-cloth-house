const express = require("express");
const app = express();

const ProductController = require("../../Controllers/ProductsController");

const FileUploadMiddleware = require("../../Middlewares/FileUpload");

const { InsertProduct, UpdateProduct, DeleteProduct, ViewProductAll, ViewProductOne } = ProductController;

app.post('/', FileUploadMiddleware, InsertProduct);
app.put('/:id', FileUploadMiddleware, UpdateProduct);
app.delete('/:id', DeleteProduct);
app.get('/', ViewProductAll);
app.get('/:id', ViewProductOne);

module.exports = app;