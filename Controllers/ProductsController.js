const ProductsPage = async (request, response, next) => 
{
    const currentPageCategory = request.body.categoryName || request.query.categoryName || "Products";

    response.render("./Products", {"currentPageCategory": currentPageCategory});
}

module.exports = 
{
    ProductsPage
};