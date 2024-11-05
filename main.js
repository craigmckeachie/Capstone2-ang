//#region  national park functions

function initializeParksPage() {
  const allRadios = document.querySelectorAll("input[type='radio']");
  allRadios.forEach((radio) => {
    radio.addEventListener("click", () => {
      hideAllDropdowns();
      let filterType = radio.value;
      let selectedDropdown = getSelectedDropdown(filterType);
      populateDropDown(selectedDropdown, getSelectedArray(filterType));
      displayDropdown(selectedDropdown);
      handleChange(selectedDropdown, filterType);
    });
  });
}

initializeParksPage();

function getSelectedDropdown(filterType) {
  switch (filterType) {
    case "location":
      return document.getElementById("location-dropdown");
    case "parkType":
      return document.getElementById("parkType-dropdown");
    default:
      throw new Error("invalid filter type");
  }
}

function getSelectedArray(filterType) {
  switch (filterType) {
    case "location":
      return locationsArray;
    case "parkType":
      return parkTypesArray;
    default:
      throw new Error("invalid filter type");
  }
}

function populateDropDown(dropDown, array) {
  array.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element;
    dropDown.appendChild(option);
  });
}

function hideAllDropdowns() {
  const allSelect = document.querySelectorAll("select");
  allSelect.forEach((select) => {
    select.classList.add("hide-display");
  });
}

function displayDropdown(dropdown) {
  dropdown.classList.remove("hide-display");
}

function handleChange(dropDownElement, filterType) {
  dropDownElement.addEventListener("change", () => {
    const selectedOption = dropDownElement.value;
    loadTable(selectedOption, filterType);
  });
}

function loadTable(selectedOption, filterType) {
  eraseTableData();

  let tableHeadersArray = createTableHeaders();
  if (filterType === "location") {
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
function createTableHeaders() {
  propertyNameToHeaderName = {
    LocationName: "Name",
    Address: "Address",
    City: "City",
    State: "State",
    ZipCode: "ZipCode",
    Phone: "Phone",
    Visit: "Visit",
  };
  const values = Object.values(propertyNameToHeaderName);
  const tableHeader = document.querySelector("thead");
  tableHeader.textContent = "";
  const tableHeadersArray = [];

  values.forEach((value) => {
    const header = document.createElement("th");
    header.textContent = value;
    tableHeader.appendChild(header);
    tableHeadersArray.push(value);
  });
  return propertyNameToHeaderName;
}

function createTableData(tableHeadersArray, object) {
  const tableBody = document.querySelector("tbody");
  const row = document.createElement("tr");
  const headers = Object.keys(tableHeadersArray);

  headers.forEach((propertyName) => {
    const tableDataCell = document.createElement("td");
    let propertyValue = Object.hasOwn(object, propertyName) ? object[propertyName] : "";
    tableDataCell.textContent = typeof propertyValue === "object" ? JSON.stringify(propertyValue) : propertyValue;
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
  if (!mountainDropDown) return;
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
