// DOM Elements
const splitSlider = document.querySelector('.split-slider');
const studentForm = document.getElementById('student-form');
const studentTable = document.querySelector('#student-table tbody');

// Load student data from local storage
const students = JSON.parse(localStorage.getItem('students')) || [];

// Function to update the student table
function updateStudentTable() {
    studentTable.innerHTML = '';

    for (const student of students) {
        const newRow = studentTable.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        cell1.textContent = student.name;
        cell2.textContent = student.admissionNumber;

        // Add a delete button to the new row
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteStudent(student);
        });
        cell3.appendChild(deleteButton);
    }
}

// Function to save student data to local storage
function saveStudentData() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to add a new student
function addStudent(name, admissionNumber) {
    students.push({ name, admissionNumber });
    updateStudentTable();
    saveStudentData();
}

// Function to delete a student
function deleteStudent(student) {
    const studentIndex = students.indexOf(student);
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        updateStudentTable();
        saveStudentData();
    }
}

// Load and update the student table when the page loads
updateStudentTable();

// Handle form submission
studentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get student information
    const name = document.getElementById('name').value;
    const admissionNumber = document.getElementById('admission-number').value;

    // Add the student to the table and local storage
    addStudent(name, admissionNumber);

    // Clear the form
    studentForm.reset();
});
