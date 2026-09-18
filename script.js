const books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        price: 399,
        image: "book1.jpg"
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 299,
        image: "book2.jpg"
    },
    {
        id: 3,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 349,
        image: "book3.jpg"
    },
    {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 399,
    image: "book4.jpg"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
function showBooks() {
    let bookList = document.getElementById("bookList");
    if (!bookList) return;
    bookList.innerHTML = "";
    books.forEach(book => {
        bookList.innerHTML += `
            <div class="card">
                <img src="${book.image}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <b>₹${book.price}</b>
                <br><br>
                <a class="btn" href="details.html?id=${book.id}">View Details</a>
            </div>
        `;
    });
}
showBooks();
function showDetails() {
    let box = document.getElementById("details");
    if (!box) return;
    let urlId = new URLSearchParams(window.location.search).get("id");
    let book = books.find(item => item.id == urlId);
    if (!book) return;
    box.innerHTML = `
        <div class="detail-box">
            <img src="${book.image}">
            <div>
                <h1>${book.title}</h1>
                <p>Author: ${book.author}</p>
                <p>Price: ₹${book.price}</p>
                <button class="btn" onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        </div>
    `;
}
showDetails();
function addToCart(id) {
    let book = books.find(item => item.id == id);
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(book.title + " added to cart!");
}
function showCart() {
    let box = document.getElementById("cart");
    let totalBox = document.getElementById("total");
    if (!box) return;
    box.innerHTML = "";
    let total = 0;
    cart.forEach((book, index) => {
        total += book.price;
        box.innerHTML += `
            <div class="cart-item">
                <img src="${book.image}" width="50">
                <div>
                    <h3>${book.title}</h3>
                    <p>₹${book.price}</p>
                </div>
                <button class="btn" onclick="removeBook(${index})">Remove</button>
            </div>
        `;
    });
    if (totalBox) totalBox.innerText = total;
}
showCart();
function removeBook(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}
function checkout() {
    if (cart.length == 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    cart = [];
    localStorage.removeItem("cart");
    showCart();
}

function register(e) {
    e.preventDefault();
    let user = {
        email: document.getElementById("regEmail").value,
        pass: document.getElementById("regPassword").value
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "login.html";
}

function login(e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && email == user.email && pass == user.pass) {
        window.location.href = "books.html";
    } else {
        alert("Invalid credentials!");
    }
}
