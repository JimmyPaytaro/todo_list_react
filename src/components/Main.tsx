import { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import { DeleteModal } from './DeleteModal';
import { UpdateModal } from './UpdateModal';
import edit from '../icon/edit.png';

export const Main = (props: any) => {
    const [deleteShowModal, setDeleteShowModal] = useState(false); // DeleteModalの表示フラグ
    const [updateShowModal, setUpdateShowModal] = useState(false); // UpdateModalの表示フラグ
    const [id, setId] = useState<number | undefined>(undefined); // propsに渡す各レコードのid
    const [title, setTitle] = useState<string | undefined>(undefined); // propsに渡す各レコードのtitle
    const [description, setDescription] = useState<string | undefined>(undefined); // propsに渡す各レコードのid
    const [partner, setPartner] = useState<string | undefined>(undefined); // propsに渡す各レコードのid
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined); // propsに渡す各レコードのid
    // 詳細の表示フラグ
    const [descriptionShowFlag, setDescriptionShowFlag] = useState(
        Object.fromEntries(props.data.map((item: any) => [item.id, false]))
    );
    const [changeStatus, setChangeStatus] = useState<{id: number, status: boolean}>({id: 0, status: false}); // データベースのstatusを変更するための値
    const [status, setStatus] = useState<Record<number, boolean>>({}); // checkboxの値をstateで取得する

    // statusが変更されたときに値を変更する
    useEffect((): void => {
            const id: number = changeStatus.id;
            const isChecked = changeStatus.status;
            axios.post(`http://localhost:3000/statusChange/${isChecked ? 'true' : 'false'}`, { id })
                .then(() => {
                        props.setData((prevData: any) =>
                          prevData.map((item: any) =>
                            item.id === id ? { ...item, status: isChecked } : item
                          )
                        );
                      })
                .catch(error => {
                    console.error('Error updating data:', error);
                });        
    }, [status]);

    // 削除確認のメッセージを表示
    const handleDelete = (id: number, title: string): void => {
        setDeleteShowModal(true);
        setId(id);
        setTitle(title);
    }

    // 編集画面を表示
    const handleUpdate = (
        id: number, 
        title: string, 
        description: string, 
        partner: string, 
        dueDate: Date
    ): void => {
        setUpdateShowModal(true);
        setId(id);
        setTitle(title);
        setDescription(description);
        setPartner(partner);
        setDueDate(dueDate ? dueDate : undefined); // dueDate が未設定の場合は undefined の値をセットする
    }

    // 詳細を表示・非表示
    const handleShowDescription = (id: number): void => {
        setDescriptionShowFlag((prev: any) => ({
                ...prev,
                [id]: !prev[id]
              }));
    }
    
    // statusの値を変更(タスクの完了・未完了)
    const handleShowStatus = (id: number, defaultStatus: boolean): void => {
        setStatus((prev: any) => ({
                ...prev,
                [id]: !prev[id]
                }))

        if (defaultStatus === !status[id]) {
            setChangeStatus({id: id, status: false}); // checkboxとstatusの値が合わなければfalseにする
        } else {
            setChangeStatus({id: id, status: !status[id]}); // checkboxとstatusの値が合えばcheckboxの結果と同値を返す
        }
    }


    return (
        <>
        <main>
            {props.data.slice(props.start, props.start + props.perPage).map((item: any) => (
                <div key={item.id} 
                    className={item.status ? 'listRecordCheckOver' : (new Date(item.due_date) <= new Date()) && (item.due_date) ? 'listRecordDueDateOver' : 'listRecord'} 
                    style={{ opacity: item.status ? 0.3 : 1}}>
                    <div className={item.status ? 'contentHeaderCheckOver' : (new Date(item.due_date) <= new Date()) && (item.due_date) ? 'contentHeaderDueDateOver' : 'contentHeader'}>
                        <div>
                            <span>
                                <input type="checkbox" className="status" checked={item.status} onChange={() => handleShowStatus(item.id, item.status)} />
                            </span>&#12288;
                            <span>期限：</span>
                            <span>{item.due_date ? new Date(item.due_date).toLocaleDateString('ja-JP') : '未設定'}</span>
                        </div>
                        <div className="contentHeaderButton">
                            <div className="hideButton" onClick={() => handleShowDescription(item.id)}>
                                <span className="hideMark" title="詳細">
                                {descriptionShowFlag[item.id] ? '－' : '▼' }
                                </span>
                            </div>
                            <div className="deleteButton" onClick={() => handleDelete(item.id, item.title)}><span className="deleteMark" title="削除">×</span></div>
                        </div>
                    </div>
                    <div className="contentBody">
                        <div className="contentRecode">
                            <div className="contentTitle">{item.title}</div>
                            <div onClick={() => handleUpdate(item.id, item.title, item.description, item.partner, item.due_date)}><img src={edit} className="editButton" title="編集" /></div>
                        </div>
                        <div className="contentRecode">
                            <div>
                                <span className="contentSubTitle">取引先：</span>
                                <span>{item.partner ? item.partner : '未設定'}</span>
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
                        {descriptionShowFlag[item.id] ? (
                            <>
                                <div className="contentLine">
                                    <hr />
                                </div>
                                <div className="contentDescription">
                                    <div className="contentSubTitleDescription">詳細：</div>
                                    <div className="descriptionText">{item.description ? item.description : '未設定'}</div>
                                </div>
                            </>
                        ) : (
                            <div className="hideRecode"></div>
                        )}
                    </div>
                </div>
            ))}
        </main>
        <DeleteModal deleteShowFlag={deleteShowModal} 
            setDeleteShowModal={setDeleteShowModal} 
            setData={props.setData} 
            data={props.data} 
            id={id} 
            title={title} 
        />
        <UpdateModal updateShowFlag={updateShowModal} 
            setUpdateShowModal={setUpdateShowModal} 
            setData={props.setData} 
            data={props.data} 
            id={id} 
            title={title} 
            description={description} 
            partner={partner} 
            dueDate={dueDate}
        />
        </>
    )
}
