// display cards by last name ascending on page load
$(document).ready(function() {
  data.sort(dynamicSort("lastName"));
  allCards();
});

// listen for a select option
$('#sort-select').change(function() {
  // empty the card grid
  $("#card-grid").empty();
  // sort the data by the selected property
  data.sort(dynamicSort( this.value));
  // generate cards
  allCards();
});

// to sort the data by selected property
function dynamicSort(property) {

  var sortOrder = -1;

  return function (a,b) {
    // if first of properties to sort is undefined, push it to the end
    if (!a[property]) {
      return 1;
    // if second of properties to sort is undefined, push it to the end
    } else if (!b[property]) {
      return -1; 
    } else { 
      // compare the selected property of each person
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }    
    }
  }
}

function allCards() {
  $.each(data, function(i, person) {
    // for each person we call out to a function to create a card
    var card = createCard(person, i);
    // appeand each card to the grid
    $("#card-grid").append(card);
  });
}

function createCard(person, idx) {
  return `
  <div class="card" data-last-name="${person.lastName}">
    <div class="image-container"><img class="profile-pic" src="https://placekitten.com/200/200" alt="A placeholder photo"></div>
    <p class="full-name">${person.firstName} ${person.lastName}</p>
    <p class="job-title">${person.jobTitle}</p>
    ${person.reportsTo ? `<p class="reports-to">Reports to: ${person.reportsTo}</p> `: `<p>Yo ${person.firstName} don't report to no one</p>`}
  </div>
  `;
}
