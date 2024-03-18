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
		fields[0].select();
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
	myLibrary.forEach((book, index) => {
		const newBook = document.createElement('li');
		newBook.dataset.index = index;
		if(book.read){
			newBook.classList.add('read');
		}

		const title = document.createElement('span');
		title.textContent = book.title;
		title.classList.add('title');
		newBook.appendChild(title);

		const author = document.createElement('span');
		author.textContent = book.author;
		author.classList.add('author');
		newBook.appendChild(author);

		const pageCount = document.createElement('span');
		pageCount.textContent = 'Page count: ' + book.pageCount;
		newBook.appendChild(pageCount);

		const read = document.createElement('span');
		read.textContent = 'Read: ' + (book.read ? 'True' : 'False');
		newBook.appendChild(read);
	
		const buttonPanel = document.createElement('div');
		buttonPanel.classList.add('buttonPanel');

		const readButton = document.createElement('button');
		readButton.textContent = '✔';
		readButton.addEventListener('click', (event) => {
			const index = event.target.parentElement.parentElement.dataset.index;
			myLibrary[index].read = !myLibrary[index].read;
			renderLibrary();
		});
		buttonPanel.appendChild(readButton);

		const deleteButton = document.createElement('button');
		deleteButton.textContent = '✖';
		deleteButton.addEventListener('click', (event) => {
			const index = event.target.parentElement.parentElement.dataset.index;
			myLibrary.splice(index, 1);
			renderLibrary();
		});
		buttonPanel.appendChild(deleteButton);

		newBook.appendChild(buttonPanel);

		bookList.appendChild(newBook);
	});
}
