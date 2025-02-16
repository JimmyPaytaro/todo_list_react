import { useState } from 'react';
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
    const [descriptionShowFlag, setDescriptionShowFlag] = useState(
        Object.fromEntries(props.data.map((item: any) => [item.id, false]))
    ); // 詳細の表示フラグ

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
        console.log(descriptionShowFlag);
    }

    return (
        <>
        <main>
            {props.data.map((item: any) => (
                <div key={item.id} className="listRecord">
                    <div className="contentHeader">
                        <div>
                            <span><input type="checkbox" name="status" className="status" /></span>&#12288;
                            <span>期限：</span>
                            <span>{item.due_date ? new Date(item.due_date).toLocaleDateString('ja-JP') : '未設定'}</span>
                        </div>
                        <div className="contentHeaderButton">
                            <div className="hideButton" onClick={() => handleShowDescription(item.id)}>
                                <span className="hideMark">
                                {descriptionShowFlag[item.id] ? '-' : '▼' }
                                </span>
                            </div>
                            <div className="deleteButton" onClick={() => handleDelete(item.id, item.title)}><span className="deleteMark">×</span></div>
                        </div>
                    </div>
                    <div className="contentBody">
                        <div className="contentRecode">
                            <div className="contentTitle">{item.title}</div>
                            <div onClick={() => handleUpdate(item.id, item.title, item.description, item.partner, item.due_date)}><img src={edit} className="editButton" /></div>
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
                                    <span className="contentSubTitle">詳細：</span>
                                    <span>{item.description ? item.description : '未設定'}</span>
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
