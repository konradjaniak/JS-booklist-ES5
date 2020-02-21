// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() { }

// Add book to the book list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // Create table row element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
};

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

// Clear all fields of the form
UI.prototype.clearFields = function () {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
};

// Show alert
UI.prototype.showAlert = function (message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form element
    const form = document.querySelector('#book-form');
    // Insert alert before form
    container.insertBefore(div, form);

    // Remove alert after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
};

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function (event) {
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate a book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book added!', 'success');

        // Clear fields
        ui.clearFields();
    }

    event.preventDefault();
});

// Event listener for delete book
document.getElementById('book-list').addEventListener('click', function (event) {
    // Instantiate UI
    const ui = new UI();

    // Delete book from the list
    ui.deleteBook(event.target);

    // Show success alert
    ui.showAlert('Book deleted!', 'success');
    event.preventDefault();
});