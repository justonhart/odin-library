const myLibrary = [];
const bookList = document.getElementById('bookList');
const fields = Array.from(document.querySelectorAll('#bookForm input[id]'));

addEventListener('submit', event => {
	event.preventDefault();
	if(fields.every( field => field.value != "")){
		const newBook = new Book(
			fields[0].value,
			fields[1].value,
			fields[2].value,
			fields[3].checked
		);
		addBookToLibrary(newBook);
		fields[0].focus();
		
	}
});


//function definitions

function Book(title, author, pageCount, read){
	this.title = title;
	this.author = author;
	this.pageCount = pageCount;
	this.read = read;
}

function addBookToLibrary(book){
	myLibrary.push(book);
	renderLibrary();
}

function renderLibrary(){
	bookList.innerHTML = "";
	myLibrary.forEach(book => {
		const newBook = document.createElement('li');
		const title = document.createElement('span');
		title.textContent = book.title;
		newBook.appendChild(title);
		const author = document.createElement('span');
		author.textContent = book.author;
		newBook.appendChild(author);
		const pageCount = document.createElement('span');
		pageCount.textContent = book.pageCount;
		newBook.appendChild(pageCount);
		const read = document.createElement('span');
		read.textContent = 'Read: ' + (book.read ? 'True' : 'False');
		newBook.appendChild(read);
		bookList.appendChild(newBook);
	});
}
