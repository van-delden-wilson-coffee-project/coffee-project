"use strict";

var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

function renderCoffee(coffee) {
    var html = '<div class="col-5 col-md-3 p-0 coffee">';
    html += '<div class="remove-id">' + coffee.id + '</div>';
    html += '<h3 class="col-3 d-inline">' + coffee.name + '</h3>';
    html += '<p class="col-3">' + coffee.roast + '</p>';
    html += '</div>';
    return html;

}
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// DISPLAYS ALL COFFEES
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === 'all' || selectedRoast === '') {
            filteredCoffees.push(coffee);
        }
    });
    dbody.innerHTML = renderCoffees(filteredCoffees);

}
//Updates search on keyup
function updateSearch() {
    let compare = coffeeToSearch.value;
    let matching = [];
    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().indexOf(compare.toLowerCase()) !== -1 || coffee.roast.toLowerCase().indexOf(compare) !== -1) {
            matching.push(coffee);
        }
    });
    dbody.innerHTML = renderCoffees(matching);
}
// TODO: create a new object for the array of coffees that is added to coffees

var coffeeStorage = coffees.length + 1
if (localStorage.length > 0) {
    coffees.push(JSON.parse(window.localStorage.getItem(coffeeStorage)));
}

// CREATES COFFEE OBJ AND ADDS TO COFFEES ARRAY
function addCoffee(e) {
    e.preventDefault();

    let coffeeObj = {
        id: coffees.length + 1,
        name: submitText.value,
        roast: roastAdd.value
    };

    coffees.push(coffeeObj);
    dbody.innerHTML = renderCoffees(coffees);
    localStorage.setItem(coffeeStorage, JSON.stringify(coffeeObj));
    JSON.parse(window.localStorage.getItem(coffeeStorage));

    // TODO:Use below for testing localstorage. Make it so that localstorage holds more than 1 coffeeObj. When page reload, all coffeeObj stay on the page
    // Localstorage = localstorage + coffeobj
    // Make it
    // console.log(JSON.parse(window.localStorage.getItem(coffeeStorage)));
}



// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var dbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit-coffee');
var roastSelection = document.querySelector('#roast-selection');
var roastAdd = document.getElementById("added-coffee")
var coffeeToSearch = document.getElementById("coffee-search");
var submitText = document.getElementById('submit-text');


dbody.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', updateCoffees);
coffeeToSearch.addEventListener('keyup', updateSearch);
submitButton.addEventListener('click', addCoffee);

