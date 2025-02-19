"use strict";
(function () {
//VARIABLES
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

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
    var dbody = document.querySelector('#coffees');
    var submitButton = document.querySelector('#submit-coffee');
    var roastAdd = document.getElementById("added-coffee")
    var submitText = document.getElementById('submit-text');
    var roastSelection = document.querySelector('#roast-selection');
    var coffeeToSearch = document.getElementById("coffee-search");

//FUNCTIONS
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
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

//This checks for anything in local storage. If there is an item in local storage,
// push to the coffee array
if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
        coffees.push(JSON.parse(window.localStorage.getItem(coffees.length + 1)));
    }
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
    localStorage.setItem(coffeeObj.id.toString(), JSON.stringify(coffeeObj)); //key(id): "coffeeObj"
    JSON.parse(window.localStorage.getItem(coffeeObj.id.toString()));
    submitText.value = ''; //resets typed value
}

//function for search and roast input fields
//CONDITION 1: IF searched value is a present in coffee.name OR search value is empty AND coffee.roast is equal to the selected roast in dropdown light/medium/dark
//CONDITION 2: IF searched value is a present in coffee.name OR searched value is present in coffee roast AND selected roast dropdown is equal to an empty string, all/select a roast
function updateSearch() {
    let searchedCoffee = coffeeToSearch.value; //gets value of coffee-search input field
    let selectedRoast = roastSelection.value; //gets value of dropdown
    let matching = []; //new array of coffees
    coffees.forEach(function (coffee) {
        if ((coffee.name.toLowerCase().indexOf(searchedCoffee.toLowerCase()) !== -1 || coffee.name === '') && coffee.roast === selectedRoast) {
            matching.push(coffee); //push coffee to the array of coffees
        } else if ((coffee.name.toLowerCase().indexOf(searchedCoffee.toLowerCase()) !== -1 || coffee.roast.toLowerCase().indexOf(searchedCoffee) !== -1) && selectedRoast === '') {
            matching.push(coffee); //push coffee to new array
        }
    });
    dbody.innerHTML = renderCoffees(matching);
}

//LISTENERS
coffeeToSearch.addEventListener('keyup', updateSearch);
coffeeToSearch.addEventListener('search', updateSearch);
roastSelection.addEventListener('change', updateSearch);
submitButton.addEventListener('click', addCoffee);
//Render coffees
dbody.innerHTML = renderCoffees(coffees);
})();

