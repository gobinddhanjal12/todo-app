# Todo Application

A full-stack Todo application built with Node.js, Express, PostgreSQL, and EJS templating engine.

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Responsive design with Bootstrap
- RESTful API
- Unit and integration tests
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd my-new-nodejs-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database:
```bash
createdb todo_db
```

4. Set up environment variables:
Create a `.env` file in the root directory with the following content:
```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todo_db
```
Adjust the `DATABASE_URL` according to your PostgreSQL configuration.

5. Run database migrations:
```bash
psql -d todo_db -f src/db/migrations/init.sql
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Access the application:
Open your browser and navigate to `http://localhost:3000`

## Running Tests

1. Run unit tests:
```bash
npm test
```

2. Run tests with coverage:
```bash
npm run test:coverage
```

## API Endpoints

- `GET /api/v1/todos` - Get all todos
- `GET /api/v1/todos/:id` - Get a specific todo
- `POST /api/v1/todos` - Create a new todo
- `PUT /api/v1/todos/:id` - Update a todo
- `DELETE /api/v1/todos/:id` - Delete a todo

## Project Structure

```
src/
├── api/
│   └── v1/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
├── config/
├── db/
│   └── migrations/
├── middleware/
├── public/
│   ├── css/
│   └── js/
├── tests/
│   ├── integration/
│   └── unit/
├── views/
└── server.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 