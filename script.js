
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");
}

function saveProfile() {
    const profile = {
        name: document.getElementById("studentName").value,
        course: document.getElementById("course").value,
        year: document.getElementById("year").value
    };

    if (!profile.name || !profile.course || !profile.year) {
        alert("Please fill all profile details.");
        return;
    }

    localStorage.setItem("studentProfile", JSON.stringify(profile));
    document.getElementById("profileMessage").innerText =
        "Profile saved successfully!";
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("studentProfile"));

    if (profile) {
        document.getElementById("studentName").value = profile.name;
        document.getElementById("course").value = profile.course;
        document.getElementById("year").value = profile.year;
    }
}

function addSubject() {
    const name = document.getElementById("subjectName").value.trim();

    if (!name) {
        alert("Enter a subject name.");
        return;
    }

    subjects.push(name);
    localStorage.setItem("subjects", JSON.stringify(subjects));

    document.getElementById("subjectName").value = "";
    displaySubjects();
    updateDashboard();
}

function displaySubjects() {
    const list = document.getElementById("subjectList");
    list.innerHTML = "";

    subjects.forEach((subject, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = subject;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.onclick = () => {
            subjects.splice(index, 1);
            localStorage.setItem("subjects", JSON.stringify(subjects));
            displaySubjects();
            updateDashboard();
        };

        li.append(span, button);
        list.appendChild(li);
    });
}

function addTask() {
    const name = document.getElementById("taskName").value.trim();
    const date = document.getElementById("taskDate").value;

    if (!name || !date) {
        alert("Enter task name and date.");
        return;
    }

    tasks.push({
        name: name,
        date: date,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";

    displayTasks();
    updateDashboard();
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.name + " - " + task.date +
            (task.completed ? " (Completed)" : "");

        const button = document.createElement("button");
        button.textContent = task.completed ? "Undo" : "Complete";

        button.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
            updateDashboard();
        };

        li.append(span, button);
        list.appendChild(li);
    });
}

function generateRecommendation() {
    const output = document.getElementById("recommendation");

    if (subjects.length === 0) {
        output.innerText = "Please add subjects first to get recommendations.";
        return;
    }

    const pendingTasks = tasks.filter(task => !task.completed);

    if (pendingTasks.length > 0) {
        output.innerText =
            "You have " + pendingTasks.length +
            " pending tasks. Focus on completing " +
            pendingTasks[0].name + " first.";
    } else {
        output.innerText =
            "Great! Revise your " + subjects[0] +
            " subject and practice questions regularly.";
    }
}

function updateDashboard() {
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;

    document.getElementById("subjectCount").innerText = subjects.length;
    document.getElementById("taskCount").innerText = total;
    document.getElementById("completedCount").innerText = completed;

    const percentage = total === 0 ? 0 :
        Math.round((completed / total) * 100);

    document.getElementById("progressText").innerText =
        percentage + "% Completed";

    document.getElementById("progressBar").style.width =
        percentage + "%";
}

function initializeApp() {
    loadProfile();
    displaySubjects();
    displayTasks();
    updateDashboard();
}

initializeApp();
