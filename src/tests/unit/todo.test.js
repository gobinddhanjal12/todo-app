const Todo = require('../../api/v1/models/todo');
const db = require('../../config/database');

jest.mock('../../config/database');

describe('Todo Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new todo', async () => {
            const mockTodo = {
                id: 1,
                title: 'Test Todo',
                description: 'Test Description',
                completed: false,
                created_at: new Date(),
                updated_at: new Date()
            };

            db.query.mockResolvedValue({ rows: [mockTodo] });

            const result = await Todo.create({
                title: 'Test Todo',
                description: 'Test Description'
            });

            expect(result).toEqual(mockTodo);
            expect(db.query).toHaveBeenCalledWith(
                'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
                ['Test Todo', 'Test Description']
            );
        });
    });

    describe('findAll', () => {
        it('should return all todos', async () => {
            const mockTodos = [
                {
                    id: 1,
                    title: 'Todo 1',
                    description: 'Description 1',
                    completed: false
                },
                {
                    id: 2,
                    title: 'Todo 2',
                    description: 'Description 2',
                    completed: true
                }
            ];

            db.query.mockResolvedValue({ rows: mockTodos });

            const result = await Todo.findAll();

            expect(result).toEqual(mockTodos);
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM todos ORDER BY created_at DESC'
            );
        });
    });

    describe('findById', () => {
        it('should return a todo by id', async () => {
            const mockTodo = {
                id: 1,
                title: 'Test Todo',
                description: 'Test Description',
                completed: false
            };

            db.query.mockResolvedValue({ rows: [mockTodo] });

            const result = await Todo.findById(1);

            expect(result).toEqual(mockTodo);
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM todos WHERE id = $1',
                [1]
            );
        });

        it('should return undefined if todo not found', async () => {
            db.query.mockResolvedValue({ rows: [] });

            const result = await Todo.findById(999);

            expect(result).toBeUndefined();
        });
    });

    describe('update', () => {
        it('should update a todo', async () => {
            const mockTodo = {
                id: 1,
                title: 'Updated Todo',
                description: 'Updated Description',
                completed: true
            };

            db.query.mockResolvedValue({ rows: [mockTodo] });

            const result = await Todo.update(1, {
                title: 'Updated Todo',
                description: 'Updated Description',
                completed: true
            });

            expect(result).toEqual(mockTodo);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE todos'),
                ['Updated Todo', 'Updated Description', true, 1]
            );
        });
    });

    describe('delete', () => {
        it('should delete a todo', async () => {
            const mockTodo = {
                id: 1,
                title: 'Test Todo',
                description: 'Test Description',
                completed: false
            };

            db.query.mockResolvedValue({ rows: [mockTodo] });

            const result = await Todo.delete(1);

            expect(result).toEqual(mockTodo);
            expect(db.query).toHaveBeenCalledWith(
                'DELETE FROM todos WHERE id = $1 RETURNING *',
                [1]
            );
        });

        it('should return undefined if todo not found', async () => {
            db.query.mockResolvedValue({ rows: [] });

            const result = await Todo.delete(999);

            expect(result).toBeUndefined();
        });
    });
}); 