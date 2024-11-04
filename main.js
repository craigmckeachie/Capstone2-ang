//#region  national park functions

nationalPark_selectDropDown();
function nationalPark_selectDropDown() {
  const allRadios = document.querySelectorAll("input[type='radio']");
  allRadios.forEach((radio) => {
    radio.addEventListener("click", () => {
      resetDropdown()
      displayDropDown(populateDropDown(radio, selectedDropdown(radio), selectedArray(radio)))

    });
  })
}

function selectedDropdown(radio) {
  const selectedDropdown = (radio.id === "location-radio") ? "location-DropDown" : "parkType-DropDown"
  return selectedDropdown 
}

function selectedArray(radio) {
  const selectedArray = (radio.id === "location-radio") ? locationsArray : parkTypesArray
  return selectedArray
}

function populateDropDown(radioInput, dropDownID, array) {
  const dropDown = document.getElementById(dropDownID);
  //dropDown.length = 1;
  array.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element;
    dropDown.appendChild(option);
  });
  return { radioInput, dropDown }
}
function resetDropdown(){
  const allSelect = document.querySelectorAll("select");
  allSelect.forEach((select) => {
      select.classList.add("hide-display")
  })
}

function displayDropDown(obj) {
  radioInput =  obj.radioInput
  dropDown =  obj.dropDown
  const activeDropdown = (radioInput.checked ? dropDown.classList.remove("hide-display"): dropDown.classList.add("hide-display"))
  capturingInput(dropDown);
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
  tempArray = Object.keys(tableHeadersArray);

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

//#region  mountain page

mountains_PopulateDropDown();
function mountains_PopulateDropDown() {
  const mountainDropDown = document.getElementById("mountainDropDown");
  mountainsArray.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element.name;
    mountainDropDown.appendChild(option);
  });
  mountainsDisplayDropDown(mountainDropDown);
}

function mountainsDisplayDropDown(dropDownElement) {
  const mountainDisplay = document.getElementById("mountainDisplayDropDown");
  dropDownElement.addEventListener("change", () => {
    if (dropDownElement.value != "Select One") {
      mountainDisplay.textContent = "";
      const mountainName = document.createElement("div");
      mountainName.textContent = "Mountain Name: " + dropDownElement.value;
      mountainDisplay.appendChild(mountainName);
      searchMountainImage(mountainDisplay, dropDownElement.value);
    } else {
      mountainDisplay.textContent = "";
    }
  });
}

function searchMountainImage(mountainDisplay, mountainName) {
  let image;
  mountainsArray.forEach((mountain) => {
    if (mountain.name === mountainName) {
      image = mountain.img;
      addMountainImage(mountainDisplay, image);
      addMountainattr(mountainDisplay, mountain);
      addDescription(mountainDisplay, mountain);
    }
  });
}
function addMountainImage(mountainDisplay, image) {
  const mountainImageDiv = document.createElement("div");
  let imageElement = document.createElement("img");
  imageElement.src = `./enjoy-the-outdoors/images/${image}`;
  mountainImageDiv.appendChild(imageElement);
  mountainDisplay.appendChild(mountainImageDiv);
}

function addMountainattr(mountainDisplay, mountain) {
  const attrDiv = document.createElement("div");
  const elevationInfo = document.createElement("div");
  const effortInfo = document.createElement("div");
  elevationInfo.textContent = "Elevation: " + mountain.elevation;
  effortInfo.textContent = "Effort: " + mountain.effort;
  elevationInfo.classList = "card-details";
  effortInfo.classList = "card-details";
  attrDiv.appendChild(elevationInfo);
  attrDiv.appendChild(effortInfo);
  mountainDisplay.appendChild(attrDiv);
}

function addDescription(mountainDisplay, mountain) {
  const description = document.createElement("div");
  description.textContent = mountain.desc;
  mountainDisplay.appendChild(description);
}

//#endregion
