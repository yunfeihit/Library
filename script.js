const dialog = document.getElementById('add-book-dialog');
const addBookBtn = document.getElementById('add-book-btn');

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
})