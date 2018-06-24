// Add Check-Box Functionality for semantic UI
$('.ui.checkbox').checkbox();

var hostingButton = document.querySelector("#hosting-button");
var noHostingButton = document.querySelector('#no-hosting');
var form = document.querySelector("#hosting-form");
var domainAvailableText = document.querySelector("#domain-status")
var hostingBoxOne = document.querySelector("#first");
var hostingBoxTwo = document.querySelector("#second");
var hostingBoxThree = document.querySelector("#third");


function updateDisplay(dName, dStatus) {
    var status = document.querySelector("#domain-status");
    var price = document.querySelector("#domain-price");
    var name = document.querySelector("#domain-name");

    status.innerHTML = dStatus;
    name.innerHTML = dName;
    price.innerHTML = "9.95";

    updateHiddenInputs();
};

function processData(data) {
    var domain = data.domain.name;
    var status = data.domain.status;
    updateDisplay(domain, status);
}

function handler() {
    if (this.status == 200 &&
        this.response != null) {
        // success!
        processData(this.response);
    } else {
        // something went wrong
        console.log('There was an error...')
        console.log('Please check the JSON response')
        console.log(this)
    }
}

function updateDomains() {
    var client = new XMLHttpRequest();
    client.responseType = "json";
    client.onload = handler;
    var domainNameInput = document.querySelector("#domain-name-input").value;
    client.open("GET", "/domain/update/" + domainNameInput);
    client.send();
}

function colorDomainStatusText() {
    if (domainAvailableText.innerHTML === "Available") {
        domainAvailableText.classList.add("success-text");
    } else {
        domainAvailableText.classList.add("red-text");
    }
}

function updateHiddenInputs() {
    var price = document.querySelector("#domain-price");
    var name = document.querySelector("#domain-name");
    var newName = document.querySelector('#hidden-name')
    var newPrice = document.querySelector('#hidden-price')
    newName.value = name.innerHTML;
    newPrice.value = price.innerHTML;
};

function on_init() {
    colorDomainStatusText();
}
on_init();