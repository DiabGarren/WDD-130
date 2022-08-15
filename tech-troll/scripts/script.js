// Set the default number of display items
var numItems = "12";
var pos = 0;
var forwards = true;

const products = [];
const NAME_INEDX = 0
const PRICE_INEDX = 1;
const AVAILABLE_INDEX = 2;
const IMAGE_INEDX = 3;
const LINK_INEDX = 4;


function onPageLoad() {
    document.querySelector(".outer-grid-compare").innerHTML = "";
    // Get the html section for editing
    stealData();
    displayData()
}

function stealData() {
    const content = document.querySelector(".content");
    const docHTML = content.innerHTML.split("\n");
    
    var i = 1;
    var productsPos = 0;
    // Loop through the html and store the data relevant to the products
    while (i < docHTML.length-1) {
        i += 3;
        let image = docHTML[i].split("\"")[1];
        i += 2;
        let name = docHTML[i].split(">")[1].split("<")[0];
        i++;
        let price = docHTML[i].split("R")[1].split("<")[0];
        i++;
        let link = docHTML[i].split("\"")[3].split("\n")[0];
        i += 3;
        let availability = docHTML[i].substr(24);
        products [productsPos] = name + "#" + price + "#" + availability + "#" + image + "#" + link;
        i += 4;
        // console.log(products[productsPos]);
        productsPos++;
    }
    // console.log(products.length)
}

function displayData() {
    const content = document.querySelector(".content");
    
    // Initialize the display content
    var newText = '';
    const productInfo = [];
    const item = [];
    var displayItems = 0;
    var displayLength = 0;
    
    
    // Split at each new line
    
    // Get the number of items to display to determine the number of times the loop runs
    switch (numItems) {
        case "12":
            displayItems = 12;
            break;
            case "24":
            displayItems = 24;
            break;
        case "36":
            displayItems = 36;
            break;
        case "max":
            displayItems = products.length;
    }
    var start = pos
    // console.log(pos)

    if (displayItems + start > products.length - 1 && forwards == true) {
        displayLength = products.length;
    } else if (pos > displayItems * 2 && forwards == false) {
        pos -= displayItems * 2;
        displayLength = displayItems + pos;
    } else if (forwards == true) {
        displayLength = displayItems + start;
    } else {
        pos = 0;
        displayLength = displayItems;
    }

    for (let i = pos; i < displayLength; i++) {
        productInfo[i] = products[i].split("#");
        item[i] = {
            name: productInfo[i][NAME_INEDX],
            price: productInfo[i][PRICE_INEDX],
            availability: productInfo[i][AVAILABLE_INDEX],
            image: productInfo[i][IMAGE_INEDX],
            link: productInfo[i][LINK_INEDX]
        };
        newText += '<div class="product-box">';
        newText += '<a href="' + item[i].link + '" target="_blank">';
        newText += '<img src="' + item[i].image + '" alt="' + item[i].name + '">';
        newText += '</a>';
        newText += '<p class="product-name">' + item[i].name + '</p>';
        newText += '<p class="price">Price: R' + item[i].price + '</p>';
        newText += '<a class="link" href="' + item[i].link + '" target="_blank">';
        newText += '<div class="button">';
        newText += item[i].availability;
        newText += '</div>';
        newText += '</a>';
        newText += '<div id="' + item[i].name + '">';
        newText += '<button onclick="addCompare(\'' + item[i].name + '\', \'' + item[i].price + '\', \'' + item[i].availability + '\', \'' + item[i].image + '\', \'' + item[i].link.substr(0, item[i].link.length - 1) + '\')" class="button" title="Compare">Compare</button>';
        newText += '</div>'
        newText += '</div>';
        pos++;
    }


    var startPage = '';
    var endPage = '</div>';
    // If the number of displayed items is less than the max then add a next page button
    if (pos == displayItems && pos < products.length) {
        startPage += '<nav class="pages">';
        startPage += '<a href="#" onclick="nextPage()">Next Page</a>';
        startPage += '</nav>';
    } else if (pos < products.length) {
        startPage += '<nav class="pages">';
        startPage += '<a href="#" onclick="prevPage()">Prev Page</a>';
        startPage += '<a href="#" onclick="nextPage()">Next Page</a>';
        startPage += '</nav>';
    } else if (pos == products.length && numItems != "max") {
        startPage += '<nav class="pages">';
        startPage += '<a href="#" onclick="prevPage()">Prev Page</a>';
        startPage += '</nav>';
    } else {
        startPage += '<nav class="pages">';
        startPage += '</nav>';
    }
    endPage += startPage;
    startPage += '<div class="outer-grid">';
    newText = startPage + newText + endPage;

    content.innerHTML = newText;

}

