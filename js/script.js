'use strict'

fetch('https://swapi.dev/api/starships/')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        buildContentCallback(data);
    })
    .catch(function (error) {
        console.error("ERROR: ", error);
        return error
    });


    function buildContentCallback(data) {
        console.log("the data is:", data.results);

        const starshipNameList = document.createElement('ul');
        const starships = data.results;

        starships.forEach(function (starship) {
            const starshipNameItem = document.createElement('li');
            starshipNameItem.innerText = starship.name;
            starshipNameList.append(starshipNameItem)
        });

        const root = document.querySelector('#root');
        root.append(starshipNameList);
    }
    const selectElement = document.createElement("select");
    const searchButton = document.querySelector("#searchButton");
    document.addEventListener('DOMContentLoaded', function() {
        fetchTheShips()
        const searchForm = document.querySelector('#searchForm');
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const inputSearch = document.querySelector('input');
            doSearch(inputSearch.value);
        searchButton.addEventListener("click", function() {
            fetchSpecificShip(currentShip);
        })
        })
    });

function doSearch(name) {
    console.log("looking for starship:  ", name);

    fetch(`https://swapi.dev/api/starships/?search=${name}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("looking for starship: ", data);
            // Before we even call the callback
            // Make sure we actually have data!
            if (data.count > 0) {
                buildSearchResults(data);
            }
        })
        .catch(function (error) {
            console.error("ERROR: ", error);
            return error;
        });
}


function buildSearchResults(data) {
    const searchResults = data.results;
    const searchResultsDiv = document.querySelector('#searchResults');

    searchResults.forEach(function (result) {
        const starshipInfo = document.createElement('p');
        starshipInfo.innerText = `${result.name} is the common name of this starship. ${result.name} is a ${result.model} and is in the class of ${result.starship_class}. Here are the films it has appeared in ${result.films}`
        searchResultsDiv.appendChild(starshipInfo);
    })
}
