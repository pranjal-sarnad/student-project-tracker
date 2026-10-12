
const form = document.querySelector('#project-form');
const nameInput = document.querySelector('#name');
const statusInput = document.querySelector('#status');
const projectList = document.querySelector('#project-list');
const emptyState = document.querySelector('#empty-state');

// Projects exist only while this page is loaded.
const projects = [];

// Display all projects in the list.
function renderProjects() {
    projectList.replaceChildren();

    projects.forEach(project => {
        const listItem = document.createElement('li');

        const projectName = document.createElement('h3');
        projectName.textContent = project.name;

        const projectStatus = document.createElement('p');
        projectStatus.textContent = `Status: ${project.status}`;

        listItem.append(projectName, projectStatus);
        projectList.appendChild(listItem);
    });

    if (emptyState) {
        emptyState.hidden = projects.length > 0;
    }
}

// Handle the form submission.
form.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const status = statusInput.value;

    if (name === '') {
        nameInput.focus();
        return;
    }

    const project = {
        id: crypto.randomUUID(),
        name: name,
        status: status
    };

    projects.push(project);

    renderProjects();

    form.reset();
    nameInput.focus();
});

// Show the initial empty state.
renderProjects();
