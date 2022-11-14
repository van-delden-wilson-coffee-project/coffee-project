"use strict";

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<div class="remove-id">' + coffee.id + '</div>';
    html += '<div>' + coffee.name + '</div>';
    html += '<div>' + coffee.roast + '</div>';
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
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === 'all') {
            filteredCoffees.push(coffee);
        }
    });
    dbody.innerHTML = renderCoffees(filteredCoffees);
}

function updateSearch() {
    let compare = coffeeToSearch.value;
    let matching = [];
    coffees.forEach(function(coffee) {
        if(coffee.name.toLowerCase().indexOf(compare) !== -1 || coffee.roast.toLowerCase().indexOf(compare) !== -1) {
            matching.push(coffee);
        }
    });
    dbody.innerHTML = renderCoffees(matching);
}
// function
// {id: 14, name: 'French', roast: 'dark'}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
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

const input = document.querySelector('input');
var dbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeToSearch = document.getElementById("coffee-search");

dbody.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', updateCoffees);
coffeeToSearch.addEventListener('keyup', updateSearch);
// submitButton.addEventListener('click', addCoffee);