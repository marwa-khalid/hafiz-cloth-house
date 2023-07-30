const HomePage = async (request, response, next) => 
{
    response.render("./HomePage");
}

module.exports = {
    HomePage
};