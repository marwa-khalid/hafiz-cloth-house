// Page Bindings (This will Execute after Page Load)
$(function ()
{
    let currentIndex = 0;
    
    $("#product-card-carousel").carousel( { interval: false } );
    $('.redirect-to-products').click(RedirectToProducts);
    currentIndex = showProductCards(0);
    $('.product-card-carousel-control-next').on('click', function () { currentIndex = showNextProductCards(currentIndex); });
    $('.product-card-carousel-control-prev').on('click', function () { currentIndex = showPreviousProductCards(currentIndex); });
    $("#addUpdateProductSubmitButton").click(addUpdateProductFunction);
    $("#admin-products-cards").on("click", '[id^="edit-product-"]', openProductModal);
    $(".addUpdateProductModal-close").click(resetAndHideProductModal);

    const maxValueForPriceRange = 10000; 
    $("#priceRange").ionRangeSlider(
    {
        skin: "square",
        type: "double",
        min: 0,
        max: maxValueForPriceRange,
        step: 100,
        from: 1000,
        to: 8000,
        grid: false,
        prettify_enabled: true,
        prettify_separator: ",",
        prefix: "Rs: "
    });

    $("#product-card-carousel").swipe(
    {
        swipeLeft: function () 
        {
            currentIndex = showNextProductCards(currentIndex);
        },
        swipeRight: function () 
        {
            currentIndex = showPreviousProductCards(currentIndex);
        }
    });
    
    const productImages = document.querySelectorAll(".product-images img"); // selecting all image thumbs
    const productImageSlide = document.querySelector(".image-slider"); // seclecting image slider element
    const sizeBtns = document.querySelectorAll('.size-radio-btn'); // selecting size buttons
    let checkedBtn = 0; // current selected button

    let activeImageSlide = 0; // default slider image

    productImages.forEach((item, i) => 
    { 
        // loopinh through each image thumb
        item.addEventListener('click', () => 
        { 
            // adding click event to each image thumbnail
            productImages[activeImageSlide].classList.remove('active'); // removing active class from current image thumb
            item.classList.add('active'); // adding active class to the current or clicked image thumb
            productImageSlide.style.backgroundImage = `url('${item.src}')`; // setting up image slider's background image
            activeImageSlide = i; // updating the image slider variable to track current thumb
        })
    })

    sizeBtns.forEach((item, i) => 
    { 
        // looping through each button
        item.addEventListener('click', () => 
        { 
            // adding click event to each 
            sizeBtns[checkedBtn].classList.remove('check'); // removing check class from the current button
            item.classList.add('check'); // adding check class to clicked button
            checkedBtn = i; // upading the variable
        })
    })

    $('.dropdown').hover(function() 
    {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function() 
    {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });

    $('.category-img-container').hover(function () 
    {
        $(this).find('.img-subcontent').fadeIn(200);
    }, function () 
    {
        $(this).find('.img-subcontent').fadeOut(200);
    });

    $(".filter-feature-dropdown-buttons-container .dropdown").hover(function (event)
    {
        event.preventDefault();
    });

    if ($("body").find("#admin-products-cards").length > 0)
    {
        getAllProductsFunction("Admin");
    }

    if ($("body").find("#user-products-cards").length > 0)
    {
        getAllProductsFunction("User");
    }
});

function RedirectToProducts(event)
{
    event.preventDefault();

    currentClickedText = $(event.target).text().trim();

    if ($(this).hasClass("new-collection"))
    {
        currentClickedText = "New Collection";
    }
    if ($(this).hasClass("women-collection"))
    {
        currentClickedText = "Women's Collection";
    }
    if ($(this).hasClass("men-collection"))
    {
        currentClickedText = "Men's Collection";
    }
    
    var RedirectToProductsForm = $('<form/>', { action: '/products', method: 'post', style: 'display:none;' });
    RedirectToProductsForm.append($('<input/>', { type: 'hidden', name: 'categoryName', value: currentClickedText }));
    $('body').append(RedirectToProductsForm);
    RedirectToProductsForm.submit();
}

function showProductCards(currentIndex) 
{
    const screenWidth = $(window).width();

    let cardsToShow = 1;
    
    if (screenWidth >= 768 && screenWidth < 992) 
    {
        cardsToShow = 2;
    } 
    else if (screenWidth >= 992 && screenWidth < 1200) 
    {
        cardsToShow = 3;
    }
    else if (screenWidth >= 1200) 
    {
        cardsToShow = 4;
    }

    const productCards = $("#product-card-carousel .carousel-inner .product-card");
    const totalCards = productCards.length;
    productCards.hide();
    
    for (let i = 0; i < cardsToShow; i++) 
    {
        const nextIndex = (currentIndex + i) % totalCards;
        productCards.eq(nextIndex).show();
    }
    
    currentIndex = (currentIndex + cardsToShow) % totalCards;

    return currentIndex;
}

function showNextProductCards(currentIndex) 
{
    const screenWidth = $(window).width();

    let cardsToShow = 1;
    if (screenWidth >= 768 && screenWidth < 992) {
        cardsToShow = 3;
    } else if (screenWidth >= 992) {
        cardsToShow = 4;
    }

    const productCards = $("#product-card-carousel .carousel-inner .product-card");
    const totalCards = productCards.length;
    productCards.hide();

    for (let i = 0; i < cardsToShow; i++) 
    {
        const nextIndex = (currentIndex + i) % totalCards;
        productCards.eq(nextIndex).show();
    }

    currentIndex = (currentIndex + cardsToShow) % totalCards;

    return currentIndex;
}

function showPreviousProductCards(currentIndex) 
{
    const screenWidth = $(window).width();

    let cardsToShow = 1;
    if (screenWidth >= 768 && screenWidth < 992) {
        cardsToShow = 3;
    } else if (screenWidth >= 992) {
        cardsToShow = 4;
    }

    const productCards = $("#product-card-carousel .carousel-inner .product-card");
    const totalCards = productCards.length;
    productCards.hide();

    // Calculate the index of the first product to show based on the current index
    currentIndex = (currentIndex - cardsToShow + totalCards) % totalCards;

    for (let i = 0; i < cardsToShow; i++) {
        const prevIndex = (currentIndex + i) % totalCards;
        productCards.eq(prevIndex).show();
    }

    return currentIndex;
}

function addUpdateProductFunction(event)
{
    event.preventDefault();
    var incompleteRequiredFields = false;
    var formSubmissionMethod = "";
    var sendURL = "";
    
    var productForm = $("#productForm");

    var productID = productForm.find("#productID").val();

    var productTitle = productForm.find("#productTitle").val();
    if ((!incompleteRequiredFields) && productTitle == "" || productTitle == null)
    {
        incompleteRequiredFields = true;
        alert("Product Title is Required");
    }

    var productDescription = productForm.find("#productDescription").val();
    if ((!incompleteRequiredFields) && productDescription == "" || productDescription == null)
    {
        incompleteRequiredFields = true;
        alert("Product Description is Required");
    }

    var productPrice = productForm.find("#productPrice").val();
    if ((!incompleteRequiredFields) && productPrice == "" || productPrice == null)
    {
        incompleteRequiredFields = true;
        alert("Product Price is Required");
    }

    var productInStockQuantity = productForm.find("#productInStockQuantity").val();
    if ((!incompleteRequiredFields) && productInStockQuantity == "" || productInStockQuantity == null)
    {
        incompleteRequiredFields = true;
        alert("Product In-Stock Quantity is Required");
    }

    var productCategory = productForm.find("input[name='category']:checked").val();
    if ((!incompleteRequiredFields) && productCategory == "" || productCategory == null)
    {
        incompleteRequiredFields = true;
        alert("Product Category is Required");
    }

    var productSubCategory = productForm.find("input[name='subCategory']:checked").val();
    if ((!incompleteRequiredFields) && productSubCategory == "" || productSubCategory == null)
    {
        incompleteRequiredFields = true;
        alert("Product Sub-Category is Required");
    }

    var productDeliveryDetails = productForm.find("#deliveryDetails").val();
    var productNote = productForm.find("#note").val();
    
    var productIsNewCollection = productForm.find("#newCollection");
    if (productIsNewCollection.prop("checked"))
    {
        productIsNewCollection = true;
    }
    else
    {
        productIsNewCollection = false;
    }
    
    var productIsSaleCollection = productForm.find("#applySale");
    if (productIsSaleCollection.prop("checked"))
    {
        productIsSaleCollection = true;
    }
    else
    {
        productIsSaleCollection = false;
    }

    var productSalePercentage = 0;
    if (productIsSaleCollection)
    {
        var productSalePercentage = productForm.find("#salePercentageSlider").val();
    }

    var selectedProductPics = productForm.find("#productImages")[0];
    const productPics = [];
    for (const file of selectedProductPics.files)
    {
        productPics.push(file);
    }

    if ((!incompleteRequiredFields) && productPics.length < 1)
    {
        incompleteRequiredFields = true;
        alert("Atleast 1 Image is Required");
    }

    if (!(incompleteRequiredFields))
    {
        var formData = new FormData();

        formData.append("productID", productID);
        formData.append("productTitle", productTitle);
        formData.append("productDescription", productDescription);
        formData.append("productPrice", productPrice);
        formData.append("productInStockQuantity", productInStockQuantity);
        formData.append("productCategory", productCategory);
        formData.append("productSubCategory", productSubCategory);
        formData.append("productDeliveryDetails", productDeliveryDetails);
        formData.append("productNote", productNote);
        formData.append("productIsNewCollection", productIsNewCollection);
        formData.append("productIsSaleCollection", productIsSaleCollection);
        formData.append("productSalePercentage", productSalePercentage);

        for (var i = 0; i < productPics.length; i++)
        {
            formData.append("productPics", productPics[i]);
        }

        if (!(productID == "" || productID == null))
        {
            sendURL = "/api/products/" + productID + "";
            formSubmissionMethod = "put";
        }
        else
        {
            sendURL = "/api/products/";
            formSubmissionMethod = "post";   
        }

        if ((!(formSubmissionMethod == "" || formSubmissionMethod == null)) && (!(sendURL == "" || sendURL == null)))
        {
            $.ajaxSetup({
                headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
    
            $.ajax({
                type: formSubmissionMethod,
                url: sendURL,
                processData: false,
                contentType: false,
                data: formData,
                success: function (response) 
                {
                    if (response.status)
                    {
                        var status = "Add New Product";
                        var renderPosition = "prepend";

                        if (!(productID == "" || productID == null))
                        {
                            status = "Update Product";
                            renderPosition = "replaceWith";
                        }
                        var inputParametersJSON = {
                            "userType": "Admin",
                            "data": response.data,
                            "renderPosition": renderPosition,
                            "status": status,
                        };
    
                        renderProductsData(inputParametersJSON);
                        resetAndHideProductModal();

                        toastr.success(response.message);
                    }
                    else
                    {
                        toastr.error(response.message);
                    }
                },
                error: function (error) 
        {
                    toastr.error(error);
                }
            });
        }
        else
        {
            toastr.error("FORM SUBMISSION METHOD IS EMPTY");
        }
    }
}

function getAllProductsFunction(userType)
{
    $.ajaxSetup({
        headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type: "get",
        url: "/api/products/",
        processData: false,
        contentType: false,
        data: "",
        success: function (response) 
        {
            if (response.status)
            {
                if (response.data.length > 0)
                {
                    var inputParametersJSON = {
                        "userType": userType,
                        "data": response.data,
                        "renderPosition": "append",
                        "status": "Getting All Products",
                    };

                    renderProductsData(inputParametersJSON);
                }
                else
                {
                    var dataToRender = '<div class="row justify-content-center align-items-center">'+
                                            '<div>'+
                                                '<p>'+
                                                    'No Products Available to Display'+
                                                '</p>'+
                                            '</div>'+
                                        '</div>';

                    if (userType == "Admin")
                    {
                        $("#admin-products-cards").append(dataToRender);
                    }
                    else if (userType == "User")
                    {
                        $("#user-products-cards").append(dataToRender);
                    }
                }
            }
            else
            {
                toastr.error(response.message);
            }
        },
        error: function (error) 
        {
            toastr.error(error);
        }
    });
}

function renderProductsData(inputParametersJSON)
{
    if (inputParametersJSON.status == "Getting All Products")
    {
        if (inputParametersJSON.userType == "Admin")
        {
            $("#admin-products-cards").empty();
        }
        else if (inputParametersJSON.userType == "User")
        {
            $("#user-products-cards").empty();
        }
    }

    if (!(Array.isArray(inputParametersJSON.data))) 
    {
        inputParametersJSON.data = [inputParametersJSON.data];
    }

    inputParametersJSON.data.forEach( currentIteration => 
    {
        var afterSalePrice = currentIteration.productPrice;
        var dataToRender_ifSaleProduct = '';
        var dataToRender_productCardFooter = '';
        var dataToRender_deleteProductModal = '';

        if (currentIteration.productInStockQuantity > 0)
        {
            if (currentIteration.productPics.length > 0)
            {
                currentIteration.productPics[0] = currentIteration.productPics[0].replace(/ProductFilesUploads\\/g, '');

                var currentImageSrcURL = "/ProductFilesUploads/"+currentIteration.productPics[0];
            }

            if (currentIteration.productIsSaleCollection && currentIteration.productSalePercentage > 0 && currentIteration.productSalePercentage <= 100)
            {
                afterSalePrice = currentIteration.productPrice - ((currentIteration.productSalePercentage / 100) * currentIteration.productPrice);

                dataToRender_ifSaleProduct =    '<span class="dress-card-crossed">'+
                                                    'Rs.'+ currentIteration.productPrice +
                                                '</span>'+
                                                '<span class="dress-card-off">'+
                                                    '&ensp;('+ currentIteration.productSalePercentage +'% OFF)'+
                                                '</span>';
            }

            if (inputParametersJSON.userType == "Admin")
            {
                dataToRender_productCardFooter = '<div class="row">'+
                                                    '<div class="col-md-6 card-button">'+
                                                        '<a id="edit-product-'+currentIteration._id+'">'+
                                                            '<div class="card-button-inner bag-button" >'+
                                                            'Edit'+
                                                            '</div>'+
                                                        '</a>'+
                                                    '</div>'+
                                                    '<div class="col-md-6 card-button">'+
                                                        '<a href="#" data-toggle="modal" data-target="#deleteConfirmationModal">'+
                                                        '<div class="card-button-inner wish-button">'+
                                                            'Delete'+
                                                        '</div>'+
                                                        '</a>'+
                                                    '</div>'+
                                                '</div>';

                dataToRender_deleteProductModal =   '<div class="modal fade" id="deleteConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">'+
                                                        '<div class="modal-dialog" role="document">'+
                                                            '<div class="modal-content">'+
                                                                '<div class="modal-header">'+
                                                                    '<h5 class="modal-title" id="deleteConfirmationModalLabel">'+
                                                                        'Delete Confirmation'+
                                                                    '</h5>'+
                                                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                                                        '<span aria-hidden="true">&times;</span>'+
                                                                    '</button>'+
                                                                '</div>'+
                                                                '<div class="modal-body">'+
                                                                    'Are you sure you want to delete this product?'+
                                                                '</div>'+
                                                                '<div class="modal-footer">'+
                                                                    '<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>'+
                                                                    '<button id="confirm-delete-'+currentIteration._id+'" type="button" class="btn btn-danger">Yes</button>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>';
            }
            else if (inputParametersJSON.userType == "User")
            {
                dataToRender_productCardFooter =    '<div class="row">'+
                                                        '<div class="col-md-6 card-button">'+
                                                            '<a id="add-to-cart'+currentIteration._id+'" href="">'+
                                                                '<div class="card-button-inner bag-button">'+
                                                                    'Add to Cart'+
                                                                '</div>'+
                                                            '</a>'+
                                                        '</div>'+
                                                        '<div class="col-md-6 card-button">'+
                                                            '<a href="">'+
                                                                '<div class="card-button-inner wish-button">'+
                                                                    'Wishlist'+
                                                                '</div>'+
                                                            '</a>'+
                                                        '</div>'+
                                                    '</div>';
            }

            var dataToRender = '<div id="product-card-'+currentIteration._id+'" class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-2">'+
                                    '<div class="dress-card">'+
                                        '<div class="dress-card-head">'+
                                            '<a href="/ProductView">'+
                                                '<img src="'+currentImageSrcURL+'" class="dress-card-img-top" alt="Image Not Found" />'+
                                            '</a>'+                                        
                                        '</div>'+
                                        '<div class="dress-card-body">'+
                                            '<a href="/ProductView">'+
                                                '<h4 class="dress-card-title">'+
                                                    currentIteration.productTitle +
                                                '</h4>'+
                                            '</a>'+
                                            '<a href="/ProductView">'+
                                                '<p class="dress-card-para">'+
                                                    currentIteration.productSubCategory +
                                                '</p>'+
                                            '</a>'+
                                            '<p class="dress-card-para">'+
                                                '<span class="dress-card-price">'+
                                                    'Rs.'+ afterSalePrice +' &ensp;'+
                                                '</span>'+ 
                                                dataToRender_ifSaleProduct +
                                            '</p>'+
                                            dataToRender_productCardFooter +
                                        '</div>'+
                                        dataToRender_deleteProductModal +
                                    '</div>'+
                                '</div>';

            if (inputParametersJSON.userType == "Admin")
            {
                if (inputParametersJSON.status == "Update Product")
                {
                    $("#product-card-"+currentIteration._id+"").replaceWith(dataToRender);
                }
                else
                {
                    if (inputParametersJSON.renderPosition == "append")
                    {
                        $("#admin-products-cards").append(dataToRender);
                    }
                    else if (inputParametersJSON.renderPosition == "prepend")
                    {
                        $("#admin-products-cards").prepend(dataToRender);
                    }
                }
            }
            else if (inputParametersJSON.userType == "User")
            {
                if (inputParametersJSON.renderPosition == "append")
                {
                    $("#user-products-cards").append(dataToRender);
                }
                else if (inputParametersJSON.renderPosition == "prepend")
                {
                    $("#user-products-cards").prepend(dataToRender);
                }
            }
        }
    });
}

function openProductModal()
{
    var currentProductID = $(this).attr("id").replace("edit-product-", "");
    var sendURL = "/api/products/" + currentProductID + "";
    var dataToSend = {"productID": currentProductID};

    $.ajaxSetup({
        headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type: "get",
        url: sendURL,
        processData: false,
        contentType: false,
        data: dataToSend,
        success: function (response) 
        {
            if (response.status)
            {
                var productForm = $("#productForm");

                productForm.find("#productID").val(response.data._id);
                productForm.find("#productTitle").val(response.data.productTitle);
                productForm.find("#productDescription").val(response.data.productDescription);
                productForm.find("#productPrice").val(response.data.productPrice);
                productForm.find("#productInStockQuantity").val(response.data.productInStockQuantity);
                productForm.find('input[name="category"][value="'+response.data.productCategory+'"]').prop("checked", true);
                
                productForm.find("#deliveryDetails").val(response.data.productDeliveryDetails);
                productForm.find("#note").val(response.data.productNote);

                if (response.data.productIsNewCollection)
                {
                    productForm.find("input[id='newCollection']").prop("checked", true);
                }
                else
                {
                    productForm.find("input[id='newCollection']").prop("checked", false);
                }

                if (response.data.productIsSaleCollection)
                {
                    productForm.find("input[id='applySale']").prop("checked", true);
                    productForm.find("#salePercentageSlider").val(response.data.productSalePercentage);
                    toggleSalePercentage();
                    updateSalePercentageValue();
                }
                else
                {
                    productForm.find("input[id='applySale']").prop("checked", false);
                }
                
                toggleSubCategory();
                updateSubCategoryOptions();
                productForm.find('input[name="subCategory"][value="'+response.data.productSubCategory+'"]').prop("checked", true);

                var selectedProductPics = productForm.find("#productImages")[0];

                if (response.data.productPics.length > 0)
                {
                    response.data.productPics.forEach(productPic => 
                    {
                        $.ajax({
                            type: "get",
                            url: "/" + productPic + "",
                            responseType: "blob",
                            success: function(productPic_response) 
                            {
                                var splittedProductPicName = productPic.split("\\");
                                var newFileName_Hold = splittedProductPicName[splittedProductPicName.length - 1];
                                var splittedNewFileName_Hold = newFileName_Hold.split(".");
                                var newFileNameExt_Hold = splittedNewFileName_Hold[splittedNewFileName_Hold.length - 1];

                                var blob = new Blob([productPic_response], { type: "image/"+newFileNameExt_Hold+"" });
                                var file = new File([blob], newFileName_Hold, { type: "image/"+newFileNameExt_Hold+"" });

                                var existingProductPics = selectedProductPics.files;
                                
                                var productPicFilesList = new DataTransfer();
                                if (!(existingProductPics == "" || existingProductPics == null))
                                {
                                    for (var i = 0; i < existingProductPics.length; i++) 
                                    {
                                        productPicFilesList.items.add(existingProductPics[i]);
                                    }
                                }
                                
                                productPicFilesList.items.add(file);
                                selectedProductPics.files = productPicFilesList.files;
                                
                                const imagePreview = document.createElement('img');
                                imagePreview.src = "/" + productPic + "";
                                imagePreview.classList.add('selected-image');
                                $("#selectedImages").append(imagePreview);
                            },
                            error: function(error) 
                            {
                                console.error("Error Fetching Product Images:");
                            }
                        });
                    });
                }

                $("#addUpdateProductModal").modal("show");
            }
            else
            {
                toastr.error(response.message);
            }
        },
        error: function (error) 
        {
            toastr.error(error);
        }
    });
}

function resetAndHideProductModal()
{
    var productForm = $("#productForm");

    productForm.find("#productID").val("");
    productForm.find("#productTitle").val("");
    productForm.find("#productDescription").val("");
    productForm.find("#productPrice").val("");
    productForm.find("#productInStockQuantity").val("");
    productForm.find("input[name='category']").prop("checked", false);
    productForm.find("input[name='subCategory']").prop("checked", false);;
    productForm.find("#deliveryDetails").val("");
    productForm.find("#note").val("");
    productForm.find("input[id='newCollection']").prop("checked", false);
    productForm.find("input[id='applySale']").prop("checked", false);
    productForm.find("#salePercentageSlider").val(50);
    
    var selectedProductPics = productForm.find("#productImages")[0];
    selectedProductPics.value = "";
    $("#selectedImages").empty();

    $("#addUpdateProductModal").modal("hide");
}