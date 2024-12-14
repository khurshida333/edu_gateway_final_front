document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    if (!courseId) {
        document.getElementById("response-message").innerHTML = `<div class="alert alert-danger">No course ID provided.</div>`;
        return;
    }

    const loadDepartments = () => {
        fetch("https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/department_list/")
            .then(response => response.json())
            .then(data => {
                const dropdownMenu = document.getElementById("drop-dept");
                dropdownMenu.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement("li");
                    li.classList.add("dropdown-item");
                    li.innerText = item.name;
                    li.addEventListener("click", () => selectDepartment(item));
                    dropdownMenu.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    };

    const selectDepartment = (department) => {
        const dropdownButton = document.getElementById("dropdownMenuButton");
        dropdownButton.innerText = department.name; 
        document.getElementById("selected-department").value = department.id; 
    };

    const loadCourseData = () => {
        const token = localStorage.getItem("teacher_token"); 

        fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/course_detail/${courseId}/`, { 
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching course data: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("title").value = data.title;
            document.getElementById("description").value = data.description;
            document.getElementById("duration").value = data.duration;
            document.getElementById("format").value = data.format;
            document.getElementById("key_features").value = data.key_features;

            const departmentId = data.department; 
            if (departmentId) {
               
                fetch(` p
                    `, { 
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(deptData => {
                    selectDepartment(deptData);
                })
                .catch(error => {
                    console.error('Error fetching department data:', error);
                });
            }
        })
        .catch(error => {
            document.getElementById("response-message").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
            console.error('Error:', error);
        });
    };

    loadDepartments();
    loadCourseData();

    document.getElementById("edit-course-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const duration = document.getElementById("duration").value;
        const format = document.getElementById("format").value;
        const key_features = document.getElementById("key_features").value;
        const department = document.getElementById("selected-department").value; 

        const token = localStorage.getItem("teacher_token"); 

        const courseData = {
            title,
            description,
            duration,
            format,
            key_features,
            department,
        };

        fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/course_update/${courseId}/`, { 
            method: 'PATCH',  
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData)  
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.detail || 'Error updating course');
                });
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("response-message").innerHTML = `<div class="alert alert-success">Course updated successfully!</div>`;
            console.log('Course updated:', data);
        })
        .catch(error => {
            document.getElementById("response-message").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
            console.error('Error:', error);
        });
    });
});
