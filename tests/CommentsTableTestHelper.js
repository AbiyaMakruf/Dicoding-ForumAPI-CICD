/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  // async addComment({ id = 'comment-123', content = 'A comment', owner = 'user-123', threadId = 'thread-123' }) {
  //   const query = {
  //     text: 'INSERT INTO comments (id, content, owner, thread_id, created_at, is_deleted) VALUES($1, $2, $3, $4, NOW(), false)',
  //     values: [id, content, owner, threadId],
  //   };
  //   await pool.query(query);
  // },
  async addComment({
    id = 'comment-123',
    content = 'A comment',
    owner = 'user-123',
    threadId = 'thread-123',
    createdAt = new Date().toISOString(), // nilai default untuk created_at
    is_deleted = false, // nilai default untuk is_deleted
  }) {
    const query = {
      text: 'INSERT INTO comments (id, content, owner, thread_id, created_at, is_deleted) VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, content, owner, threadId, createdAt, is_deleted],
    };
  
    await pool.query(query);
  },

  async findCommentById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;