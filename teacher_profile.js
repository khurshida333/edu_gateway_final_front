const loadCourses = () => {
    const teacherId = localStorage.getItem("teacher_id");  
    console.log("Teacher ID:", teacherId);
    document.getElementById("courses").innerHTML = "";  


    fetch(`${API_BASE_URL}/teacher/${teacherId}/courses/`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayCourses(data);  
        })
        .catch((error) => {
            console.error("Error fetching courses:", error);
        });
};
const getDepartmentName = async (deptId) => {
    console.log("dept_id:", deptId)

    const response = await fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/department_list/${deptId}/`);
    const department = await response.json();
    return department.name;
};
const displayCourses = async (courses) => {
    console.log(courses);
    
    
    for (const course of courses) {
        console.log(course);
        const parent = document.getElementById("courses");
        const div = document.createElement("div");
        div.classList.add("course-card");   

   
        const dept_name = await getDepartmentName(course.department);

       
        div.innerHTML = `
            <img class="course-img" src="./images/download.jpg" alt="course Image" />
            <h4>Title : ${course?.title}</h4>
            <h5>Format : ${course?.format}</h5>
            <h6>Duration : ${course?.duration}</h6>
            <p>Dept : ${dept_name}</p>
            <div class="d-flex gap-2 dde-btn-container">
                <button class="btn detail-btn btn-sz">
                    <a target="_blank" href="teacher_courseDetails.html?courseId=${course.id}" style="color: white; text-decoration: none;">
                        Details
                    </a> 
                </button>
                <button class="btn detail-btn btn-sz">
                    <a onclick="deleteCourse(${course.id})" style="color: white; text-decoration: none;">
                        Delete
                    </a>
                </button>
                <button class="btn detail-btn btn-sz">
                    <a target="_blank" href="update_course.html?courseId=${course.id}" style="color: white; text-decoration: none;">
                        Edit
                    </a>
                </button>
            </div>
        `;
        parent.appendChild(div);
    }
};


loadCourses(); 

function deleteCourse(courseId) {
    console.log("course_id:", courseId);
    fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/course_list/${courseId}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Token ' + localStorage.getItem('teacher_token'), 
        },
    })
    .then(response => {
        if (response.ok) {
            alert("Course deleted successfully!");
            window.location.reload();  
        } else {
            return response.json().then(err => { throw err; });
        }
    })
    .catch(error => {
        console.error("Error deleting course:", error);
        alert("An error occurred while deleting the course.");
    });
}