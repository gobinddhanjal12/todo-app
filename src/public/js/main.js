document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('addTodoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('todoTitle').value;
        const description = document.getElementById('todoDescription').value;
        
        try {
            await createTodo({ title, description });
            document.getElementById('addTodoForm').reset();
            loadTodos();
        } catch (error) {
            console.error('Error creating todo:', error);
            alert('Failed to create todo');
        }
    });

    document.getElementById('todoList').addEventListener('click', async (e) => {
        const todoItem = e.target.closest('.todo-item');
        if (!todoItem) return;

        if (e.target.classList.contains('delete-todo') || e.target.closest('.delete-todo')) {
            if (confirm('Are you sure you want to delete this todo?')) {
                try {
                    await deleteTodo(todoItem.dataset.id);
                    loadTodos();
                } catch (error) {
                    console.error('Error deleting todo:', error);
                    alert('Failed to delete todo');
                }
            }
        } else if (e.target.classList.contains('edit-todo') || e.target.closest('.edit-todo')) {
            const title = prompt('Enter new title:', todoItem.querySelector('.todo-title').textContent);
            if (title) {
                const description = prompt('Enter new description:', todoItem.querySelector('.todo-description').textContent);
                try {
                    await updateTodo(todoItem.dataset.id, { title, description });
                    loadTodos();
                } catch (error) {
                    console.error('Error updating todo:', error);
                    alert('Failed to update todo');
                }
            }
        }
    });
}

async function loadTodos() {
    try {
        const response = await fetch('/api/v1/todos');
        const { data: todos } = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error loading todos:', error);
        alert('Failed to load todos');
    }
}

function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    const template = document.getElementById('todoTemplate');
    
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const clone = template.content.cloneNode(true);
        const todoItem = clone.querySelector('.todo-item');
        
        todoItem.dataset.id = todo.id;
        todoItem.querySelector('.todo-title').textContent = todo.title;
        todoItem.querySelector('.todo-description').textContent = todo.description || '';
        
        todoList.appendChild(clone);
    });
}

async function createTodo(todo) {
    const response = await fetch('/api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    
    return response.json();
}

async function updateTodo(id, updates) {
    const response = await fetch(`/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    
    return response.json();
}

async function deleteTodo(id) {
    const response = await fetch(`/api/v1/todos/${id}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
    
    return response.json();
} 