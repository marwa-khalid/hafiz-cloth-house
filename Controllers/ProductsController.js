const ProductsPage = async (request, response, next) => 
{
    const currentPageCategory = request.body.name || request.query.name || "Products";

    response.render("./Products", {"currentPageCategory": currentPageCategory});
}

module.exports = 
{
    ProductsPage
};