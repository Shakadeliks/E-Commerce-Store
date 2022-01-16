//target quick add cart buttons in html to create add to cart function 

let carts = document.getElementsByClassName("add-cart");

//create product objects to store details

let products = [
    {
        name: "Off-White Embroidered-Logo Snapback Cap",
        tag: "hats-1.jpg",
        price: 288,
        incart: 0
    },
    {
        name: "Burberry Monogram Motif Check Print Cap",
        tag: "hats-2.webp",
        price: 357,
        incart: 0
    },
    {
        name: "Gucci GG-Print Houndstooth Cap",
        tag: "gucci-cap",
        price: 432,
        incart: 0
    },
    {
        name: "Stone Island Embroidered Patch Cap",
        tag: "stone-cap",
        price: 247,
        incart: 0
    },
    {
        name: "Palm-Angels Monogram Print Bootcut Jeans",
        tag: "palm-jeans",
        price: 590,
        incart: 0
    },
    {
        name: "Casablanca x Browns 50 Fenetre Sur Le Lac Printed Jean",
        tag: "casa-jeans",
        price: 604,
        incart: 0
    },
    {
        name: "Dsquared2 Graphic Print Slim-Fit Jeans",
        tag: "d2-jeans",
        price: 714,
        incart: 0
    },
    {
        name: "Phillip Plein Rock PP Straight-Fit Jeans",
        tag: "plein-jeans",
        price: 247,
        incart: 0
    },
    {
        name: "Givenchy Logo Intarsia-knit Jacket",
        tag: "giv-jacket",
        price: 1620,
        incart: 0
    },
    {
        name: "Saint Laurent Check-Pattern Buttoned Jacket",
        tag: "sl-jacket",
        price: 1201,
        incart: 0
    },
    {
        name: "Gucci Checked Blazer",
        tag: "gucci-jacket",
        price: 3294,
        incart: 0
    },
    {
        name: "Burberry Reversible Check Bomber Jacket",
        tag: "burb-jacket",
        price: 1496,
        incart: 0
    },
    {
        name: "Issey Miyake Men's Button-up Shirt",
        tag: "iss-shirt",
        price: 1496,
        incart: 0
    },
    {
        name: "Prada Geometric-Print Cotton Shirt",
        tag: "prad-shirt",
        price: 983,
        incart: 0
    },
    {
        name: "Dsquared2 Oversized Print shirt",
        tag: "d2-shirt",
        price: 539,
        incart: 0
    },
    {
        name: "Gucci Peony-print Bowling Shirt",
        tag: "gucci-shirt",
        price: 539,
        incart: 0
    }
];

/*
runs a for loop through all of the cart buttons when one of them is clicked, 
runs the cartAmount function that changes the amount of items in localstorage and adds the items prices
*/

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        //pass products into the functions so that the specific item is added to the cart
        cartAmount(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartAmount() {
    let productNumbers = localStorage.getItem("cartAmount")
//tests to see if there are items in cart when the page loads, if there are, the number will be dislayed on the cart button
    if (productNumbers) {
        document.querySelector("#cart span").textContent = productNumbers;
    }
}

function cartAmount(product) {
    
    let productNumbers = localStorage.getItem("cartAmount")
    //turns the cartAmount from a string to a number
    // if else for if there are items already in the cart then adds 1 to the number of items in cart
    //else if there are no items the count will start with 1 item in the cart
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem("cartAmount", productNumbers + 1);
        document.querySelector("#cart span").textContent = productNumbers + 1 ;
    }else {
        localStorage.setItem("cartAmount", 1)
        document.querySelector("#cart span").textContent = 1;

    }
    setItems(product);

    
}

