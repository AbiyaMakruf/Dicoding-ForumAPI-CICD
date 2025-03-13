/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('comments', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      content: {
        type: 'TEXT',
        notNull: true,
      },
      owner: {
        type: 'VARCHAR(50)',
        notNull: true,
        references: 'users(id)',
        onDelete: 'CASCADE',
      },
      thread_id: {
        type: 'VARCHAR(50)',
        notNull: true,
        references: 'threads(id)',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: 'TIMESTAMP',
        notNull: true,
        default: pgm.func('CURRENT_TIMESTAMP'),
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('comments');
  };
  