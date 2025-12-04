//Define the global variable
const dialog = document.getElementById('add-book-dialog');
const addBookBtn = document.getElementById('add-book-btn');
const submitBtn = document.querySelector('#submit-btn');
const form = document.querySelector('#book-form');
const cardsContainer = document.querySelector('#cards-container');
const totalBookCountLog = document.querySelector('#total-book-count');
const readBookCountLog = document.querySelector('#read-book-count');
const notReadBookCountLog = document.querySelector('#not-read-book-count');

// Deifine the dialog behavior
addBookBtn.addEventListener('click', () => {
    dialog.showModal();
})
    // Set the Close Behavior of dialog: if click outside of the dialog, close the dialog
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

// Update a Class(Book)
class Book {
    constructor(bookName, author, pages, ifRead) {
        this.bookName = bookName;
        this.author = author;
        this.pages = pages;
        this.ifRead = ifRead;
    }

    // Class Method: Create a book object and add it to the Library 
    addBookToLibrary() {
        myLibrary.push(this);
    }
    
}

// Function: Show the Books by Cards 
function showCards(array) {
    // Clear the card container first(list all the cards after that)
    cardsContainer.innerHTML = '';
    // Create all book cards(for everey item in the Library array)
    array.forEach((item) => {
        // Create all the element of the card
        const card = document.createElement('div');
        const bookName = document.createElement('h2');
        const author = document.createElement('h2');
        const pages = document.createElement('h2');
        const ifRead = document.createElement('h2');
        const deleteCardBtn = document.createElement('button');

        // Set the class name of the created element
        card.className = 'card';
        bookName.className = 'book-name';
        author.className = 'author';
        pages.className = 'pages';
        ifRead.className = 'ifRead';
        deleteCardBtn.className = 'deleteCardBtn';

        // Add text content to the created element
        bookName.textContent = `'${item.bookName}'`;
        author.textContent = item.author;
        pages.textContent = `${item.pages} Pages`;
        if (item.ifRead) {
            ifRead.textContent = `Read`;
            ifRead.style.color = 'green';
        } else {
            ifRead.textContent = `Not Read`
            ifRead.style.color = 'red';
        };
        deleteCardBtn.textContent = 'Delete';

        // Set operation code of deleteCardBtn
        deleteCardBtn.addEventListener('click', ()=> {
        // IMPORTENT!!!: it should also delete the item in the array(myLibrary)
            const deleteBookIndex = array.findIndex( item => `'${item.bookName}'` === bookName.textContent);
            array.splice(deleteBookIndex, 1);
        // Update: run 'showCards' function
            showCards(myLibrary);
        // Update: run 'updateLibraryLog' function
            updateLibraryLog();
        })

        // Make items a smal DOM tree
        card.appendChild(bookName);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(ifRead);
        card.appendChild(deleteCardBtn);

        // Put (every)card inside the container
        cardsContainer.appendChild(card);   
    })
    console.log(myLibrary);
}

// Function: undate the Library log
function updateLibraryLog() {
    totalBookCountLog.textContent = myLibrary.length;
    readBookCountLog.textContent = myLibrary.filter( item => item.ifRead === true ).length;
    notReadBookCountLog.textContent = myLibrary.filter( item => item.ifRead === false).length;
}

// Function: check if the book is already exist
function checkIfBookExist (bookName) {
    const ifBookExist = myLibrary.some( book => book.bookName === bookName);
    const existAlert = document.querySelector('#exist-alert');
    existAlert.style.display = 'none';
    if (ifBookExist) {        
        existAlert.style.display = 'block';
        return true;
    } else {
        return false;
    }
}


// Set the Submit button:
    // 1. prevent the default behavior(submit to the 'action' attribute)
    // 2. check the validity (by 'form.checkValidity()', which will check the self-set validity in the form html)
    // 3. check if the book(name) is already exist
    // 4. get the input value
    // 5. add the book to the library
    // 6. show all the book of the library by Cards
    // 7. update the Library log
    // 8. close the dialog
submitBtn.addEventListener('click', (event) => {
    // prevent the default behavior of the form(and redefin it)
    event.preventDefault();
    // check the form validity by JS(since the default behavior is prevent), and then get the 'book' property from the form:
    if (form.checkValidity()) {
        const book = document.querySelector('#book-name-input').value;
        const author = document.querySelector('#author-input').value;
        const pages = document.querySelector('#pages-input').value;
        const ifRead = document.querySelector('#ifRead-input').checked;
    // check if the book(name) is already exist
        if (checkIfBookExist(book)) {
            return
        };
    // if the Validity is checked, run 'addBookToLibrary' function
        const newBook = new Book(book, author, pages, ifRead);
        newBook.addBookToLibrary();
    // run 'showCards' function
        showCards(myLibrary);
    // run updateLibraryLog function
        updateLibraryLog();
    // close the dialog after that
        dialog.close();
    }
    else {
        form.reportValidity();
    }

})


