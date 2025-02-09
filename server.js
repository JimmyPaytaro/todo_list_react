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

// 新規登録
app.post('/registration', async (req, res) => {
  try{
    const {title, description, partner, dueDate} = req.body;
    const created_at = new Date();

    await pool.query('INSERT INTO todo_app(title, description, partner, due_date, created_at) VALUES($1, $2, $3, $4, $5)',
      [title, description, partner, dueDate, created_at],
      (error, results) => {
        if (error) throw error;
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});