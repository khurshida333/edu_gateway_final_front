
const loadCourses = async (search) => {
    console.log("Search term:", search); 
    document.getElementById("courses").innerHTML = "";

    // Use dynamic API_BASE_URL
    fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/course_list/?search=${search ? search : ""}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayCourses(data);
        })
        .catch((error) => {
            console.error('Error loading courses:', error);
        });
};

const getDepartmentName = async (deptId) => {
    const response = await fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/department_list/${deptId}/`);
    const department = await response.json();
    return department.name;
};

const loadDepartment = () => {
    fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/department_list/`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("drop-dept");
                const li = document.createElement("li");
                li.classList.add("dropdown-item");
                li.innerText = item?.name;
                li.onclick = () => loadCourses(item?.name); 
                parent.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error loading departments:', error);
        });
};

const displayCourses = async (courses) => {
    console.log(courses);
    const parent = document.getElementById("courses");
    parent.innerHTML = "";

    for (const course of courses) {
        console.log(course);
        const div = document.createElement("div");
        div.classList.add("course-card");

        const departmentName = await getDepartmentName(course.department);

        div.innerHTML = `
            <img class="course-img" src="./images/download.jpg" alt="course Image" />
            <h4>Title : ${course?.title}</h4>
            <h5>Format : ${course?.format}</h5>
            <h6>Duration : ${course?.duration}</h6>
            <p>Dept : ${departmentName}</p>
            <button class="btn detail-btn text-white" onclick="handleDetailsClick()">Details</button>
        `;
        
        parent.appendChild(div);
    }
};

const handleDetailsClick = () => {
    alert("You must be a logged-in user to access course details.");
    window.location.href = "log_pop_up.html";
};

document.addEventListener("DOMContentLoaded", function() {
    loadDepartment();
    loadCourses();
});
