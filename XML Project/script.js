const empName = document.getElementById("empName").value;
const empEmail = document.getElementById("empEmail").value;
const empStreet = document.getElementById("empStreet").value;
const empBuilding = document.getElementById("empBuilding").value;
const empNumber = document.getElementById("empNumber").value;
const empRegion = document.getElementById("empRegion").value;
const empCity = document.getElementById("empCity").value;
const empCountry = document.getElementById("empCountry").value;
const empPhone = document.getElementById("empPhone").value;
// --------------------------------------------------------------------------------------
// Add Function:
async function addEmployee() {
  const xmlDoc = await loadEmployeeData();
  if (!xmlDoc) {
    displayOutput("Error: XML file not loaded.");
    return;
  }
  const contactsNode = xmlDoc.getElementsByTagName("contacts")[0];
  const employeeNode = xmlDoc.createElement("employee");

  const nameNode = xmlDoc.createElement("name");
  nameNode.textContent = empName;
  employeeNode.appendChild(nameNode);

  const phonesNode = xmlDoc.createElement("phones");

  const homePhoneNode = xmlDoc.createElement("phone");
  homePhoneNode.setAttribute("type", "home");
  homePhoneNode.textContent = empPhone;
  phonesNode.appendChild(homePhoneNode);

  const workPhoneNode = xmlDoc.createElement("phone");
  workPhoneNode.setAttribute("type", "work");
  workPhoneNode.textContent = empPhone;
  phonesNode.appendChild(workPhoneNode);

  employeeNode.appendChild(phonesNode);
  const addressesNode = xmlDoc.createElement("addresses");
  const addressNode = xmlDoc.createElement("address");

  ["street", "building", "number", "region", "city", "country"].forEach(
    (attribute) => {
      const attributeNode = xmlDoc.createElement(attribute);
      attributeNode.textContent = eval(
        `emp${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`
      );
      addressNode.appendChild(attributeNode);
    }
  );

  addressesNode.appendChild(addressNode);
  employeeNode.appendChild(addressesNode);
  const emailNode = xmlDoc.createElement("email");
  emailNode.textContent = empEmail;
  employeeNode.appendChild(emailNode);
  contactsNode.appendChild(employeeNode);
  saveXML(xmlDoc);
  displayOutput(
    `Employee added: Name - ${empName}, Email - ${empEmail}, Address - ${empStreet}, ${empBuilding}, ${empNumber}, ${empRegion}, ${empCity}, ${empCountry}, Phone - ${empPhone}`
  );
}
// -----------------------------------------------------------------------------------------------------------
// Update Function:
// Update Function:
async function updateEmployee() {
  const empName = document.getElementById("empName").value;

  const xmlDoc = await loadEmployeeData();

  if (!xmlDoc) {
    displayOutput("Error: XML file not loaded.");
    return;
  }

  const employeeNodes = xmlDoc.getElementsByTagName("employee");
  let employeeFound = false;

  for (let i = 0; i < employeeNodes.length; i++) {
    const name = employeeNodes[i].getElementsByTagName("name")[0].textContent;

    if (name === empName) {
      const empEmail = document.getElementById("empEmail").value;
      const empStreet = document.getElementById("empStreet").value;
      const empBuilding = document.getElementById("empBuilding").value;
      const empNumber = document.getElementById("empNumber").value;
      const empRegion = document.getElementById("empRegion").value;
      const empCity = document.getElementById("empCity").value;
      const empCountry = document.getElementById("empCountry").value;
      const empPhone = document.getElementById("empPhone").value;

      employeeNodes[i].getElementsByTagName("email")[0].textContent = empEmail;
      employeeNodes[i].getElementsByTagName("street")[0].textContent =
        empStreet;
      employeeNodes[i].getElementsByTagName("building")[0].textContent =
        empBuilding;
      employeeNodes[i].getElementsByTagName("number")[0].textContent =
        empNumber;
      employeeNodes[i].getElementsByTagName("region")[0].textContent =
        empRegion;
      employeeNodes[i].getElementsByTagName("city")[0].textContent = empCity;
      employeeNodes[i].getElementsByTagName("country")[0].textContent =
        empCountry;
      employeeNodes[i].getElementsByTagName("phone")[0].textContent = empPhone;

      saveXML(xmlDoc);
      displayOutput(
        `Employee updated: Name - ${empName}, Email - ${empEmail}, Address - ${empStreet}, ${empBuilding}, ${empNumber}, ${empRegion}, ${empCity}, ${empCountry}, Phone - ${empPhone}`
      );
      employeeFound = true;
      break;
    }
  }

  if (!employeeFound) {
    displayOutput(`Error: Employee with Name ${empName} not found.`);
  }
}

