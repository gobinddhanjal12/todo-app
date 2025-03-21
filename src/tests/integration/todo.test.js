const request = require('supertest');
const app = require('../../server');
const db = require('../../config/database');

describe('Todo API Integration Tests', () => {
    let testTodoId;

    beforeAll(async () => {
        await db.query('DELETE FROM todos');
    });

    afterAll(async () => {
        await db.query('DELETE FROM todos');
        await db.pool.end();
    });

    describe('POST /api/v1/todos', () => {
        it('should create a new todo', async () => {
            const response = await request(app)
                .post('/api/v1/todos')
                .send({
                    title: 'Integration Test Todo',
                    description: 'Testing the API endpoints'
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe('Integration Test Todo');
            
            testTodoId = response.body.data.id;
        });

        it('should return 400 for invalid todo data', async () => {
            const response = await request(app)
                .post('/api/v1/todos')
                .send({
                    description: 'Missing title'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
        });
    });

    describe('GET /api/v1/todos', () => {
        it('should return all todos', async () => {
            const response = await request(app).get('/api/v1/todos');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/v1/todos/:id', () => {
        it('should return a specific todo', async () => {
            const response = await request(app).get(`/api/v1/todos/${testTodoId}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.id).toBe(testTodoId);
        });

        it('should return 404 for non-existent todo', async () => {
            const response = await request(app).get('/api/v1/todos/999999');

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('PUT /api/v1/todos/:id', () => {
        it('should update a todo', async () => {
            const response = await request(app)
                .put(`/api/v1/todos/${testTodoId}`)
                .send({
                    title: 'Updated Integration Test Todo',
                    description: 'Updated description',
                    completed: true
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.title).toBe('Updated Integration Test Todo');
            expect(response.body.data.completed).toBe(true);
        });

        it('should return 404 for non-existent todo', async () => {
            const response = await request(app)
                .put('/api/v1/todos/999999')
                .send({
                    title: 'Non-existent Todo',
                    description: 'This todo does not exist'
                });

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('DELETE /api/v1/todos/:id', () => {
        it('should delete a todo', async () => {
            const response = await request(app)
                .delete(`/api/v1/todos/${testTodoId}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);

            const getResponse = await request(app).get(`/api/v1/todos/${testTodoId}`);
            expect(getResponse.status).toBe(404);
        });

        it('should return 404 for non-existent todo', async () => {
            const response = await request(app)
                .delete('/api/v1/todos/999999');

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });
}); 