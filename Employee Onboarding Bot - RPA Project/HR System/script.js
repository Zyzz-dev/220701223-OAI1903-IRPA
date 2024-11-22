// DOM Elements
const employeeForm = document.getElementById('employeeForm');
const employeeList = document.getElementById('employeeList');

// Load employees from localStorage
document.addEventListener('DOMContentLoaded', loadEmployees);

// Form submission
employeeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const startDate = document.getElementById('startDate').value;

    const employee = { name, email, position, startDate };
    addEmployeeToList(employee);
    saveEmployeeToStorage(employee);

    employeeForm.reset();
});

// Add employee to the list
function addEmployeeToList(employee) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>
            <strong>${employee.name}</strong> (${employee.position})<br>
            📧 ${employee.email} | 📅 Start: ${employee.startDate}
        </span>
        <button class="remove-btn">Remove</button>
    `;

    // Remove button functionality
    li.querySelector('.remove-btn').addEventListener('click', function () {
        li.remove();
        removeEmployeeFromStorage(employee.email);
    });

    employeeList.appendChild(li);
}

// Save employee to localStorage
function saveEmployeeToStorage(employee) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Load employees from localStorage
function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.forEach(addEmployeeToList);
}

// Remove employee from localStorage
function removeEmployeeFromStorage(email) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const updatedEmployees = employees.filter(emp => emp.email !== email);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
}
