// Page Bindings (This will Execute after Page Load)
$(function ()
{
    let currentIndex = 0;
    
    $("#product-card-carousel").carousel( { interval: false } );
    $('.redirect-to-products').click(RedirectToProducts);
    currentIndex = showProductCards(0);
    $('.product-card-carousel-control-next').on('click', function () { currentIndex = showNextProductCards(currentIndex); });
    $('.product-card-carousel-control-prev').on('click', function () { currentIndex = showPreviousProductCards(currentIndex); });

    const maxValueForPriceRange = 10000; 
    $("#priceRange").ionRangeSlider(
    {
        skin: "square",
        type: "double",
        min: 0,
        max: maxValueForPriceRange,
        step: 100,
        from: 1000,
        to: 5000,
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
    })
});

function RedirectToProducts(event)
{
    event.preventDefault();

    currentClickedText = $(event.target).text().trim();
    
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

function showPreviousProductCards(currentIndex) {
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