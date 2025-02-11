import './InputForm.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

import startPage from "../icon/startPage.png";
import backPage from "../icon/backPage.png";
import nextPage from "../icon/nextPage.png";
import lastPage from "../icon/lastPage.png";

export const InputForm = () => {
    const [errorMassageBlank, setErrorMassageBlank] = useState<string>('');
    const [errorMassageTitle, setErrorMassageTitle] = useState<string>('');
    const [errorMassageDescription, setErrorMassageDescription] = useState<string>('');
    const [errorMassagePartner, setErrorMassagePartner] = useState<string>('');
    const [errorMassageDueDate, setErrorMassageDueDate] = useState<string>('');
    const navigate = useNavigate();

    const handleClick = (): void => {
        errorMassageReset(); // エラーメッセージをリセットする

        // 入力フォームの値を取得
        const titleElement = document.getElementById('title') as HTMLInputElement | null;
        const descriptionElement = document.getElementById('description') as HTMLInputElement | null;
        const partnerElement = document.getElementById('partner') as HTMLInputElement | null;
        const dueDateElement = document.getElementById('dueDate') as HTMLInputElement | null;
        const title: string = titleElement ? titleElement.value : '';
        const description: string = descriptionElement ? descriptionElement.value : '';
        const partner: string = partnerElement ? partnerElement.value : '';
        const dueDate: Date = new Date(dueDateElement!.value);
        const dataToSend = { title, description, partner, dueDate };

        let hasError = false; // エラーチェックフラグ

        // バリデーション
        if (title === null || title === '') {
            setErrorMassageBlank('タイトルを入力してください。');
            hasError = true;
        }
        if (title.length > 30) {
            setErrorMassageTitle('タイトルは30文字以内で入力してください。');
            hasError = true;
        }
        if (description.length > 1000) {
            setErrorMassageDescription('詳細は1000文字以内で入力してください。');
            hasError = true;
        }
        if (partner.length > 30) {
            setErrorMassagePartner('取引先は30文字以内で入力してください。');
            hasError = true;
        }
        // 期限が今日以降の日付であるか
        const today = new Date();
        today.setHours(0, 0, 0, 0); // today を 00:00:00 にリセット
        // dueDate.setHours(0, 0, 0, 0); // dueDate を 00:00:00 にリセット
        if (dueDate < today) {
            setErrorMassageDueDate('期限は今日以降の日付を入力してください。');
            hasError = true;
        }

        // エラーフラグがtrueの場合に処理を中断
        if (hasError) {
            return;
        }

        // 登録実行
        axios.post('http://localhost:3000/registration', dataToSend)
            .then(response => {
                console.log('Data created:', response.data); // リクエスト成功時の処理
                navigate('/'); // 一覧画面へ遷移する
                location.reload() // ページリロード
            })
            .catch(error => {
                console.error('Error creating data:', error); // リクエスト失敗時の処理
            });
    }

    // エラーメッセージをリセットする
    const errorMassageReset = (): void => {
        setErrorMassageBlank('');
        setErrorMassageTitle('');
        setErrorMassageDescription('');
        setErrorMassagePartner('');
        setErrorMassageDueDate('');
    }


    return (
        <div className="inputForm">
            <table className="itemsTable">
                <tbody>
                    <tr>
                        <td colSpan={3}>
                            <div className="errorMassage">{errorMassageBlank}</div>
                            <div className="errorMassage">{errorMassageTitle}</div>
                            <div className="errorMassage">{errorMassagePartner}</div>
                            <div className="errorMassage">{errorMassageDueDate}</div>
                            <div className="errorMassage">{errorMassageDescription}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="itemName">タイトル</span>
                            <input type="text" className="titleForm" id="title" />
                        </td>
                        <td>
                            <span className="itemName">取引先</span>
                            <input type="text" className="partnerForm" id="partner" />
                        </td>
                        <td>
                            <span className="itemName">期限</span>
                            <input type="date" className="dueDateForm" id="dueDate" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <span className="itemName">&#12288;&#12288;詳細</span>
                            <input type="text" className="descriptionForm" id="description" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className="buttonForm">
                                <div className="leftButton"></div>
                                <button className="inputButton" onClick={handleClick}>入力</button>
                                <button className="switchingButton" onClick={() => { navigate("/SearchForm"); }}>検索画面へ</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <div className="pageNation">
                <img src={startPage} className="pageNationButton" />
                <img src={backPage} className="pageNationButton" />
                <span className="pageNationButton">1</span>
                <img src={nextPage} className="pageNationButton" />
                <img src={lastPage} className="pageNationButton" />
            </div>
        </div>
    )
}
