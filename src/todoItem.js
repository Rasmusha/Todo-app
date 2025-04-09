class TodoItem {
    constructor(title,description,dueDate,priority,notes = '',isComplete = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = isComplete;
    }

    setComplete() {
        this.isComplete = true;
    }

    changePriority(newpriority) {
        this.priority = newpriority;
    }
}

export default TodoItem;