// Function to add an employee
async function addEmployee() {
  const empName = document.getElementById("empName").value;
  const empEmail = document.getElementById("empEmail").value;
  const empAddress = document.getElementById("empAddress").value;
  const empPhone = document.getElementById("empPhone").value;

  const xmlDoc = await loadEmployeeData();

  if (xmlDoc) {
    const employeesNode = xmlDoc.getElementsByTagName("employees")[0];

    const employeeNode = xmlDoc.createElement("employee");

    const nameNode = xmlDoc.createElement("name");
    nameNode.textContent = empName;
    employeeNode.appendChild(nameNode);

    const emailNode = xmlDoc.createElement("email");
    emailNode.textContent = empEmail;
    employeeNode.appendChild(emailNode);

    const addressNode = xmlDoc.createElement("address");
    addressNode.textContent = empAddress;
    employeeNode.appendChild(addressNode);

    const phoneNode = xmlDoc.createElement("phone");
    phoneNode.textContent = empPhone;
    employeeNode.appendChild(phoneNode);

    employeesNode.appendChild(employeeNode);

    // Update the XML file
    saveXML(xmlDoc);
    displayOutput(
      `Employee added: Name - ${empName}, Email - ${empEmail}, Address - ${empAddress}, Phone - ${empPhone}`
    );
  } else {
    displayOutput("Error: XML file not loaded.");
  }
}

// Function to update an employee
async function updateEmployee() {
  const empName = document.getElementById("empName").value;
  const empEmail = document.getElementById("empEmail").value;
  const empAddress = document.getElementById("empAddress").value;
  const empPhone = document.getElementById("empPhone").value;

  const xmlDoc = await loadEmployeeData();

  if (xmlDoc) {
    const employeesNode = xmlDoc.getElementsByTagName("employees")[0];
    const employeeNodes = xmlDoc.getElementsByTagName("employee");
    // Assuming each employee has a unique name for simplicity
    for (let i = 0; i < employeeNodes.length; i++) {
      const name = employeeNodes[i].getElementsByTagName("name")[0].textContent;
      if (name === empName) {
        employeeNodes[i].getElementsByTagName("email")[0].textContent =
          empEmail;
        employeeNodes[i].getElementsByTagName("address")[0].textContent =
          empAddress;
        employeeNodes[i].getElementsByTagName("phone")[0].textContent =
          empPhone;
        // Update the XML file
        saveXML(xmlDoc);
        displayOutput(
          `Employee updated: Name - ${empName}, Email - ${empEmail}, Address - ${empAddress}, Phone - ${empPhone}`
        );
        return;
      }
    }
    displayOutput(`Error: Employee with Name ${empName} not found.`);
  } else {
    displayOutput("Error: XML file not loaded.");
  }
}

// Function to delete an employee
async function deleteEmployee() {
  const empName = document.getElementById("empName").value;

  const xmlDoc = await loadEmployeeData();

  if (xmlDoc) {
    const employeesNode = xmlDoc.getElementsByTagName("employees")[0];
    const employeeNodes = xmlDoc.getElementsByTagName("employee");
    // Assuming each employee has a unique name for simplicity
    for (let i = 0; i < employeeNodes.length; i++) {
      const name = employeeNodes[i].getElementsByTagName("name")[0].textContent;
      if (name === empName) {
        employeesNode.removeChild(employeeNodes[i]);
        // Update the XML file
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

// Function to search for an employee
async function searchEmployee() {
  const empName = document.getElementById("empName").value;

  const xmlDoc = await loadEmployeeData();

  if (xmlDoc) {
    const employeeNodes = xmlDoc.getElementsByTagName("employee");
    // Assuming each employee has a unique name for simplicity
    for (let i = 0; i < employeeNodes.length; i++) {
      const name = employeeNodes[i].getElementsByTagName("name")[0].textContent;
      if (name === empName) {
        const email =
          employeeNodes[i].getElementsByTagName("email")[0].textContent;
        const address =
          employeeNodes[i].getElementsByTagName("address")[0].textContent;
        const phone =
          employeeNodes[i].getElementsByTagName("phone")[0].textContent;
        displayOutput(
          `Employee found: Name - ${empName}, Email - ${email}, Address - ${address}, Phone - ${phone}`
        );
        return;
      }
    }
    displayOutput(`Error: Employee with Name ${empName} not found.`);
  } else {
    displayOutput("Error: XML file not loaded.");
  }
}

// Function to save changes to XML file
function saveXML(xmlDoc) {
  const xmlString = new XMLSerializer().serializeToString(xmlDoc);
  const blob = new Blob([xmlString], { type: "text/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "employee.xml";
  a.click();
  URL.revokeObjectURL(url);
}

// Function to display output
function displayOutput(message) {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = message;
}

// Function to load employee data from XML file
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
