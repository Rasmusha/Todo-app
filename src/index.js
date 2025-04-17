import Project from "./project";
import TodoItem from "./todoItem";
import "./styles.css";

const projects = [];
let currentProject = null;

const newProjectBtn = document.getElementById('newProject');
const projectFormContainer = document.getElementById('project-form');
const projecForm = document.getElementById('form-container')
projectFormContainer.classList.add('show');
const todoFormContainer = document.getElementById('todo-form-container');
const todoForm = document.getElementById('todo-form');
const initialContent = document.getElementById('initial-content');
const selectProject = document.getElementById('select-project');
const currentProjectText = document.getElementById('current-project');

newProjectBtn.addEventListener('click', () => {
    newProjectBtn.style.display = 'none'
    projectFormContainer.style.display = 'block';

    const cancelButton = document.getElementById('cancelProjectForm')
    cancelButton.addEventListener('click', () => {
        projectFormContainer.style.display = 'none';
        newProjectBtn.style.display = 'block'
    })
});

document.querySelector('.form-container').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert("Project name cannot be empty");
        return;
    }
    const project = new Project(name)
    projects.push(project);
    projectFormContainer.style.display = "none";
    projecForm.reset();
    newProjectBtn.style.display = 'block';
    displayProjects();
})

const displayProjects = () => {
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';

    projects.forEach(project => {
        const projectItem = document.createElement('button');
        projectItem.classList.add('project-item');
        projectItem.textContent = `# ${project.name}`;

        projectItem.addEventListener('click', () => displayTodos(project));

        projectContainer.appendChild(projectItem);
    });

    if (projects.length > 0) {
        initialContent.style.display = 'none';
    }
}

const displayTodos = (project) => {
    currentProject = project;
    selectProject.style.display = 'none';
    currentProjectText.style.display = 'block';
    const todoContainer = document.getElementById('todo-items');
    todoContainer.innerHTML = '';
    const projectName = document.createElement('h2');
    projectName.textContent = (`${project.name}`);
    todoContainer.appendChild(projectName);
    project.todos.forEach(todo => {
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isComplete;
        checkbox.addEventListener('change', () => {
            todo.isComplete = checkbox.checked;
        });

        const title = document.createElement('p');
        title.textContent = todo.title;

        const priority = document.createElement('p');
        priority.textContent = (`Priority: ${todo.priority}`);

        const date = document.createElement('p');
        date.textContent = (`Due Date: ${todo.dueDate}`);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(title);
        todoItem.appendChild(priority);
        todoItem.appendChild(date);
        todoContainer.appendChild(todoItem);

    })
    const newTodoButton = document.createElement('button');
    newTodoButton.textContent = 'New Task';    

    newTodoButton.addEventListener('click', function() {
        todoFormContainer.style.display = 'block';
        newTodoButton.style.display = 'none';
    })

    const cancelButton = document.getElementById('cancelTodoForm')

    cancelButton.addEventListener('click', function() {
            todoFormContainer.style.display = 'none';
            todoForm.reset();
            newTodoButton.style.display = 'block';        
    })

    todoContainer.appendChild(newTodoButton);

    todoForm.onsubmit = function(event) {
        event.preventDefault();
        const title = document.getElementById('todo-title').value.trim();
        const description = document.getElementById('todo-description').value.trim();
        const dueDate = document.getElementById('todo-due-date').value;
        const priority = document.querySelector('input[name="todo-priority"]:checked')?.value;

        if (!title || !dueDate || !priority) {
            alert("Please fill in all required fields");
            return;
        }

        const todo = new TodoItem(title,description,dueDate,priority);

        currentProject.addNewTodo(todo);
        todoFormContainer.style.display = 'none';
        todoForm.reset();
        displayTodos(currentProject);
    }
}

displayProjects();
