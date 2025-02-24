import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchForm.css';
import ReactPaginate from 'react-paginate';

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

    const [allData, setAllData] = useState([]); // react-paginateのためのstate

    // サーバーからデータを取得(一覧表示)
    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then((response) => {
                props.setData(response.data); // 一覧表示するためのstate
                setAllData(response.data); // paginateを実行するためにallDataのstateに入れる
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    /*
    // 検索を実行した際に、表示ページを1ページ目にリセットする
    useEffect(() => {
        props.setStart(0)
    }, [props.data]);
    */

    // react-paginateの実行メソッド
    function pageChange(allData: any):void {
        let pageNumber = allData['selected']; //選択されたページ番号
        let startNumber: number = pageNumber * props.perPage; //スタート位置をページ番号 * 1ページあたりの数、とする(例えば2番を選ぶと10 * 1で10番が先頭になる、つまり11番目以降の書籍が表示される)
        props.setStart(startNumber)
      }

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
                props.setData(response.data); // 一覧表示するためのstate
                setAllData(response.data); // paginateを実行するためにallDataのstateに入れる
                props.setStart(0) // 1ページ目から表示させるためにstartに0を代入する
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

            <ReactPaginate
                pageCount={Math.ceil(allData.length / props.perPage)} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
                marginPagesDisplayed={2} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
                pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
                onPageChange={pageChange} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
                containerClassName='pagination' //ページネーションリンクの親要素のクラス名
                pageClassName='pageItem' //各子要素(li要素)のクラス名
                pageLinkClassName='pageLink' //ページネーションのリンクのクラス名
                activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます 
                previousLabel='<' //前のページ番号に戻すリンクのテキスト
                nextLabel='>' //次のページに進むボタンのテキスト
                previousClassName='pageItem' // '<'の親要素(li)のクラス名
                nextClassName='pageItem' //'>'の親要素(li)のクラス名
                previousLinkClassName='pageLink'  //'<'のリンクのクラス名
                nextLinkClassName='pageLink' //'>'のリンクのクラス名
                disabledClassName='disabled' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
                breakLabel='...' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
                breakClassName='pageItem' // 上記の「…」のクラス名
                breakLinkClassName='pageLink' // 「…」の中のリンクにつけるクラス
            />
        </div>
    )
}
