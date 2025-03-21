const db = require('../../../config/database');

class Todo {
  static async create({ title, description }) {
    const query = 'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *';
    const values = [title, description];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM todos ORDER BY created_at DESC';
    const { rows } = await db.query(query);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM todos WHERE id = $1';
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async update(id, { title, description, completed }) {
    const query = `
      UPDATE todos 
      SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $4 
      RETURNING *
    `;
    const values = [title, description, completed, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }
}

module.exports = Todo; 