let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.getElementById('cartCount');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
// let products = [];
// let cart = [];




const checkout = () => {
    fetch('http://127.0.0.1:8000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ items: cart }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Order placed successfully!');
        // Clear cart after successful order
        cart = [];
        localStorage.removeItem('cart');
        // addCartToHTML();
    })
    .catch(error => console.error('Error:', error));
};

    // const addDataToHTML = () => {
   

       
    //     // if(products.length > 0) 
    //     // {
    //     //     products.forEach(product => {
    //     //         let newProduct = document.createElement('div');
    //     //         newProduct.dataset.id = product.id;
    //     //         newProduct.classList.add('item');
    //     //         newProduct.innerHTML = 
    //     //         `<img src="http://127.0.0.1:8000/${product.image}" alt="">
    //     //         <h2>${product.name}</h2>
    //     //         <div class="price">$${product.price}</div>
    //     //         <button class="addCart">Add To Cart</button>`;
    //     //         listProductHTML.appendChild(newProduct);
    //     //     });
    //     // }
    // }
    listProductHTML?.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
// const addToCart = (product_id) => {
//     let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(cart.length <= 0){
//         cart = [{
//             product_id: product_id,
//             quantity: 1
//         }];
//     }else if(positionThisProductInCart < 0){
//         cart.push({
//             product_id: product_id,
//             quantity: 1
//         });
//     }else{
//         cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
//     }
//     // addCartToHTML();
//     addCartToMemory();
// }
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// const addCartToHTML = () => {
//     console.log('asd')
//     listCartHTML.innerHTML = '';
//     let totalQuantity = 0;
//     if(cart.length > 0){
//         cart.forEach(item => {
//             totalQuantity = totalQuantity +  item.quantity;
//             let newItem = document.createElement('div');
//             newItem.classList.add('item');
//             newItem.dataset.id = item.product_id;

//             let positionProduct = products.findIndex((value) => value.id == item.product_id);
//             let info = products[positionProduct];
//             listCartHTML.appendChild(newItem);
//             newItem.innerHTML = `
//             <div class="image">
//                     <img src="${info.image}">
//                 </div>
//                 <div class="name">
//                 ${info.name}
//                 </div>
//                 <div class="totalPrice">$${info.price * item.quantity}</div>
//                 <div class="quantity">
//                     <span class="minus"><</span>
//                     <span>${item.quantity}</span>
//                     <span class="plus">></span>
//                 </div>
//             `;
//         })
//     }
//     // iconCartSpan.innerText = totalQuantity;
// }

// listCartHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
//         let product_id = positionClick.parentElement.parentElement.dataset.id;
//         let type = 'minus';
//         if(positionClick.classList.contains('plus')){
//             type = 'plus';
//         }
//         changeQuantityCart(product_id, type);
//     }
// })
// const changeQuantityCart = (product_id, type) => {
//     let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(positionItemInCart >= 0){
//         let info = cart[positionItemInCart];
//         switch (type) {
//             case 'plus':
//                 cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
//                 break;
        
//             default:
//                 let changeQuantity = cart[positionItemInCart].quantity - 1;
//                 if (changeQuantity > 0) {
//                     cart[positionItemInCart].quantity = changeQuantity;
//                 }else{
//                     cart.splice(positionItemInCart, 1);
//                 }
//                 break;
//         }
//     }
//     // addCartToHTML();
//     addCartToMemory();
// }

const initApp = () => {

    document.addEventListener('DOMContentLoaded', (event) => {
        // Existing initialization code
        
        // fetch('http://127.0.0.1:8000/api/products')
        // .then(response => response.json())
        // .then(data => {
        //     products = data;
        //     addDataToHTML();
    
           
        //     if(localStorage.getItem('cart')){
        //         cart = JSON.parse(localStorage.getItem('cart'));
        //         // addCartToHTML();
        //     }
        // })
        // Add event listener to checkout button
        // const checkoutButton = document.getElementById('checkoutButton');
        // checkoutButton.addEventListener('click', checkout);
    });
    
}
initApp();