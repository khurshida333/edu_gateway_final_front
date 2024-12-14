const get_student_params = () => {
    const param = new URLSearchParams(window.location.search).get("courseId");
    const token = localStorage.getItem("student_token"); 
  
    if (!param) {
      console.error("No courseId found in the URL.");
      alert("Invalid course ID.");
      return; 
    }
  
    if (!token) {
      console.error("Authentication token is missing. Please log in.");
      alert("Please log in to view course details.");

      window.location.href = "student_login.html"; 
      return;
    }
    console.log("Course ID:", param);
    console.log("student_token:", token);

    fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/course_detail/${param}/`, {
      headers: {
          'Authorization': `Token ${token}`, 
          'Content-Type': 'application/json',
      }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
        displayDetails(data);
    })
    .catch((error) => {
        console.error('Error fetching course details:', error);
        alert("An error occurred while fetching course details. Please try again later.");
    });
  };

const displayDetails = (course) => {
    const parent = document.getElementById("course-details-card")
    parent.innerHTML = '';

    const div = document.createElement("div");
    div.classList.add("coures-details-body");
    div.innerHTML = `
    <h5 class="card-title">Title : ${course.title}</h5>
    <h5 class="card-title">Duration : ${course.duration}</h5>
    <h5 class="card-title">Format : ${course.format}</h5>
    <h5 class="card-title">Department : ${course.department.join(", ")}</h5>
    <h5 class="card-title">Teacher : ${course.teachers.map(teacher => teacher.name).join(", ")}</h5>
    <p class="card-text">Description : ${course.description}</p>
    <p class="card-title">Key Features : ${course.key_features}</p>
    <button>Details</button>
`;
  parent.appendChild(div);
};


if (window.location.pathname.endsWith("student_courseDetails.html")) {
        get_student_params();
    }

