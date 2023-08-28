const mongoose = require("mongoose");

const Product = mongoose.model('Product', new mongoose.Schema(
{
    productTitle: {
        type: String,
        required: [ true, 'Product Title is Required' ],
    },

    productDescription: {
        type: String,
        required: [ true, 'Product Description is Required' ],
    },

    productPrice: {
        type: String,
        required: [ true, 'Product Price is Required' ],
    },

    productCategory: {
        type: String,
        enum: ["Men's Collection", "Women's Collection"],
        required: [ true, 'Product Category is Required' ],
    },

    productSubCategory: {
        type: String,
        enum: ["Wash & Wear", "Cotton", "Boski", "Lattha", "Wool", "Lawn", "Two Piece", 
                "Three Piece", "Bridal", "Lehnga", "Maxi", "Tail", "Shawl"],
        required: [ true, 'Product Sub-Category is Required' ],
    },

    productIsNewCollection: {
        type: Boolean,
        required: [ true, 'IsNewCollection is Required Field']
    },

    productIsSaleCollection: {
        type: Boolean,
        required: [ true, 'IsSaleCollection is Required Field']
    },

    productSalePercentage: {
        type: Number,
        required: [ false ]
    },

    productPics: [
        {
            type: String,
            required: [ false ]
        }
    ],

    productDeliveryDetails: {
        type: String,
        required: [ false ]
    },

    productNote: {
        type: String,
        required: [ false ]
    },

    productInStockQuantity: {
        type: Number,
        required: [ true ]
    }
}, 
{ 
    timestamps: true 
}));

module.exports = { Product, };