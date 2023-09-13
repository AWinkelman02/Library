const myLibrary = [
  holes = new Book('Holes', 'Louis Sachar', 288, 'read'),
];
const addBookButton = document.querySelector('.addBook');
const newBookButton = document.querySelector('.newBook');
const closeFormButton = document.querySelector('.closeForm');
const modalForm = document.querySelector('.modal-form');
const mainGrid = document.querySelector('.main-grid');

function Book(title, author, pages, read){
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

addBookButton.addEventListener('click', () => {
  modalForm.showModal();
  //modalForm.style.display = 'block';
})

closeFormButton.addEventListener('click', () => {
  modalForm.close();
  //modalForm.style.display = 'none';
})

newBookButton.addEventListener('click', () => {
  //get inputs
  let read = "";
  let title = document.querySelector('#addTitle').value;
  let author = document.querySelector('#addAuthor').value;
  let pages = document.querySelector('#addPages').value;
  let checkbox = document.querySelector('#addRead').checked;
  if (checkbox === true){read = "read"}
  else{read = "unread"}

  if(title === "" || author === "") return

  addBookToLibrary(title,author,pages,read);
  
  //create display
  updateDisplay();

  //clear modal inputs
  clearInputs();
})

modalForm.addEventListener('submit', handleForm);

function addBookToLibrary(title,author,pages,read) {
  //call object constuctor
  let newBook = new Book(title,author,pages,read);

  //append to array
  myLibrary.push(newBook);
}

function updateDisplay(){
  clearDisplay();
  for(let i = 0; i < myLibrary.length; i++){
    let card = document.createElement('div');
    let h3 = document.createElement('h3');
    h3.innerHTML = `${myLibrary[i].title}`;
    let h4 = document.createElement('h4');
    h4.innerHTML = `${myLibrary[i].author}`;
    let p = document.createElement('p');
    p.innerHTML = `${myLibrary[i].pages}`;
    let h6 = document.createElement('h6');
    h6.innerHTML = `${myLibrary[i].read}`;
    let readButton = document.createElement('button');
    readButton.innerHTML = `${myLibrary[i].read}`;
    let deleteBook = document.createElement('button');
    deleteBook.innerHTML = 'X';
  
    card.className = 'card';
    deleteBook.className = 'deleteBook';
    deleteBook.setAttribute('data-value', `${i}`);
    readButton.className = 'read';
    readButton.setAttribute('data-value', `${i}`);

    readButton.addEventListener('click', (e) => {
      changeReadStatus(e.target.getAttribute('data-value'));
    })

    deleteBook.addEventListener('click', (e) => {
      deleteBookListing(e.target.getAttribute('data-value'));
    })

    card.append(deleteBook, h3, h4, p, h6, readButton);
    mainGrid.appendChild(card);
  }
}

function changeReadStatus(bookID){
  if(myLibrary[bookID].read === 'read'){myLibrary[bookID].read = 'unread'}
  else{myLibrary[bookID].read = 'read'}
  clearDisplay();
  updateDisplay();
}

function deleteBookListing(bookID){
  myLibrary.splice(bookID,1);
  clearDisplay();
  updateDisplay();
}

function clearDisplay(){
  mainGrid.innerHTML = '';
}

function clearInputs(){
  let title = document.querySelector('#addTitle').value = "";
  let author = document.querySelector('#addAuthor').value = "";
  let pages = document.querySelector('#addPages').value = "";
  let checkbox = document.querySelector('#addRead').checked = false;
}

function handleForm(event){
  event.preventDefault();
}

updateDisplay();
