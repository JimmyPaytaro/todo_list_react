import pool from './db.js';
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log('サーバが起動しました'));

// CORS設定
app.use(cors());

// json形式で取得するためのミドルウェアの設定
app.use(express.json());

/*
app.get("/", (req, res) => {
    pool.query("SELECT * FROM todo_app", (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows);
    })
});
*/

// 全件表示　ID降順
app.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM todo_app ORDER BY id DESC;');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  });