// Page Bindings (This will Execute after Page Load)
$(function ()
{
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

    $('.redirect-to-products').click(RedirectToProducts);
});

function RedirectToProducts(event) 
{
    event.preventDefault();

    currentClickedText = $(event.target).text().trim();

    console.log(currentClickedText);

    const data =    {
                        "name": currentClickedText
                    };

    fetch('/products', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.text())
    .then((response) => 
    {
        document.open();
        document.write(response);
        document.close();
    })
    .catch((error) => 
    {
        console.error('Error:', error);
    });
}