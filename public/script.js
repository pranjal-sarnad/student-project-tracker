
const form = document.querySelector('#project-form');
const nameInput = document.querySelector('#name');
const statusInput = document.querySelector('#status');
const projectList = document.querySelector('#project-list');
const emptyState = document.querySelector('#empty-state');
const saveButton = document.querySelector('#save-button');
const cancelButton = document.querySelector('#cancel-button');
const message = document.querySelector('#message');

const STORAGE_KEY = 'workshop-projects-v1';

// Projects stay in memory and are saved in localStorage.
let projects = [];
let editingId = null;
let storageReady = true;

function showMessage(text) {
    message.textContent = text;
}

function isValidProjectArray(data) {
    return Array.isArray(data) &&
        data.every(project =>
            project !== null &&
            typeof project === 'object' &&
            !Array.isArray(project) &&
            typeof project.id === 'string' &&
            project.id.trim() !== '' &&
            typeof project.name === 'string' &&
            project.name.trim() !== '' &&
            typeof project.status === 'string'
        );
}

function loadProjects() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (storedData === null) {
            projects = [];
            return;
        }

        const parsedData = JSON.parse(storedData);

        if (!isValidProjectArray(parsedData)) {
            storageReady = false;
            projects = [];
            showMessage(
                'Saved project data is invalid. It has not been overwritten. ' +
                'Your existing saved data needs to be checked before saving again.'
            );
            return;
        }

        projects = parsedData;
    } catch (error) {
        storageReady = false;
        projects = [];
        showMessage(
            'Could not read saved projects. Check browser storage before saving again.'
        );
    }
}

function saveProjects() {
    if (!storageReady) {
        showMessage(
            'Changes could not be saved. Check the saved data or browser storage first.'
        );
        return false;
    }

    try {
        const text = JSON.stringify(projects);
        localStorage.setItem(STORAGE_KEY, text);
        showMessage('Changes saved.');
        return true;
    } catch (error) {
        showMessage('Changes could not be saved. Browser storage may be unavailable.');
        return false;
    }
}

function resetForm() {
    form.reset();
    editingId = null;
    saveButton.textContent = 'Add project';
    cancelButton.hidden = true;
}

function renderProjects() {
    projectList.replaceChildren();

    projects.forEach(project => {
        const listItem = document.createElement('li');

        const projectName = document.createElement('h3');
        projectName.textContent = project.name;

        const projectStatus = document.createElement('p');
        projectStatus.textContent = `Status: ${project.status}`;

        const actions = document.createElement('div');
        actions.className = 'project-actions';

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Edit';

        editButton.addEventListener('click', () => {
            editingId = project.id;
            nameInput.value = project.name;
            statusInput.value = project.status;
            saveButton.textContent = 'Save changes';
            cancelButton.hidden = false;
            nameInput.focus();
        });

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            const confirmed = window.confirm(
                `Are you sure you want to delete "${project.name}"?`
            );

            if (!confirmed) {
                return;
            }

            const projectIndex = projects.findIndex(
                item => item.id === project.id
            );

            if (projectIndex === -1) {
                return;
            }

            projects.splice(projectIndex, 1);

            if (editingId === project.id) {
                resetForm();
            }

            renderProjects();
            saveProjects();
        });

        actions.append(editButton, deleteButton);
        listItem.append(projectName, projectStatus, actions);
        projectList.appendChild(listItem);
    });

    if (emptyState) {
        emptyState.hidden = projects.length > 0;
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const status = statusInput.value;

    if (name === '') {
        nameInput.focus();
        showMessage('Please enter a project name.');
        return;
    }

    if (editingId !== null) {
        const project = projects.find(item => item.id === editingId);

        if (project) {
            project.name = name;
            project.status = status;
        }
    } else {
        const project = {
            id: crypto.randomUUID(),
            name: name,
            status: status
        };

        projects.push(project);
    }

    renderProjects();
    resetForm();
    saveProjects();
    nameInput.focus();
});

cancelButton.addEventListener('click', () => {
    resetForm();
    nameInput.focus();
});

loadProjects();
renderProjects();