function setItems(product) {

    let cartItems = localStorage.getItem("productsInCart");

    cartItems = JSON.parse(cartItems);
    //if else statement allows to add multiple of the same product
    //checks if the item being added is the item with the same tag already in cart.
    //adds 1 to incart of an item if it is already in storage
    //sets incart to 1 if the item is not already in storage
    if ( cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }else {
        products.incart = 1;
        cartItems = {
        [product.tag]: product
        }

    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
//if else checks if there are items in cart, if there items it will add their price to the newly added item
// else if there are no items in storage, the total cost will be the price of the new items price    

    if (cartCost != null){
        cartCost = JSON.parse(cartCost);
        localStorage.setItem("totalCost", JSON.stringify(cartCost + product.price));
    }else{
        localStorage.setItem("totalCost", JSON.stringify(product.price));
    }
    
}

function deliveryPrice() {
    
    if(document.querySelector("#radCourier").checked) {

        let deliveryAmount = 150;

        deliveryAmount = localStorage.setItem("deliveryCost", JSON.stringify(deliveryAmount));

        deliveryAmount = localStorage.getItem("deliveryCost");

        let totalCost = localStorage.getItem("totalCost");

        totalCost = JSON.parse(totalCost) + JSON.parse(deliveryAmount);

        localStorage.setItem("totalCost", totalCost);

        alert("R150 has been added to the amount due for the shipping of your order, thank you.");
   
    }

    displayCart();

}    

// function to show the cart items on the cart page with price and quantities
function displayCart() {

    let cartItems = localStorage.getItem("productsInCart");

    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem("totalCost");

    //cartCost = JSON.parse(cartCost);

    //targets the div class made for the display item in html

    let productContainer = document.querySelector(".cartContent");

    console.log(cartItems);

    let totalPriceNoVat = document.querySelector("#exTotal");

    let discountAmountDisplay = document.querySelector("#discountTotal");

    let discountAmount = (localStorage.getItem("discountAmount"));

    let appliedDiscountDisplay = document.querySelector("#afterDiscountAmount");

    let appliedDiscountPrice = (cartCost - discountAmount).toFixed(2);

    localStorage.setItem("newDiscountedCartPrice", appliedDiscountPrice);

    appliedDiscountPrice = localStorage.getItem("newDiscountedCartPrice");

    let vatDisplay = document.querySelector("#vat");

    vatAmount = (appliedDiscountPrice * 0.15).toFixed(2);

    localStorage.setItem("vat", vatAmount);

    vatAmount = localStorage.getItem("vat");

    let totalDisplay = document.querySelector("#inclTotal");

    let totalToBePaid = (JSON.parse(cartCost) - JSON.parse(discountAmount)) + JSON.parse(vatAmount);

    totalToBePaid = localStorage.setItem("amountToBePaid", JSON.stringify(totalToBePaid));

    totalToBePaid = localStorage.getItem("amountToBePaid");

    let deliveryDisplay = document.querySelector("#delivery");

    let deliveryAmount = JSON.parse(localStorage.getItem("deliveryCost"));

    //deliveryAmount = JSON.parse(deliveryAmount);





    //if else statement to make sure that the function only works on the cart page as it's the only page with the targeted div element

    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        totalPriceNoVat.innerHTML = "";
        discountAmountDisplay.innerHTML = "";
        appliedDiscountDisplay.innerHTML = "";
        vatDisplay.innerHTML = "";
        totalDisplay.innerHTML = "";
        deliveryDisplay = "";
    //goes through the cartItems storage and creates listed elements dynamically in html for each item with the product information.
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.incart}<td>
                <td>${item.price}<td>
            </tr>
            `;
        })
        Object.values(cartCost).map(item =>{
            totalPriceNoVat.innerHTML += `${item}`;
        })
        Object.values(discountAmount).map(item => {
            discountAmountDisplay.innerHTML += `${item}`;
        })
        Object.values(appliedDiscountPrice).map(item => {
            appliedDiscountDisplay.innerHTML += `${item}`;
        })
        Object.values(vatAmount).map(item => {
            vatDisplay.innerHTML += `${item}`;
        })
        Object.values(totalToBePaid).map(item => {
            totalDisplay.innerHTML += `${item}`;
        })
        Object.values(deliveryAmount).map(item => {
            deliveryDisplay.innerHTML += `${item}`; 
        })
} 
}



    




    /*let showDelivery = document.querySelector("#delivery");

    Object.values(deliveryAmount).map(item => {
        showDelivery.innerHTML += `${item}`;
    });
    */
    displayCart();
    

function checkout() {

    // open the checkout page
    window.open("onlineStoreCheckout.html", "_blank");
    // update the cart & totals 
    displayCart();

    

}


function clearCart() {
    
    // clear local storage 
    localStorage.clear();
    // update the totals on all pages
    displayCart();

    // reload the cart page
    location.reload();
}

function applyDiscount() {

    window.open('storeCoupons.html');

}

function applyDiscounts() {

    // get discount amount based on selected radio button
    let whichDiscount = parseInt($("input[name='onlineDiscount']:checked").val());
    // get total amount before tax from local storage
    let preDiscountAmount = (localStorage.getItem("totalCost"));
    // calculate discount ammount
    let discountAmount = (preDiscountAmount * ((whichDiscount / 100)));
    // save discount amount to local storage
    localStorage.setItem("discountAmount", JSON.stringify(discountAmount));

    displayCart();
}

function confirmOrder() {

    let uniqueOrderNumber = new Date().valueOf();

    console.log(uniqueOrderNumber);

    let ordersMap = new Map();

    alert("Thank you for placing your order. /n Your order number is : " + uniqueOrderNumber);

    if (localStorage.getItem("cartAmount") === null) {
        alert ("No items on order ");
    }else {
        cartItems = JSON.parse(localStorage.getItem("cartAmount"));

        ordersMap.set(uniqueOrderNumber, cartItems);

        let orders = JSON.stringify(ordersMap);

        localStorage.setItem("savedOrders", orders)

        clearCart()
    }



}

function selectDelivery() {

    // get selected value from checkout page
    let deliveryOption = $("input[name='radDelivery']:checked").val();
    // show different forms based on user selected radio button
    switch (deliveryOption) {
        case ("Courier"):

            $("#collectDiv").slideUp(1500);
            $("#mailAddressDiv").slideUp(1500);
            $("#courierDiv").slideDown(1500);
            updateTotals(150);
            break;


        case ("Collect"):

            $("#collectDiv").slideDown(1500);
            $("#mailAddressDiv").slideUp(1500);
            $("#courierDiv").slideUp(1500);
            updateTotals(0);

            break;
        default:

            updateTotals(0);
            break;
    }




}

function hideElements() {
    $("#collectDiv").show();
    $("#mailAddressDiv").hide();
    $("#courierDiv").hide();

}

 
$(document).ready( () => {
        $(".frmCoupon").change(applyDiscounts);
        // function call to run on selection of one of the Delivery options on the checkout page
        $("#deliveryOptions").change(selectDelivery);
        onLoadCartAmount();
        displayCart();
})
// animation for the testimonial carousel
// $("#deliveryOptions").change(selectDelivery);

// function call to apply coupon discounts on change of coupon form
// function call to run on selection of one of the Delivery options on the checkout page



