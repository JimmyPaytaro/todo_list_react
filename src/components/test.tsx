import { useEffect, useState } from 'react';
import axios from 'axios';
import './test.css';

export const Test = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      // サーバーからデータを取得
      axios.get('http://localhost:3000/')
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    return (
      <div>
        <h1>PostgreSQL Data</h1>
        <table>
          <thead>
            <tr>
              {/* テーブルの列名を指定 */}
              <th>ID</th>
              <th>タイトル</th>
              <th>詳細</th>
              <th>取引先</th>
              <th>期限</th>
              <th>状態</th>
              <th>作成日時</th>
              <th>更新日時</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.partner}</td>
                <td>{item.due_date}</td>
                <td>{item.status}</td>
                <td>{item.created_at}</td>
                <td>{item.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