//------------------------------------------------------------------------------------------------------------
//Delete Function:
async function deleteEmployee() {
  const empName = document.getElementById("empName").value;

  const xmlDoc = await loadEmployeeData();

  if (xmlDoc) {
    const contactsNode = xmlDoc.getElementsByTagName("contacts")[0];
    const employeeNodes = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employeeNodes.length; i++) {
      const name = employeeNodes[i].getElementsByTagName("name")[0].textContent;
      if (name === empName) {
        contactsNode.removeChild(employeeNodes[i]);
        saveXML(xmlDoc);
        displayOutput(`Employee deleted: Name - ${empName}`);
        return;
      }
    }
    displayOutput(`Error: Employee with Name ${empName} not found.`);
  } else {
    displayOutput("Error: XML file not loaded.");
  }
}
// -----------------------------------------------------------------------------------------------------
//Search Function
async function searchEmployee() {
  const empName = document.getElementById("empName").value;
  const xmlDoc = await loadEmployeeData();
  if (xmlDoc) {
    const employeeNodes = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employeeNodes.length; i++) {
      const name = employeeNodes[i].getElementsByTagName("name")[0].textContent;
      if (name === empName) {
        const email =
          employeeNodes[i].getElementsByTagName("email")[0].textContent;
        const street =
          employeeNodes[i].getElementsByTagName("street")[0].textContent;
        const building =
          employeeNodes[i].getElementsByTagName("building")[0].textContent;
        const number =
          employeeNodes[i].getElementsByTagName("number")[0].textContent;
        const region =
          employeeNodes[i].getElementsByTagName("region")[0].textContent;
        const city =
          employeeNodes[i].getElementsByTagName("city")[0].textContent;
        const country =
          employeeNodes[i].getElementsByTagName("country")[0].textContent;
        const phone =
          employeeNodes[i].getElementsByTagName("phone")[0].textContent;
        displayOutput(
          `Employee found: Name - ${empName}, Email - ${email}, Address - ${street}, ${building}, ${number}, ${region}, ${city}, ${country}, Phone - ${phone}`
        );
        return;
      }
    }
    displayOutput(`Error: Employee with Name ${empName} not found.`);
  } else {
    displayOutput("Error: XML file not loaded.");
  }
}
// ---------------------------------------------------------------------------------------------------------
//Save Function:
// Save Function:
async function saveXML(xmlDoc) {
  try {
    const xmlString = new XMLSerializer().serializeToString(xmlDoc);
    const response = await fetch("employee.xml", {
      method: "PUT",
      headers: {
        "Content-Type": "text/xml",
      },
      body: xmlString,
    });

    if (response.ok) {
      displayOutput("XML file saved successfully.");
    } else {
      displayOutput("Error saving XML file.");
    }
  } catch (error) {
    console.error("Error saving XML:", error);
    displayOutput("Error saving XML file.");
  }
}

// ---------------------------------------------------------------------------------------------------------
// Display Function:
function displayOutput(message) {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = message;
}
// ---------------------------------------------------------------------------------------------------------
//Load XML Function:
async function loadEmployeeData() {
  try {
    const response = await fetch("employee.xml");
    const data = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(data, "text/xml");
  } catch (error) {
    console.error("Error loading XML:", error);
    return null;
  }
}
// -----------------------------------------------------------------------------------------------------------
