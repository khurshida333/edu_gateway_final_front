function handle_Student_Registration(event) {
  event.preventDefault();
  console.log("Form submitted!");
  
  const form = document.getElementById('studentRegistrationForm');
  const formData = new FormData(form);

  
  const username = form.querySelector('#username').value;
  const first_name = form.querySelector('#first_name').value;
  const last_name = form.querySelector('#last_name').value;
  const email = form.querySelector('#email').value;
  const mobile_no = form.querySelector('#mobile_no').value;
  const password = form.querySelector('#password').value;
  const confirm_password = form.querySelector('#confirm_password').value;

  
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
  if (password !== confirm_password) {
    displayError("Passwords do not match.");
    alert("Passwords do not match.");
    return;
  }

  if (!passwordRegex.test(password)) {
    displayError("Password must contain at least eight characters, one letter, one number, and one special character.");
    return;
  }

  
  formData.append('username', username);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('mobile_no', mobile_no);
  formData.append('password', password);
  formData.append('confirm_password', confirm_password);


  fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/student/register/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then(err => { throw err; });
      }
      return res.json();
    })
    .then((data) => {
      if (data.message) {
        alert(data.message);
        window.location.href = 'student_login.html';
      } else if (data.errors) {
        displayError(Object.values(data.errors).flat().join(' '));
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      handleFormErrors(error);
    });
}
function loadDepartments() {
  const departmentSelect = document.querySelector('#department');
  fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/department_list/`)
    .then(response => response.json())
    .then(data => {
      data.forEach(department => {
        const option = document.createElement('option');
        option.value = department.id;
        option.text = department.name;
        departmentSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching departments:', error));
}


document.addEventListener('DOMContentLoaded', loadDepartments);

function handle_Teacher_Registration(event) {
  event.preventDefault(); 

  
  const username = document.querySelector('#username').value;
  const first_name = document.querySelector('#first_name').value;
  const last_name = document.querySelector('#last_name').value;
  const email = document.querySelector('#email').value;
  const bio = document.querySelector('#bio').value;
  const department = document.querySelector('#department').value;  
  const password = document.querySelector('#password').value;
  const confirm_password = document.querySelector('#confirm_password').value;

  
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
  if (password !== confirm_password) {
    displayError("Passwords do not match.");
    return;
  }

  if (!passwordRegex.test(password)) {
    displayError("Password must contain at least eight characters, one letter, one number, and one special character.");
    return;
  }

  
  const formData = {
    username: username,
    first_name: first_name,
    last_name: last_name,
    email: email,
    bio: bio,
    department: department,
    password: password,
    confirm_password: confirm_password
  };

  fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  
    },
    body: JSON.stringify(formData),  
  })
  .then((res) => {
    if (!res.ok) {
      return res.json().then(err => { throw err; });
    }
    return res.json();
  })
  .then((data) => {
    if (data.message) {  
      alert(data.message);
      window.location.href = 'teacher_login.html';
    } else if (data.errors) {
      displayError(Object.values(data.errors).flat().join(' '));
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    handleFormErrors(error);
  });
}


function handleFormErrors(error) {
  if (error.mobile_no) {
    displayError(`Mobile Number Error: ${error.mobile_no.join(', ')}`);
  } else if (error.password) {
    displayError(`Password Error: ${error.password.join(', ')}`);
  } else {
    displayError("Registration failed. Please try again.");
  }
}

function displayError(message) {
  const errorElement = document.getElementById('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}


const handle_Student_Login = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  console.log(username, password);
  if ((username, password)) {
    fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/student/login/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.student_token && data.student_id) {
          localStorage.setItem("student_token", data.student_token);
          localStorage.setItem("student_id", data.student_id);
          localStorage.setItem("user_role", "student");
          window.location.href = "student_dash.html";
        }
      });
  }
};

const handle_Teacher_Login = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  console.log(username, password);

  // Ensure both username and password are provided
  if (username && password) {
      fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/login/`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);  

          
          if (data.teacher_token && data.teacher_id) {
            console.log("Teacher Token:", data.teacher_token);
            console.log("Teacher ID:", data.teacher_id);  
            localStorage.setItem("teacher_token", data.teacher_token);
            localStorage.setItem("teacher_id", data.teacher_id);
            localStorage.setItem("user_role", "teacher");
            window.location.href = "teacher_dash.html";
        } else {
            console.error("Missing teacher_token or teacher_id", data);
        }
      })
      .catch((error) => {
          console.error("Error during login:", error);
      });
  } else {
      console.error("Username and password must be provided.");
  }
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};
