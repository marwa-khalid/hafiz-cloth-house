const OrderManagementPage = async (request, response, next) => 
{
    response.render("./OrderManagement");
}

module.exports = {
    OrderManagementPage
};