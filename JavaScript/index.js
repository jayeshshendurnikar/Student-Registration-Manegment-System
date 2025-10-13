// Initialize student empty array from localStorage.
let students = JSON.parse(localStorage.getItem('students')) || [];
let editingIndex = -1;

// all variables.
let form;
let tableBody;
let submitBtn; 
let nameInput; 
let idInput;
let emailInput;
let mobileInput;

document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements on page loads
  form = document.querySelector('.student-form');
  tableBody = document.getElementById('tablBdy');
  submitBtn = document.getElementById('submBt');
  nameInput = document.getElementById('stuname');
  idInput = document.getElementById('stuId');
  emailInput = document.getElementById('stuEmail');
  mobileInput = document.getElementById('stuMobile');

  // functions call.
  initForm();
  
  renderTable();
});

// Initialization
function initForm() {
  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const studentData = {
      name: nameInput.value.trim(),
      id: idInput.value.trim(),
      email: emailInput.value.trim(),
      mobile: mobileInput.value.trim()
    };

    // Validate mobile number (10 digits)
    if (studentData.mobile.length !== 10) {
      alert('Mobile number must be 10 digits');
      return;
    }

    // Checking if student ID already exists.
    const idExists = students.some((student, index) => 
      student.id === studentData.id && index !== editingIndex
    );

    if (idExists) {
      alert('Student ID already exists! Please use a different ID.');
      return;
    }

    if (editingIndex >= 0) {
      // Update existing student
      students[editingIndex] = studentData;
      editingIndex = -1;
      submitBtn.textContent = 'Submit';
    } else {
      // Add new student
      students.push(studentData);
    }
    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(students));
    // Reset form.
    form.reset();
    renderTable();
  });
}

// Render table.
function renderTable() {
  tableBody.innerHTML = '';
  
  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.mobile}</td>
      <td>
        <button class="btn-edit" onclick="editStudent(${index})">
          <i class="fa fa-pen"></i>
        </button>
        <button class="btn-delete" onclick="deleteStudent(${index})">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit student function
function editStudent(index) {
  const student = students[index];
  
  nameInput.value = student.name;
  idInput.value = student.id;
  emailInput.value = student.email;
  mobileInput.value = student.mobile;
  
  editingIndex = index;
  submitBtn.textContent = 'Update';
  // Scroll to top.
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete student function
function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    // Reset form if in edit.
    if (editingIndex === index) {
      form.reset();
      editingIndex = -1;
      submitBtn.textContent = 'Submit';
    }
  }
}