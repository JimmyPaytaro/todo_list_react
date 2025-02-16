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

// 検索
app.get('/search', async (req, res) => {
  try {
    const {title, description, partner, dueDateStart, dueDateEnd, createdAtStart, createdAtEnd} = req.query;
    const titleSearch = `%${title}%`;
    const descriptionSearch = `%${description}%`;
    const partnerSearch = `%${partner}%`;
    const dueDateStartSearch = dueDateStart ? `%${dueDateStart}%` : `%${'1900-01-01'}%`;
    const dueDateEndSearch = dueDateEnd ? `%${dueDateEnd}%` : `%${'2999-12-31'}%`;
    const createdAtStartSearch = createdAtStart ? `%${createdAtStart}%` : `%${'1900-01-01'}%`;
    const createdAtEndSearch = createdAtEnd ? `%${createdAtEnd}%` : `%${'2999-12-31'}%`;

    const result = await pool.query(`SELECT * FROM todo_app WHERE 
      title LIKE $1 AND 
      description LIKE $2 AND 
      partner LIKE $3 AND 
      (due_date BETWEEN $4 AND $5) AND 
      (created_at BETWEEN $6 AND $7)
      ORDER BY id DESC`,
      [titleSearch, descriptionSearch, partnerSearch, dueDateStartSearch, dueDateEndSearch, createdAtStartSearch, createdAtEndSearch]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});


// 変更
app.post('/update', async (req, res) => {
  try {
    const {id, title, description, partner, dueDate} = req.body;

    const result = await pool.query(
      'UPDATE todo_app SET title = $2, description = $3, partner = $4, due_date = $5 WHERE id = $1',
      [id, title, description, partner, dueDate]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 削除
app.post('/delete', async (req, res) => {
  try {
    const {id} = req.body;

    const result = await pool.query('DELETE FROM todo_app WHERE id = $1;',
      [id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});