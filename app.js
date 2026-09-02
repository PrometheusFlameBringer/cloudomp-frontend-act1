// TRANSITIONS START
const header = document.getElementById("mainHeader");
const introduction = document.querySelector(".introduction");
const headerSearch = document.querySelector(".search-head");
const searchMain = document.querySelector(".search-main");
const overlay = document.getElementById("overlay");

const observerH = new IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            header.classList.remove("scrolled");
        } else {
            header.classList.add("scrolled");
        }
    },
    {
        threshold: .3
    }
);

const observerM = new IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            headerSearch.classList.remove("scrolled");
        } else {
            headerSearch.classList.add("scrolled");
        }
    },
    {
        threshold: 0
    }
);

observerH.observe(introduction);
observerM.observe(searchMain);
// TRANSITIONS END

// OVERLAY STUFF START
function closeOverlay() {
    overlay.classList.remove("show");
}
// OVERLAY STUFF END

// API STUFF START
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
            <div class="book-img">
                <img src="${book.imgLink}" alt="${book.title} cover image">
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="book-author">By: ${book.author}</p>
                <p class="book-rating">⭐ ${book.rating}</p>
                <p class="book-genre">Genre: ${book.genre}</p>
                <button onclick="viewBook(${book.id})"> View Details</button>
            </div>
        `;

        bookList.appendChild(card);
    });

}

// GET ONE BOOK
async function viewBook(id) {
    const overlayBox = document.getElementById("overlayBox");

    try {
        const response = await fetch(`${API_URL}/books/${id}`);
        const book = await response.json();

        const bookDetailsList = [["Originally Published",book.year],["Genre",book.genre],["Rating",book.rating],["Publisher",book.publisher],["Publication Place",book.publicationPlace],["Language",book.language],["Audiobook Duration",book.audiobookDuration],["Number of Pages",book.pageNumber],["Estimated Word Count",book.wordCount]];

        overlayBox.innerHTML = `
            <div class="titleWauth">
                <h1>${book.title}</h1>
                <h3>By ${book.author}</h3>
            </div>
            <div class="bookDetails"></div>
            <div class="bookChars">
                <h1>Main Characters</h1>
            </div>
            <div class="bookLl">
                <h1>Summary</h1>
                <h3>${book.summary}</h3>
            </div>
        `;

        const detailsContainer = overlayBox.querySelector(".bookDetails");
        bookDetailsList.forEach(detail => {
            const card = document.createElement("div");
            card.className = "descCard";
            card.innerHTML = `
                <h4>${detail[0]}</h4>
                <p>${detail[1]}</p>
            `;

            detailsContainer.appendChild(card);
        });
    }
    catch (error) {
        console.error(error);
        alert("Unable to retrieve book.");
    }
   overlay.classList.add("show");

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
// API STUFF END