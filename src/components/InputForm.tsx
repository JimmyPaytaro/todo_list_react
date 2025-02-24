import './InputForm.css';
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export const InputForm = (props: any) => {
    const [errorMassageBlank, setErrorMassageBlank] = useState<string>('');
    const [errorMassageTitle, setErrorMassageTitle] = useState<string>('');
    const [errorMassageDescription, setErrorMassageDescription] = useState<string>('');
    const [errorMassagePartner, setErrorMassagePartner] = useState<string>('');
    const [errorMassageDueDate, setErrorMassageDueDate] = useState<string>('');
    const navigate = useNavigate();
    const setTitle = useRef(null);
    const setDescription = useRef(null);
    const setPartner = useRef(null);
    const setDueDate = useRef(null);

    const [descriptionInputShowFlag, setDescriptionInputShowFlag] = useState(false); // 詳細フォームの表示切替フラグ
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

    // react-paginateの実行メソッド
    const pageChange = (allData: any):void => {
        let pageNumber = allData['selected']; //選択されたページ番号
        let startNumber: number = pageNumber * props.perPage; //スタート位置をページ番号 * 1ページあたりの数、とする(例えば2番を選ぶと10 * 1で10番が先頭になる、つまり11番目以降の書籍が表示される)
        props.setStart(startNumber);
      }
    
      
    // 入力ボタン押下時の処理
    const handleClick = (): void => {
        errorMassageReset(); // エラーメッセージをリセットする

        // 入力フォームの値を取得
        const titleElement = setTitle.current as HTMLInputElement | null;
        const descriptionElement = setDescription.current as HTMLInputElement | null;
        const partnerElement = setPartner.current as HTMLInputElement | null;
        const dueDateElement = setDueDate.current as HTMLInputElement | null;
        // Element | null 型をキャストする
        const title: string = titleElement ? titleElement.value : '';
        const description: string = descriptionElement ? descriptionElement.value : '';
        const partner: string = partnerElement ? partnerElement.value : '';
        const dueDate: Date = new Date(dueDateElement!.value);
        // データベースに送信する値
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

    // 詳細の入力フォームを切替える
    const handleShowDescription = ():void => {
        setDescriptionInputShowFlag((prev) => !prev);
        console.log(descriptionInputShowFlag);
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
                            <input type="text" className="titleForm" ref={setTitle} />
                        </td>
                        <td>
                            <span className="itemName">取引先</span>
                            <input type="text" className="partnerForm" ref={setPartner} />
                        </td>
                        <td>
                            <span className="itemName">期限</span>
                            <input type="date" className="dueDateForm" ref={setDueDate} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className="descriptionRecode">
                                <div>
                                    {!descriptionInputShowFlag ? (
                                        <>
                                        <span className="itemName">&#12288;&#12288;詳細</span>
                                        <input type="text" className="descriptionTextForm" ref={setDescription} />
                                        </>
                                    ) : (
                                        <>
                                        <span className="itemNameTextarea">&#12288;&#12288;詳細</span>
                                        <textarea className="descriptionTextareaForm" ref={setDescription}></textarea>
                                        </>
                                    ) }
                                </div>
                                <div className="descriptionFormHideButton" onClick={handleShowDescription}>
                                    <span className="descriptionHideMark" title="入力フォームの切替">
                                    {descriptionInputShowFlag ? '－' : '▼' }
                                    </span>
                                </div>
                            </div>
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

            <ReactPaginate
                pageCount={Math.ceil(allData.length / props.perPage)} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
                marginPagesDisplayed={2} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
                pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
                onPageChange={pageChange} //ページネーションのリンクをクリックしたときのイベント
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
