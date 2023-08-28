const path = require("path");
const fs = require("fs");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function(request, file, cb) 
                {
                    cb(null, "ProductFilesUploads/");
                },
    filename: function(request, file, cb) 
                {
                    let extension = path.extname(file.originalname);
                    cb(null, Date.now() + extension);
                }
});

var upload = multer({
    storage: storage,
    fileFilter: function (request, file, callback) 
                {
                    const filePath = path.join("ProductFilesUploads", file.originalname);
                    if (fs.existsSync(filePath))
                    {
                        if (!(request.body.existingProductPics))
                        {
                            request.body.existingProductPics = [];
                        }
                        request.body.existingProductPics.push(filePath);

                        callback(null, false);
                    }
                    else
                    {
                        callback(null, true);
                    }
                }
}).array('productPics', 4);

module.exports = upload;