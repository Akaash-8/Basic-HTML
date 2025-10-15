//sample products

const products = [
    {id:1, name:"Laptop", price:"80000", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0hDlM74lUG1rmLPkiW5S1PJExeoFOSu3yg&s",},
    {id:2, name:"Mobile", price:"50000", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR1V6CrRrrl7WBHr1A59q54nV3C_Tat0fKqA&s",},
    {id:3, name:"Shirt", price:500, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6onQCsvDqWjXWuqDfT6lPzX9LGaRtVgBow&s",},
    {id:4, name:"Tablet", price:95000, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSol5C0Q-cjwY9QYbNPYgpiOoNHvC7V5ilPOA&s",},
    {id:5, name:"Headphone", price:16000, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUkJa4Cd1-vccmQDCBs7Xgdh20K6Fn5ZCGA&s",},
    {id:6, name:"Furniture", price:25000, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8rr1r6XoGUyHtNbupajn0vOXk9_kJ8RDxg&s",},
    {id:7, name:"Jersey", price:800, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKR8vVk0odqkYzYwA-T__2esMS3DUYKWYcPA&s",},
    {id:8, name:"Shoe", price:2000, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIVBCav5GvQjZ3IVcko6zPJbevr30YJK0TOw&s",},
    {id:9, name:"Watch", price:5000, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvLu1X7R8BuessWRLGNRdZgkGURn08P3NnA&s",},
    {id:10, name:"Jewellery", price:150000, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxp6DEXgzKln0vanJOGiPtwSte5LMj5BEWcg&s",},
]


function renderProducts(products, productList) {
    const container = document.getElementById(productList);
    container.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML = `
            <img src = "${product.image}"/>
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button onclick = "addToCart(${product.id})" >Add To Cart</button>
        `
        container.appendChild(productDiv);
    })
}

//search functionality
function searchProducts(query){
    const filteredProducts = products.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLowerCase())
    )
    renderProducts(filteredProducts,"productlist")

}

//Add the event listener
document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})

//sorting
function sortProducts(criteria){
    if(criteria == "price"){
        return products.sort((a,b) => a.price - b.price);
    }
    return products;
}

//Adding event listners
document.getElementById("sortOptions")?.addEventListener("change", (event) =>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})

// Add to cart
function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} is added to cart`);
    renderCart();
}


function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<h2>Your Cart is Empty</h2>";
        return;
    }

    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML = `
            <img src="${item.image}"/>
            <h3>${item.name}</h3>
            <p>${item.price}</p>
        `;
        container.appendChild(cartDiv);
    });
}



// Initialize pages
if (document.getElementById("productList")) renderProducts(products, "productList")
if (document.getElementById("cartItems")) renderCart();
