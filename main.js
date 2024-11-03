//#region  national park functions

nationalPark_selectDropDown();
function nationalPark_selectDropDown() {
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
  capturingInput(showDropDown);
}

function capturingInput(dropDownElement) {
  dropDownElement.addEventListener("change", () => {
    const selectedOption = dropDownElement.value;
    parsingArray(dropDownElement, selectedOption);
  });
}

function parsingArray(dropDownElement, selectedOption) {
  eraseTableData();
  tempTableHeadersObj = {
    LocationName: "Name",
    Address: "Address",
    City: "City",
    State: "State",
    ZipCode: "ZipCode",
    Phone: "Phone",
    Visit: "Visit",
  };
  let tableHeadersArray = createTableHeaders(tempTableHeadersObj);
  if (dropDownElement.id === "location-DropDown") {
    nationalParksArray.forEach((park) => {
      if (selectedOption === park.State) {
        const newDiv = document.createElement("div");
        newDiv.textContent = JSON.stringify(park);
        createTableData(tableHeadersArray, park);
      }
    });
  } else {
    nationalParksArray.forEach((park) => {
      console.log(typeof park.LocationName);
      if (park.LocationName.includes(selectedOption)) {
        const newDiv = document.createElement("div");
        newDiv.textContent = JSON.stringify(park);
        createTableData(tableHeadersArray, park);
      }
    });
  }
}

// i am using the array to make sure that parks with no visit website have an empty cell
function createTableHeaders(obj) {
  const values = Object.values(obj);
  const tableHeader = document.querySelector("thead");
  tableHeader.textContent = "";
  const tableHeadersArray = [];

  values.forEach((value) => {
    const header = document.createElement("th");
    header.textContent = value;
    tableHeader.appendChild(header);
    tableHeadersArray.push(value);
  });
  return obj;
}

function createTableData(tableHeadersArray, obj) {
  const tableBody = document.querySelector("tbody");
  const row = document.createElement("tr");
  tempArray = Object.keys(tableHeadersArray)

  tempArray.forEach((header) => {
    const tableDataCell = document.createElement("td");
    let tempVariable = Object.hasOwn(obj, header) ? obj[header] : "";
    tableDataCell.textContent =
      typeof tempVariable === "object"
        ? JSON.stringify(tempVariable)
        : tempVariable;
    row.appendChild(tableDataCell);
    tableBody.appendChild(row);
  });
}

function eraseTableData() {
  const tableBody = document.querySelector("tbody");
  tableBody.textContent = "";
}

//#endregion

//#region

mountains_PopulateDropDown();
function mountains_PopulateDropDown() {
  const mountainDropDown = document.getElementById("mountainDropDown");
  mountainsArray.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element.name;
    mountainDropDown.appendChild(option);
  });
  mountainsDisplayDropDown(mountainDropDown)
}

function mountainsDisplayDropDown(dropDownElement) {
    const mountainDisplay = document.getElementById("mountainDisplayDropDown");
    dropDownElement.addEventListener("change", () => {
        const mountainName = document.createElement("div")
        mountainName.textContent = dropDownElement.value
        mountainDisplay.appendChild(mountainName)
        searchMountainImage(mountainName)
    })
  }

function searchMountainImage(mountainName){
    let mountainImage;
    mountainsArray.find((mountain) => { mountain.name === mountainName.textContent ? mountainImage =  mountain.img : "no match"
    })
    console.log("Mountain Image", mountainImage)
}
function addMountainImage(){
    const mountainImage = document.createElement("div")
    mountainImage.textContent 

}
