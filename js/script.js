// This program takes a page with a list of students and separates them into pages with buttons to navigate.
// It first creates the buttons depending on how many results per page you want
// Then it hides all the students, then shows the ones that are supposed to be on that page 

const students = $('.student-list li'); //getting list of students
resultsPerPage = 10; //# of students shown on each page

//displaying the first page
for (let i = resultsPerPage; i < students.length; i += 1) {
  students[i].style.display = 'none';
}

// creating and inserting the HTML buttons
buttonHTML = createButtons(resultsPerPage,students); //calling function to create HTML buttons
const buttons = document.createElement('ul'); //creating the HTML element in which we'll add the button HTML
buttons.className = "pagination"; // attaching this class name for design purposes
buttons.innerHTML = buttonHTML;
$('.page').append(buttons);

// setting the id of Page 1 as button-pressed to apply CSS formatting
document.querySelector('.page-button').id = 'button-pressed';

//CHANGING PAGES
// waiting for the click event which will change the page. It also makes sure to apply the appropriate id for the current page
$('.page-button').on('click', function (event) {
  $('.pagination a').each(function (index, element) {
    element.id = ''; //setting all IDs to be blank before applying the 'button-pressed' id to the current page button
  });
  this.id = 'button-pressed';
  for (let i = 0; i < students.length; i += 1) {
    students[i].style.display = 'none';
  } // makes sure all students are hidden before showing the relevant students

  let buttonClicked = this.innerHTML;
  let lastStudent = buttonClicked*resultsPerPage;
  // if the last student is less than the total # of students, then it executes like this. If not, then the else statement will execute
  if(lastStudent < students.length) {
    for (let i = lastStudent - resultsPerPage; i < lastStudent; i += 1) {
      students[i].style.display = 'block';
    }
  }
  else {
    for (let i = lastStudent - resultsPerPage; i < students.length; i += 1) {
      students[i].style.display = 'block';
    }
  }
});




function createButtons(resultsPerPage, list) {
  const classLength = list.length;
  let noPages = Math.ceil(classLength/resultsPerPage); //calculating the number of buttons to create
  buttonHTML = ""; //empty HTML
  for (let i=1; i <= noPages; i += 1) {
    buttonHTML += `<li><a class='page-button' href="#">${i}</a></li>`; //for every button, we create an HTML button element
  }
  return buttonHTML;
}
