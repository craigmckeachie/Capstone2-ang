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
    displayLocationObj.textContent = ""
    nationalParksArray.forEach(park => {
        if (selectedValue === park.State){   
            const newDiv = document.createElement("div")
            newDiv.textContent = JSON.stringify(park)
            // displayLocationObj.appendChild(newDiv)
        }
    })
    displayTableData(nationalParksArray[0])
}

function displayTableData(obj){
    const keys = Object.keys(obj)
    const tableHeader = document.querySelector("thead")

    keys.forEach(key => {
        const header = document.createElement("th")
        header.textContent = key
        header.classList.add("table-header")
        tableHeader.appendChild(header)
    })
    
}
