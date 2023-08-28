const ProductManagementPage = async (request, response, next) => 
{
    response.render("./ProductManagement");
}

module.exports = {
    ProductManagementPage
};