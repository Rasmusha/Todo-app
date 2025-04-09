import TodoItem from "./todoItem";

class Project{
    constructor(name, todos = []) {
        this.name = name;
        this.todos = todos;
    }

    addNewTodo(title,description,dueDate,priority,notes = '',isComplete = false) {
        const todo = new TodoItem(title,description,dueDate,priority,notes,isComplete);
        this.todos.push(todo);
    }

    removeTodo(title) {
       const removedTitle = this.todos.find(todo => todo.title === title)
       this.todos.splice(removedTitle, 1);
    }

    markTodoAsComplete(title) {
        const completeTodo = this.todos.find(todo => todo.title === title)
        completeTodo.isComplete = true;
    }
}

export default Project;