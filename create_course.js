
const loadDepartments = () => {
    fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/department_list/`)
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

loadDepartments();



document.getElementById("create-course-form").addEventListener("submit", function(event) {
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

    fetch(`https://edu-gateway-final-2wjt-q48suuls2-khurshida333s-projects.vercel.app/teacher/course_list/`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error creating course: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("response-message").innerHTML = `<div class="alert alert-success">Course created successfully!</div>`;
        console.log('Course created:', data);
        
    })
    .catch(error => {
        document.getElementById("response-message").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        console.error('Error:', error);
    });
});
