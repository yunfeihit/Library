const dialog = document.getElementById('add-book-dialog');
const addBookBtn = document.getElementById('add-book-btn');
const sumbitBtn = document.querySelector('#submit-btn');
const form = document.querySelector('#book-form')

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
})


// Set the Close Behavior of dialog:
    // if click outside of the dialog, close the dialog
dialog.addEventListener('click', (event) => {
    // get the DOMrect object of the dialog
    const rect = dialog.getBoundingClientRect()
    const clickInsideDialog = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
    if (!clickInsideDialog) {
        dialog.close();
    }
})


// Set the Data Structure
const myLibrary = [];

function Book(bookName, author, pages, ifRead) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.ifRead = ifRead;
}

function addBookToLibrary(bookName, author, pages, ifRead) {
    const oneBook = new Book(bookName, author, pages, ifRead);
    myLibrary.push(oneBook);
}


// Set the Submit button:
    // prevent the default behavior(submit to the 'action' attribute) and get the input value
sumbitBtn.addEventListener('click', (event) => {
    // prevent the default behavior of the form
    event.preventDefault();
    // check the form validity by JS(since the default behavior is prevent);
    if (form.checkValidity()) {
        const book = document.querySelector('#book-name-input').value;
        const author = document.querySelector('#book-name-input').value;
        const pages = document.querySelector('#pages-input').value;
        const ifRead = document.querySelector('#ifRead-input').value;
    // if the Validity is checked, create a book object and add it to the Library with 'addBookToLibrary' function
        addBookToLibrary(book, author, pages, ifRead);
    // show the book cars with 'showCards' function
    showCards(myLibrary);
    }
    else {
        form.reportValidity();
    }
})


// Function: Show the Books by Cards
function showCards(array) {
    array.forEach((item) => {
        // Create all the element
        const card = document.createElement('div');
        const bookName = document.createElement('h2');
        const author = document.createElement('h2');
        const pages = document.createElement('h2');
        // Set the class name of the created element
        card.className = 'card';
        bookName.className = 'book-name';
        author.className = 'author';
        pages.className = 'pages';
        // add text content to the created element
        bookName.textContent = item.bookName;
        author.textContent = item.author;
        pages.textContent = '{item.pages}:Pages';
        // make them a smal DOM tree
        card.appendChild(bookName);
        card.appendChild(author);
        card.appendChild(pages);
    })
}







