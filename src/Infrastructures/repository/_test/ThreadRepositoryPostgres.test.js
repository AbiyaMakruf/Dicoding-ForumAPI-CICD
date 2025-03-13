const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const pool = require('../../../Infrastructures/database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

describe('ThreadRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret' });
  });

  afterEach(async () => {
    await pool.query('TRUNCATE TABLE threads CASCADE');
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should persist new thread and return thread correctly', async () => {
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);
    const newThread = { title: 'Thread Title', body: 'Thread Body', owner: 'user-123' };
    
    const addedThread = await threadRepositoryPostgres.addThread(newThread);
    expect(addedThread).toHaveProperty('id');
    expect(addedThread).toHaveProperty('title', newThread.title);
    expect(addedThread).toHaveProperty('owner', newThread.owner);
  });

  it('should get thread details correctly', async () => {
    await ThreadsTableTestHelper.addThread({ id: 'thread-123', title: 'Thread Title', body: 'Thread Body', owner: 'user-123' });
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);
    const thread = await threadRepositoryPostgres.getThreadById('thread-123');
    expect(thread.id).toEqual('thread-123');
    expect(thread.title).toEqual('Thread Title');
    expect(thread.body).toEqual('Thread Body');
    expect(thread.username).toEqual('dicoding');
  });

  it('should throw error when thread not found', async () => {
    // Arrange
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);
    // Act & Assert
    await expect(threadRepositoryPostgres.getThreadById('thread-not-exist'))
      .rejects.toThrowError('THREAD_REPOSITORY.THREAD_NOT_FOUND');
  });

  it('should throw error when verifying a non-existent thread', async () => {
    // Arrange
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);
  
    // Act & Assert
    await expect(threadRepositoryPostgres.verifyThreadExists('thread-not-exist'))
      .rejects.toThrowError('THREAD_REPOSITORY.THREAD_NOT_FOUND');
  });

  it('should not throw error when verifying an existing thread', async () => {
    // Arrange: Tambahkan thread ke database
    await ThreadsTableTestHelper.addThread({ id: 'thread-123', title: 'Thread Title', body: 'Thread Body', owner: 'user-123' });
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);
  
    // Act: Panggil fungsi verifyThreadExists
    const result = await threadRepositoryPostgres.verifyThreadExists('thread-123');
  
    // Assert: Pastikan fungsi tidak melempar error
    await expect(threadRepositoryPostgres.verifyThreadExists('thread-123'))
      .resolves.not.toThrow('THREAD_REPOSITORY.THREAD_NOT_FOUND');
  
    expect(result).toBeUndefined();
  });
  
  
  
});