function noItems(selected) {
    numItems = selected.options[selected.selectedIndex].value;
    pos = 0;
    displayData();
}

function nextPage() {
    forwards = true;
    displayData();
}

function prevPage() {
    forwards = false;
    displayData();
}

function addCompare(name, price, availability, image, link) {
    const fromButton = document.getElementById(name);
    const content = document.querySelector(".outer-grid-compare");
    var newText = '';

    newText += '<div class="product-box" id="' + name + ' compare">';
    newText += '<a href="' + link + '" target="_blank">';
    newText += '<img src="' + image + '" alt="' + name + '">';
    newText += '</a>';
    newText += '<p class="product-name">' + name + '</p>';
    newText += '<p class="price">Price: R' + price + '</p>';
    newText += '<a class="link" href="' + link + '" target="_blank">';
    newText += '<div class="button">';
    newText += availability;
    newText += '</div>';
    newText += '</a>';
    newText += '<button onclick="removeCompare(\'' + name + '\', \'' + price + '\', \'' + availability + '\', \'' + image + '\', \'' + link + '\')" class="button" title="Remove">Remove</button>';
    newText += '</div>';

    content.innerHTML += newText;

    var fromText = '<button onclick="addCompare(\'' + name + '\', \'' + price + '\', \'' + availability + '\', \'' + image + '\', \'' + link + '\')" class="button" title="Compare" disabled>Comapared</button>';
    fromButton.innerHTML = fromText;
}

function removeCompare(name, price, availability, image, link) {
    const removeButton = document.getElementById(name + " compare");
    const oldButton = document.getElementById(name);

    removeButton.outerHTML = "";

    oldButton.innerHTML = '<button onclick="addCompare(\'' + name + '\', \'' + price + '\', \'' + availability + '\', \'' + image + '\', \'' + link + '\')" class="button" title="Compare">Compare</button>';
}

window.onscroll = function () {
    displayTopBtn();
};

function topScrollFunction() {
    document.body.scrollTop = 0; // For Safari 
    document.documentElement.scrollTop = 0;
}

function displayTopBtn() {
    const topButton = document.querySelector('#topBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block"
    } else {
        topButton.style.display = "none"
    }
}

function searchPage() {
    const content = document.querySelector(".content");
    var searchBar = document.querySelector('#search-bar');
    var numItems = document.querySelector('#display-list');
    const keyword = searchBar.value;
    var productInfo, productName, newText = '', startPage = '', endPage = '</div>'; 

    if (keyword == ''){
        numItems.value = "12";
        pos = 0;
        displayData();
        return;
    }else{
        for (let i = 0; i < products.length; i++) {
            productInfo = products[i].split('#');
            productName = productInfo[NAME_INEDX].toLowerCase();
            if (productName.includes(keyword.toLowerCase())) {
                newText += '<div class="product-box">';
                newText += '<a href="' + productInfo[LINK_INEDX] + '" target="_blank">';
                newText += '<img src="' + productInfo[IMAGE_INEDX] + '" alt="' + productInfo[NAME_INEDX] + '">';
                newText += '</a>';
                newText += '<p class="product-name">' + productInfo[NAME_INEDX] + '</p>';
                newText += '<p class="price">Price: R' + productInfo[PRICE_INEDX] + '</p>';
                newText += '<a class="link" href="' + productInfo[LINK_INEDX] + '" target="_blank">';
                newText += '<div class="button">';
                newText += productInfo[AVAILABLE_INDEX];
                newText += '</div>';
                newText += '</a>';
                newText += '<div id="' + productInfo[NAME_INEDX] + '">';
                newText += '<button onclick="addCompare(\'' + productInfo[NAME_INEDX] + '\', \'' + productInfo[PRICE_INEDX] + '\', \'' + productInfo[AVAILABLE_INDEX] + '\', \'' + productInfo[IMAGE_INEDX] + '\', \'' + productInfo[LINK_INEDX].substr(0, productInfo[LINK_INEDX].length - 1) + '\')" class="button" title="Compare">Compare</button>';
                newText += '</div>'
                newText += '</div>';
                numItems.value = 'max';
            }
        }
        if (newText == '') {
            newText += '<p>No result for search: ' + keyword + "</p>";
        }
        startPage += '<nav class="pages">';
        startPage += 'Search: ' + keyword;
        startPage += '</nav>';
        endPage += startPage;
        startPage += '<div class="outer-grid">';
        newText = startPage + newText + endPage;
        content.innerHTML = newText;
    }


    searchBar.value = '';
}