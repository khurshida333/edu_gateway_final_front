const loadCourses = (search) => {
    console.log("Search term:", search); 
    const teacherId = localStorage.getItem("teacher_id");  
    console.log("Teacher ID:", teacherId);
    document.getElementById("courses").innerHTML = ""
    console.log(search)
    fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/course_list/?search=${search ? search : ""}`)   
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
                displayCourses(data);
        });
};
const displayCourses = (courses) => {
    console.log(courses)
    courses?.forEach((course) => {    
        console.log(course);
        const parent = document.getElementById("courses");
        const div = document.createElement("div");
        div.classList.add("course-card");  
        div.innerHTML = `
            <img class="course-img" src="./images/download.jpg" alt="course Image" />
            <h4>Title : ${course?.title}</h4>
            <h5>Format : ${course?.format}</h5>
            <h6>Duration : ${course?.duration}</h6>
            <p>Dept : ${course?.department}</p>
            <button class="btn detail-btn"><a target="_blank" href="teacher_courseDetails.html?courseId=${course.id}" style="color: white; text-decoration: none;">Details</a> </button>
        `;
        parent.appendChild(div);
    });
};

const loadDepartment = () => {
    fetch(`${API_BASE_URL}/teacher/department_list/`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("drop-dept")
                const li = document.createElement("li");
                li.classList.add("dropdown-item")
                li.innerText = item?.name;
                li.onclick = () => loadCourses(item?.name); 
                parent.appendChild(li);
            })
        });
};


document.addEventListener("DOMContentLoaded", function() {
    loadDepartment();
    loadCourses();  
});

