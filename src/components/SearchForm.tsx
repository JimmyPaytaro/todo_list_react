import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchForm.css';
import startPage from "../icon/startPage.png";
import backPage from "../icon/backPage.png";
import nextPage from "../icon/nextPage.png";
import lastPage from "../icon/lastPage.png";

export const SearchForm = (props: any) => {
    const navigate = useNavigate();

    const [errorMassageTitle, setErrorMassageTitle] = useState<string>('');
    const [errorMassageDescription, setErrorMassageDescription] = useState<string>('');
    const [errorMassagePartner, setErrorMassagePartner] = useState<string>('');
    const [errorMassageDueDate, setErrorMassageDueDate] = useState<string>('');
    // onChange メソッドのためのstate
    const [inputText, setInputText] = useState<{
        title: string; 
        partner: string; 
        description: string; 
        dueDateStart: string; 
        dueDateEnd: string; 
        createdAtStart: string; 
        createdAtEnd: string;
    }>({
        title: '', 
        partner: '', 
        description: '', 
        dueDateStart: '', 
        dueDateEnd: '', 
        createdAtStart: '', 
        createdAtEnd: ''
    });

    const setTitle = useRef(null);
    const setPartner = useRef(null);
    const setDescription = useRef(null);
    const setDueDateStart = useRef(null);
    const setDueDateEnd = useRef(null);
    const setCreatedAtStart = useRef(null);
    const setCreatedAtEnd = useRef(null);

    // サーバーからデータを取得(一覧表示)
    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then((response) => {
                props.setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // 検索処理
    const handleSearch = (): void => {
        errorMassageReset(); // エラーメッセージをリセットする

        // 入力フォームの値を取得
        const titleElement = setTitle.current as HTMLInputElement | null;
        const descriptionElement = setDescription.current as HTMLInputElement | null;
        const partnerElement = setPartner.current as HTMLInputElement | null;
        const dueDateStartElement = setDueDateStart.current as HTMLInputElement | null;
        const dueDateEndElement = setDueDateEnd.current as HTMLInputElement | null;
        const createdAtStartElement = setCreatedAtStart.current as HTMLInputElement | null;
        const createdAtEndElement = setCreatedAtEnd.current as HTMLInputElement | null;
        // Element | null 型をキャストする
        const title: string = titleElement ? titleElement.value : '';
        const description: string = descriptionElement ? descriptionElement.value : '';
        const partner: string = partnerElement ? partnerElement.value : '';
        const dueDateStart: string = dueDateStartElement ? dueDateStartElement.value : '';
        const dueDateEnd: string = dueDateEndElement ? dueDateEndElement.value : '';
        const createdAtStart: string = createdAtStartElement ? createdAtStartElement.value : '';
        const createdAtEnd: string = createdAtEndElement ? createdAtEndElement.value : '';

        let hasError = false; // エラーチェックフラグ

        // バリデーション
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

        // エラーフラグがtrueの場合に処理を中断
        if (hasError) {
            return;
        }

        // 検索実行
        // クエリパラメータを構築
        const queryParams = new URLSearchParams({ title, description, partner, dueDateStart, dueDateEnd, createdAtStart, createdAtEnd }).toString();
        // サーバーへリクエスト送信
        axios.get(`http://localhost:3000/search?${queryParams}`)
            .then((response) => {
                props.setData(response.data);
                if (response.data.length === 0) {
                    window.alert('指定された条件に一致するデータは存在しません。');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    // onChangeメソッド
    const inputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setInputText((prev) => ({
          ...prev,
          [name]: value, // name属性をキーにして値を更新
        }));
      };

    // フォームの値をクリア(条件をクリア)
    const handleFormClear = (): void => {
        setInputText({
            title: '', 
            partner: '', 
            description: '', 
            dueDateStart: '', 
            dueDateEnd: '', 
            createdAtStart: '', 
            createdAtEnd: ''
        });
    }

    // エラーメッセージをリセットする
    const errorMassageReset = (): void => {
        setErrorMassageTitle('');
        setErrorMassageDescription('');
        setErrorMassagePartner('');
        setErrorMassageDueDate('');
    }

    return (
        <div className="searchForm">
            <table className="itemsTable">
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <div className="searchFormTitleArea">
                                <div className="leftButton"></div>
                                <div className="searchFormTitle">検索画面</div>
                                <button className="searchFormClearButton" onClick={handleFormClear}>条件をクリア</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="errorMassage">{errorMassageTitle}</div>
                            <div className="errorMassage">{errorMassagePartner}</div>
                            <div className="errorMassage">{errorMassageDueDate}</div>
                            <div className="errorMassage">{errorMassageDescription}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="itemName">タイトル</span>
                            <input type="text" className="titleForm" name="title" ref={setTitle} value={inputText.title} onChange={inputValue} />
                        </td>
                        <td className="partner">
                            <span className="itemName">取引先</span>
                            <input type="text" className="partnerFormInput" name="partner" ref={setPartner} value={inputText.partner} onChange={inputValue} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <span className="itemName">&#12288;&#12288;詳細</span>
                            <input type="text" className="descriptionForm" name="description" ref={setDescription} value={inputText.description} onChange={inputValue} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="itemName">&#12288;&#12288;期限</span>
                            <input type="date" className="dueDateForm" name="dueDateStart" ref={setDueDateStart} value={inputText.dueDateStart} onChange={inputValue} />
                            <span className="itemBetween">～</span>
                            <input type="date" className="dueDateForm" name="dueDateEnd" ref={setDueDateEnd} value={inputText.dueDateEnd} onChange={inputValue} />
                        </td>
                        <td className="createdAt">
                            <span className="itemName">作成日時</span>
                            <input type="date" className="dueDateForm" name="createdAtStart" ref={setCreatedAtStart} value={inputText.createdAtStart} onChange={inputValue} />
                            <span className="itemBetween">～</span>
                            <input type="date" className="dueDateForm" name="createdAtEnd" ref={setCreatedAtEnd} value={inputText.createdAtEnd} onChange={inputValue} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="buttonForm">
                                <div className="leftButton"></div>
                                <button className="searchButton" onClick={handleSearch}>検索</button>
                                <button className="switchingButton" onClick={() => { navigate("/InputForm"); }}>入力画面へ</button>
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
