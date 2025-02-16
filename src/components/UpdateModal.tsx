import './UpdateModal.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const UpdateModal = (props: any) => {
    const [inputDueDate, setInputDueDate] = useState<string | undefined>(undefined);
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

    useEffect(() => {
        if (props.dueDate === undefined) {
            setInputDueDate(undefined); // 未設定の場合1970/01/01となってしまう事を防止するために undefined にセットする
        } else {
        // YYYY-MM-DD 形式の文字列にフォーマット
        const formatDueDate: string = new Date(props.dueDate).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '-');
        setInputDueDate(formatDueDate);
        }
    }, [props.dueDate]);

    // Modal が表示されるたびにエラーメッセージをリセットする
    useEffect(() => {
        if (props.updateShowFlag) {
            errorMassageReset();

        }
      }, [props.updateShowFlag]);

    // 更新処理
    const handleUpdate = (): void => {
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
        // propsに渡す値
        const id: number = props.id;
        // データベースに送信する値
        const dataToSend = { id, title, description, partner, dueDate };

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

        // 更新実行
        axios.post('http://localhost:3000/update', dataToSend)
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
        <>
            {props.updateShowFlag ? (
                <div className="overlay">
                    <div className="updateModal">
                        <div className="updateModalHeader">
                            <div className="updateModalHeaderContent">
                                期限
                                <input type="date" defaultValue={inputDueDate ? inputDueDate : ''} ref={setDueDate} className="updateModalDueDate" />
                                <span className="errorMassage">{errorMassageDueDate}</span>
                            </div>
                        </div>
                        <div className="updateModalBody">
                            <div>
                                <div className="errorMassageModal">{errorMassageBlank}</div>
                                <div className="errorMassageModal">{errorMassageTitle}</div>
                                <div className="updateModalContent">
                                    タイトル
                                    <input type="text" defaultValue={props.title} ref={setTitle} className="updateModalText" />
                                </div>
                                <div className="errorMassageModal">{errorMassagePartner}</div>
                                <div className="updateModalContent">
                                    &#12288;取引先
                                    <input type="text" defaultValue={props.partner} ref={setPartner} className="updateModalText" />
                                </div>
                                <div className="errorMassageModal">{errorMassageDescription}</div>
                                <div className="updateModalContent">
                                    <span className='updateModalContentDescription'>&#12288;&#12288;詳細</span>
                                    <textarea defaultValue={props.description} ref={setDescription} className="updateModalTextarea" />
                                </div>
                            </div>
                            <hr />
                            <div className="updateModalButtonForm">
                                <button className="updateModalOK"  onClick={handleUpdate}>内容更新</button>
                                <button className="updateModalCancel" onClick={() => props.setUpdateShowModal(false)}>キャンセル</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}
