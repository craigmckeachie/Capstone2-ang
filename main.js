selectDropDown();
function selectDropDown() {
  const allRadios = document.querySelectorAll("input[type='radio']");
  allRadios.forEach((radio) => {
    radio.addEventListener("click", () => {
      clickRadio(radio);
    });
  });
}

function clickRadio(radio) {
  if (radio.id === "location-radio") {
    populateDropDown(
      radio,
      "location-DropDown",
      "parkType-DropDown",
      locationsArray
    );
  } else if (radio.id === "parkType-radio") {
    populateDropDown(
      radio,
      "parkType-DropDown",
      "location-DropDown",
      parkTypesArray
    );
  }
}

function populateDropDown(radioInput, showDropDown, hideDropDown, array) {
  const dropDown = document.getElementById(showDropDown);
  dropDown.length = 1;
  displayDropDown(radioInput, dropDown, hideDropDown);
  array.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element;
    dropDown.appendChild(option);
  });
}

function displayDropDown(radioInput, showDropDown, hideDropDown) {
  const hideElement = document.getElementById(hideDropDown);
  if (radioInput.checked) {
    showDropDown.classList.remove("hide-display");
    hideElement.classList.add("hide-display");
  }
  retrievingValue(showDropDown)
}

function retrievingValue(dropDownElement){ 
    dropDownElement.addEventListener("change", () => {
        const selectedState = dropDownElement.value
        parsingArray(selectedState)

    })   
}

function parsingArray(selectedValue){
    const displayLocationObj = document.getElementById("displayLocationObj")
    eraseTableData()
    createTableHeaders(nationalParksArray[1])
    let tableHeadersArray = createTableHeaders(nationalParksArray[1])

    nationalParksArray.forEach(park => {
        if (selectedValue === park.State){  
            const newDiv = document.createElement("div")
            newDiv.textContent = JSON.stringify(park)
            createTableData(tableHeadersArray, park)
        }
    })
}
// i am using the array to make sure that parks with no visit website have an empty cell
function createTableHeaders(obj){
    const keys = Object.keys(obj)
    const tableHeader = document.querySelector("thead")
    tableHeader.textContent = ""
    const tableHeadersArray = []

    keys.forEach(key => {
        const header = document.createElement("th")
        header.textContent = key
        tableHeader.appendChild(header)
        tableHeadersArray.push(key)
    })
    return tableHeadersArray
    
}

function createTableData(tableHeadersArray, obj){
    
    const tableBody = document.querySelector("tbody")
    const row = document.createElement("tr")

    tableHeadersArray.forEach(header => {
        if (Object.hasOwn(obj, header)) {
            const tableDataCell = document.createElement("td")
            tableDataCell.textContent = JSON.stringify(obj[header])
            row.appendChild(tableDataCell)
            tableBody.appendChild(row)
        } else {
            const tableDataCell = document.createElement("td")
            tableDataCell.textContent = ""   
            row.appendChild(tableDataCell)
            tableBody.appendChild(row)
        }
    })
}


function eraseTableData(){
    const tableBody = document.querySelector("tbody")
    tableBody.textContent = ""
}