const { Product } = require("../Models/ProductModel");

const ProductsPage = async (request, response, next) => 
{
    const currentPageCategory = request.body.categoryName || request.query.categoryName || "Products";

    response.render("./Products", {"currentPageCategory": currentPageCategory});
}

const InsertProduct = async (request, response) => 
{
    // ACCEPTING FOLLOWING VARIABLES
    // { productID, productTitle, productDescription, productPrice, productCategory, productSubCategory, productPics, productDeliveryDetails, productNote, productIsNewCollection, productIsSaleCollection, productSalePercentage }

    var ProductModelObject = new Product();
    var uploadedProductPicsArray = [];

    if (request.files) 
    {
        request.files.forEach(function (file, index, array) 
                                {
                                    uploadedProductPicsArray.push(file.path);
                                });
    }

    ProductModelObject.productTitle = request.body.productTitle;
    ProductModelObject.productDescription = request.body.productDescription;
    ProductModelObject.productPrice = request.body.productPrice;
    ProductModelObject.productInStockQuantity = request.body.productInStockQuantity;
    ProductModelObject.productCategory = request.body.productCategory;
    ProductModelObject.productSubCategory = request.body.productSubCategory;
    ProductModelObject.productPics = uploadedProductPicsArray;
    ProductModelObject.productDeliveryDetails = request.body.productDeliveryDetails;
    ProductModelObject.productNote = request.body.productNote;
    ProductModelObject.productIsNewCollection = request.body.productIsNewCollection;
    ProductModelObject.productIsSaleCollection = request.body.productIsSaleCollection;
    ProductModelObject.productSalePercentage = request.body.productSalePercentage;

    const InsertedProduct = await ProductModelObject.save();
    
    if (InsertedProduct)
    {
        response.json({"status": true, "code": 200, "message": "Product Date Inserted Successfully", "data": InsertedProduct});
    }
    else 
    {
        response.json({"status": false, "code": 500, "message": "Unable to Insert Product Date", "data": ""});
    }
}

const UpdateProduct = async (request, response) => 
{
    // ACCEPTING FOLLOWING VARIABLES EXCEPT Product_ID
    // { userAccountID, attendeeUserType, attendeeProfileID, ProductDateAndTime, attendeeIpAddress }

    if (!(request.params.id == null || request.params.id == ""))
    {
        var ProductModelObject = await Product.findById(request.params.id);

        if (!(ProductModelObject == null || ProductModelObject == ""))
        {
            var uploadedProductPicsArray = [];

            if (request.files) 
            {
                request.files.forEach(function (file, index, array) 
                                        {
                                            uploadedProductPicsArray.push(file.path);
                                        });
            }

            if (uploadedProductPicsArray.length <= 0)
            {
                uploadedProductPicsArray = uploadedProductPicsArray.concat(request.body.existingProductPics);
            }

            ProductModelObject.productTitle = request.body.productTitle;
            ProductModelObject.productDescription = request.body.productDescription;
            ProductModelObject.productPrice = request.body.productPrice;
            ProductModelObject.productInStockQuantity = request.body.productInStockQuantity;
            ProductModelObject.productCategory = request.body.productCategory;
            ProductModelObject.productSubCategory = request.body.productSubCategory;
            ProductModelObject.productPics = uploadedProductPicsArray;
            ProductModelObject.productDeliveryDetails = request.body.productDeliveryDetails;
            ProductModelObject.productNote = request.body.productNote;
            ProductModelObject.productIsNewCollection = request.body.productIsNewCollection;
            ProductModelObject.productIsSaleCollection = request.body.productIsSaleCollection;
            ProductModelObject.productSalePercentage = request.body.productSalePercentage;

            const UpdatedProduct = await ProductModelObject.save();
            
            if (UpdatedProduct)
            {
                response.json({"status": true, "code": 200, "message": "Product Date Updated Successfully", "data": UpdatedProduct});
            }
            else 
            {
                response.json({"status": false, "code": 500, "message": "Unable to Update Product Date", "data": ""});
            }
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "No Product Record Found", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Unable to Update Specific Record", "data": ""});
    }
}

const DeleteProduct = async (request, response) =>
{
    if (!(request.params.id == null || request.params.id == ""))
    {
        Product.findByIdAndDelete(request.params.id, (error, success)=>{
            if (error)
            {
                response.json({"status": true, "code": 500, "message": "Unable to Delete Product Record", "data": ""});
            }
            else
            {
                response.json({"status": true, "code": 200, "message": "Product Record Deleted Successfully", "data": "Record Deleted Successfully"});
            }
        })
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Unable to Delete Product Record", "data": ""});
    }
}

const ViewProductAll = async (request, response) =>
{
    var ProductModelObject = await Product.find();

    if (!(ProductModelObject == null || ProductModelObject == ""))
    {
        response.json({"status": true, "code": 200, "message": "Product Record Fetched Successfully", "data": ProductModelObject});
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "No Product Found", "data": ""});
    }
}

const ViewProductOne = async (request, response) =>
{
    if (!(request.params.id == null || request.params.id == ""))
    {
        var ProductModelObject = await Product.findById(request.params.id);

        if (!(ProductModelObject == null || ProductModelObject == ""))
        {
            response.json({"status": true, "code": 200, "message": "Product Record Fetched Successfully", "data": ProductModelObject});
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "No Product Found", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Unable to Fetch Product", "data": ""});
    }
}

module.exports = 
{
    ProductsPage, InsertProduct, UpdateProduct, DeleteProduct, ViewProductAll, ViewProductOne
};