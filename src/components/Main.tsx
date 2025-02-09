import { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import edit from '../icon/edit.png';

export const Main = () => {
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
        <main>
            {data.map((item: any) => (
                <div key={item.id} className="listRecord">
                    <div className="contentHeader">
                        <div>
                            <span><input type="checkbox" name="status" className="status"/></span>&#12288;
                            <span>期限：</span>
                            <span>{new Date(item.due_date).toLocaleDateString('ja-JP')}</span>
                        </div>
                        <div className="contentHeaderButton">
                            <div className="hideButton"><span className="hideMark">▼</span></div>
                            <div className="deleteButton"><span className="deleteMark">×</span></div>
                        </div>
                    </div>
                    <div className="contentBody">
                        <div className="contentRecode">
                            <div className="contentTitle">{item.title}</div>
                            <div><img src={edit} className="editButton"/></div>
                        </div>
                        <div className="contentRecode">
                            <div>
                                <span className="contentSubTitle">取引先：</span>
                                <span>{item.partner}</span>
                            </div>
                            <div>
                                <span className="contentSubTitle">作成日時：</span>
                                <span>{new Date(item.created_at).toLocaleString('ja-JP', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                })}
                                </span>
                            </div>
                        </div>
                        <div className="contentLine">
                            <hr />
                        </div>
                        <div className="contentDescription">
                            <span className="contentSubTitle">詳細：</span>
                            <span>{item.description}</span>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    )
}
