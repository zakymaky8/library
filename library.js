let myLibrary = [];

let titleInput = document.querySelector('#title');
let authorInput = document.querySelector('#author');
let pagesInput = document.querySelector('#pages');
let selectedStatus = document.querySelector('#status');

let body = document.querySelector('body');
let booksContainer = document.querySelector('.main');
let bookCard = document.querySelector('.card');

let bookName = document.querySelector('#book-name');
let readCheck = document.querySelector('.read-check');
let page = document.querySelector('#page');
let author = document.querySelector('#author-name');

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;  
    this.status = status;
}

// function for side slider menu

function revealConceal() {
    if (sideMenu.style.transform === 'translate(0%, 0%)') {
        sideMenu.style.transform = 'translate(-100%, 0%)'
        sideMenu.style.transition = 'all 1.2s';
    }
    else if (menu.style.display==='none') {
        sideMenu.style.display = 'none'
    }
    else {
        sideMenu.style.transform = 'translate(0%, 0%)';
        sideMenu.style.transition = 'all 1.2s';
    }
}
let reset = document.querySelectorAll('.reset');
let arrReset = Array.from(reset);
arrReset.forEach((r)=>{
    r.addEventListener('click', () => {
        window.location.reload();    
    });
})

let sideMenu = document.querySelector('.info-article1')
let menu = document.getElementById('menu');
let colapse = document.querySelector('#colapse');

colapse.addEventListener('click', ()=>{
    revealConceal()
})
menu.addEventListener('click', ()=>{
    revealConceal()
})

let checkData;

function activateReadingStatus() {
    let statusCheck = document.querySelectorAll('.status-check');
    let arrOfStatus = Array.from(statusCheck);
    selectedStatus.addEventListener('change',()=>{
        let readingStatus = selectedStatus.value;
        checkData=selectedStatus.value;
    })
    arrOfStatus.forEach((sc) => {
        switch (sc.textContent) {
            case 'Done':
                sc.style.backgroundColor='green';
                break;
            case "Not Read":
                sc.style.backgroundColor="red";
                break;
            case "On Reading":
                sc.style.backgroundColor="rgb(108, 108, 9)"
                break;
            default:
                break;
        }

        sc.addEventListener('click', function(){
            if (sc.textContent==='Done') {
                sc.textContent= "Not Read";
                sc.style.backgroundColor = 'red';
            }
            else if (sc.textContent==='Not Read') {
                sc.textContent= "On Reading";
                sc.style.backgroundColor = 'rgb(108, 108, 9)';
    
            }
            else if (sc.textContent==='On Reading') {
                sc.textContent= "Done";
                sc.style.backgroundColor = 'green';
            }
        })
    })
}
let bookObject;

function addBookToLibrary() {
    bookObject  =  new Book(titleInput.value, authorInput.value, pagesInput.value, checkData);
    myLibrary.push(bookObject)
}

// function that creates added book cards
let newCards = [];
function createBookItem() {
    for (let i = 0; i < myLibrary.length; i++) {
        const newBookCard = bookCard.cloneNode(true);
        newBookCard.querySelector('#book-name').textContent = myLibrary[i].title;
        newBookCard.querySelector('.read-check').textContent = myLibrary[i].status;
        newBookCard.querySelector('#page').textContent = myLibrary[i].pages;
        newBookCard.querySelector('#author-name').textContent = myLibrary[i].author;
        newCards.push(newBookCard);
    }
    newCards.forEach((card) => {
        booksContainer.appendChild(card);
    });
}
let totBooksNumber = document.querySelector('#total');
//total books number
let sidTot = document.querySelector('#nums-tot')
let addTo = document.querySelector('#add-to'); //
let arr;

addTo.addEventListener('click',()=>{
    if (titleInput.value==='' ||
    pagesInput.value==='' || authorInput.value===''|| pagesInput.value<=5) {
        alert("Please fill all fields");
    }
    else {
        addBookToLibrary();
        dialog.style.opacity = '0';
        dialog.style.transform = 'scale(0.5,0.5)  translate(0%,0%)';
        createBookItem();
        myLibrary.pop();
    }
    activateDelButton()
    activateReadingStatus()
    let readCheckClasses = document.querySelectorAll('.read-check');
    let arrReadCheck = Array.from(readCheckClasses);
    let arr = Array.from(booksContainer.children)
    totBooksNumber.textContent = arr.length;
    sidTot.textContent = arr.length;
    
} )

function activateDelButton() {
    let imgDelete = document.querySelectorAll("img[alt='delete']");
    let arrImg = Array.from(imgDelete);
    
    arrImg.forEach((del) => {
        del.addEventListener('click', () => {
            const card = del.parentElement.parentElement;
            card.remove();
            newCards.pop();
            let arr = Array.from(booksContainer.children);
            totBooksNumber.textContent = arr.length;
            sidTot.textContent = arr.length;
        });
    });
}

document.addEventListener('DOMContentLoaded', ()=>{
    activateDelButton();
    activateReadingStatus()
})

let addBtn = document.querySelector('#add-btn');
let closeBtn = document.querySelector('#closeBtn');
let dialog = document.querySelector('.modal');
let clear = document.querySelector('#clear');

addBtn.addEventListener('click',()=> {
    dialog.showModal();
    dialog.style.opacity = '1'
    dialog.style.transform = 'scale(1.1,1.2) translate(-50%, -50%)'
    dialog.style.transition = 'opacity .6s, transform .6s';
})

closeBtn.addEventListener('click',(e)=> {
    dialog.close();
    e.preventDefault()
    dialog.style.opacity = '0';
    dialog.style.transform = 'scale(0.5,0.5)  translate(0%,0%)'

})

function clearInputs() {
    titleInput.value=null;
    pagesInput.value=null;
    authorInput.value=null;
}
clear.addEventListener('click', (e)=>{
    clearInputs()
    e.preventDefault()
})
// to allow dialog closed with non-region click 
// this code adopted from https://blog.webdevsimplified.com/
dialog.addEventListener("click", e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
      dialog.style.opacity = '0';
      dialog.style.transform = 'scale(0.5,0.5)  translate(0%,0%)'
    }
  })