import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_app',
    password: 'password', // postgreSQLで設定したパスワードを入力する
    port: 5432,
});

export default pool;