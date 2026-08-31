const API_URL = "https://cloudcomp-car-api-test.vercel.app";


// GET ALL BOOKS
async function loadBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        const data = await response.json();
        displayBooks(data.books);
    }

    catch (error) {
        console.error(error);
        document.getElementById("bookList").innerHTML = "Unable to connect to the API.";
    }
}

// DISPLAY BOOKS
function displayBooks(books) {
    const bookList = document.getElementById("bookList");

    bookList.innerHTML = "";

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <div class="book-year">${book.year}</div>
            <h3>${book.title}</h3>
            <p class="book-author">By: ${book.author}</p>
            <p class="book-genre">${book.genre}</p>
            <button onclick="viewBook(${book.id})"> View Details</button>
        `;

        bookList.appendChild(card);
    });

}

// GET ONE BOOK
async function viewBook(id) {

    try {
        const response = await fetch(`${API_URL}/books/${id}`);
        const book = await response.json();

        alert(`
            ${book.title}
            
            Written by:
            ${book.author}

            Published by:
            ${book.publisher}

            Year published:
            ${book.year}

            Genre:
            ${book.genre}

            Synopsis:
            ${book.synopsis}
        `);
    }
    catch (error) {
        console.error(error);
        alert("Unable to retrieve book.");
    }

}

// SEARCH
async function searchBooks() {

    const query = document.getElementById("searchInput").value;
    if (!query) {
        loadBooks();
        return;
    }
    try {
        const response =
            await fetch(`${API_URL}/books/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        displayBooks(data.results);
    }

    catch (error) {
        console.error(error);
        alert("Search failed.");
    }
}

loadBooks();