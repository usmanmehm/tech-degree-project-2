// This program takes a page with a list of students and separates them into pages with buttons to navigate.
// It first creates the buttons depending on how many results per page you want
// Then it hides all the students, then shows the ones that are supposed to be on that page

const masterList = $('.student-list li'); //getting list of students
let listLength = masterList.length;
resultsPerPage = 10; //# of students shown on each page

//displaying the first page
for (let i = resultsPerPage; i < masterList.length; i += 1) {
  masterList[i].style.display = 'none';
}

// creating and inserting the HTML page buttons
buttonHTML = createButtons(resultsPerPage,listLength); //calling function to create HTML page buttons
const buttons = document.createElement('ul'); //creating the HTML element
buttons.className = "pagination"; // attaching this class name for design purposes
buttons.innerHTML = buttonHTML;
$('.page').append(buttons);

// setting the id of Page 1 as button-pressed to apply CSS formatting
document.querySelector('.page-button').id = 'button-pressed';

// ------- SEARCH COMPONENT with HTML and class name for design ----------- //
const search = document.createElement('div');
search.className = 'student-search';
let searchHTML = `<input type="text" placeholder="Search for students...">
                  <button>Search</button>`;
search.innerHTML = searchHTML;
$('.page-header').append(search);

// Setting up element that will hold the message if there are no search results
const emptyMessage = document.createElement('h1');
emptyMessage.className = 'empty-message'
const node = $('.student-list');
node.append(emptyMessage);

// ------- Event listener for letter inputs in search field ----------- //
$('.student-search input').on('keyup', function (event) {
  let searchValue = document.querySelector('input');
  searchValue = searchValue.value.toUpperCase();
  let $studentDetails = $('.student-details h3'); // selecting the student details
  studentsToShow = searchItems($studentDetails, searchValue); //receives an array with the students that match
  newButtonHTML = createButtons(resultsPerPage,studentsToShow.length); //dynamically update buttons
  $('.pagination')[0].innerHTML = newButtonHTML;

  if (studentsToShow.length === 0) {
    $('.empty-message')[0].innerHTML = `Sorry, the search term '${document.querySelector('input').value}' did not return any results`;
  } else {
      $('.empty-message')[0].innerHTML = '';
      document.querySelector('.page-button').id = 'button-pressed';
  }

  createSearchPage(studentsToShow, resultsPerPage, 1); //dynamically create pages as search terms are entered
  // have to re-insert the event listener for changing pages as it stops working after someone searches
  $('.page-button').on('click', function (event) {
    $('.pagination a').each(function (index, element) {
      element.id = ''; //setting all IDs to be blank before applying
                       //the 'button-pressed' id to the current page button
    });
    this.id = 'button-pressed';
    let buttonClicked = this.innerHTML;
    createSearchPage(studentsToShow, resultsPerPage, buttonClicked);
  });
});

// ------- Event listener to change pages ----------- //
// waiting for the click event which will change the page. It also makes sure
// to apply the appropriate id for the current page
$('.page-button').on('click', function (event) {
  $('.pagination a').each(function (index, element) {
    element.id = ''; //setting all IDs to be blank before applying
                     //the 'button-pressed' id to the current page button
  });
  this.id = 'button-pressed';
  let buttonClicked = this.innerHTML;
  createPage(buttonClicked, resultsPerPage);
});


// ------- Search function - returns an array with the index values of the search results ----------- //
// it also hides the students whose names don't match what the user searches
function searchItems (list, inputValue) {
  let student = '';
  let indexOfStudents = [];
  for (let i = 0; i < list.length; i+=1) {
    student = list[i].textContent;
    if (student.toUpperCase().indexOf(inputValue) > -1) {
      list[i].parentElement.parentElement.style.display = '';
      indexOfStudents.push(i);
    } else {
      list[i].parentElement.parentElement.style.display = 'none';
    }
  }
  return indexOfStudents;
}

// ------- Function to create page buttons dynamically ----------- //
function createButtons(resultsPerPage, listLength) {
  let noPages = Math.ceil(listLength/resultsPerPage); //calculating the number of buttons to create
  buttonHTML = ""; //empty HTML
  for (let i=1; i <= noPages; i += 1) {
    buttonHTML += `<li><a class='page-button' href="#">${i}</a></li>`;
    //for every button, we create an HTML anchor tag within an li element
  }
  return buttonHTML;
}

// ------- Function that dynamically determines what page to display ----------- //
function createPage(pageNo, resultsPerPage) {
  let totalStudents = masterList.length;
  let firstStudentOnPage = (pageNo-1)*resultsPerPage;
  let lastStudentOnPage = pageNo*resultsPerPage - 1;

  for (let i = 0; i < totalStudents; i += 1) { // first hide all students
    masterList[i].style.display = 'none';
  }
  // then display students on their appopriate page
  if (lastStudentOnPage < totalStudents) {
    for (let i = firstStudentOnPage; i <= lastStudentOnPage; i++) {
      masterList[i].style.display = '';
    }
  }
  else {
    for (let i = firstStudentOnPage; i < totalStudents; i++) {
      masterList[i].style.display = '';
    }
  }

}
// ------- Function for displaying search result pages ----------- //
// Differs from other function as this one takes in an array of index values
// and creates pages using the page no. and desired results on the page
function createSearchPage(indexValues, resultsPerPage, pageNo) {
  for (let i = 0; i < masterList.length; i += 1) {
    masterList[i].style.display = 'none';
  }

  let noOfStudents = indexValues.length;
  let firstStudentOnPage = (pageNo-1)*resultsPerPage;
  let lastStudentOnPage = pageNo*resultsPerPage - 1;

  if (lastStudentOnPage < noOfStudents) {
    for (let i = firstStudentOnPage; i <= lastStudentOnPage; i++) {
      masterList[indexValues[i]].style.display = '';
    }
  }
  else {
    for (let i = firstStudentOnPage; i < noOfStudents; i++) {
      masterList[indexValues[i]].style.display = ''
    }
  }

}
